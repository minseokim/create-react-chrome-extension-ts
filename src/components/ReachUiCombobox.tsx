// https://raw.githubusercontent.com/reach/reach-ui/master/packages/combobox/src/index.tsx
// Reach's combobox + a onHighlightChange hook (very minor changes)

const __DEV__ = process.env.NODE_ENV === 'development';

/**
 * Welcome to @reach/combobox!
 *
 * Accessible combobox (autocomplete or autosuggest) component for React.
 *
 * A combobox is the combination of an `<input type="text"/>` and a list. The
 * list is designed to help the user arrive at a value, but the value does not
 * necessarily have to come from that list. Don't think of it like a
 * `<select/>`, but more of an `<input type="text"/>` with some suggestions. You
 * can, however, validate that the value comes from the list, that's up to your
 * app.
 *
 * ???: navigate w/ arrows, then hit backspace: should it delete the
 *      autocompleted text or the old value the user had typed?!
 *
 * @see Docs     https://reacttraining.com/reach-ui/combobox
 * @see Source   https://github.com/reach/reach-ui/tree/master/packages/combobox
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#combobox
 */

import React, {
  forwardRef,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useReducer,
  useState,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  checkStyles,
  ComponentWithForwardedRef,
  createNamedContext,
  forwardRefWithAs,
  getOwnerDocument,
  makeId,
  useIsomorphicLayoutEffect,
  useForkedRef,
  useUpdateEffect,
  wrapEvent,
  noop,
} from '@reach/utils';
import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants,
  useDescendantsInit,
  Descendant,
} from '@reach/descendants';
import { findAll } from 'highlight-words-core';
import escapeRegexp from 'escape-regexp';
import { useId } from '@reach/auto-id';
import Popover, { positionMatchWidth, PopoverProps } from '@reach/popover';

////////////////////////////////////////////////////////////////////////////////
// States

// Nothing going on, waiting for the user to type or use the arrow keys
const IDLE = 'IDLE';

// The component is suggesting options as the user types
const SUGGESTING = 'SUGGESTING';

// The user is using the keyboard to navigate the list, not typing
const NAVIGATING = 'NAVIGATING';

// The user is interacting with arbitrary elements inside the popup that
// are not ComboboxInputs
const INTERACTING = 'INTERACTING';

////////////////////////////////////////////////////////////////////////////////
// Events

// User cleared the value w/ backspace, but input still has focus
const CLEAR = 'CLEAR';

// User is typing
const CHANGE = 'CHANGE';

// Initial input value change handler for syncing user state with state machine
// Prevents initial change from sending the user to the NAVIGATING state
// https://github.com/reach/reach-ui/issues/464
const INITIAL_CHANGE = 'INITIAL_CHANGE';

// User is navigating w/ the keyboard
const NAVIGATE = 'NAVIGATE';

// User can be navigating with keyboard and then click instead, we want the
// value from the click, not the current nav item
const SELECT_WITH_KEYBOARD = 'SELECT_WITH_KEYBOARD';
const SELECT_WITH_CLICK = 'SELECT_WITH_CLICK';

// Pretty self-explanatory, user can hit escape or blur to close the popover
const ESCAPE = 'ESCAPE';
const BLUR = 'BLUR';

// The user left the input to interact with arbitrary elements inside the popup
const INTERACT = 'INTERACT';

const FOCUS = 'FOCUS';

const OPEN_WITH_BUTTON = 'OPEN_WITH_BUTTON';

const CLOSE_WITH_BUTTON = 'CLOSE_WITH_BUTTON';

////////////////////////////////////////////////////////////////////////////////
const stateChart: StateChart = {
  initial: IDLE,
  states: {
    [IDLE]: {
      on: {
        [BLUR]: IDLE,
        [CLEAR]: IDLE,
        [CHANGE]: SUGGESTING,
        [INITIAL_CHANGE]: IDLE,
        [FOCUS]: SUGGESTING,
        [NAVIGATE]: NAVIGATING,
        [OPEN_WITH_BUTTON]: SUGGESTING,
      },
    },
    [SUGGESTING]: {
      on: {
        [CHANGE]: SUGGESTING,
        [FOCUS]: SUGGESTING,
        [NAVIGATE]: NAVIGATING,
        [CLEAR]: IDLE,
        [ESCAPE]: IDLE,
        [BLUR]: IDLE,
        [SELECT_WITH_CLICK]: IDLE,
        [INTERACT]: INTERACTING,
        [CLOSE_WITH_BUTTON]: IDLE,
      },
    },
    [NAVIGATING]: {
      on: {
        [CHANGE]: SUGGESTING,
        [FOCUS]: SUGGESTING,
        [CLEAR]: IDLE,
        [BLUR]: IDLE,
        [ESCAPE]: IDLE,
        [NAVIGATE]: NAVIGATING,
        [SELECT_WITH_CLICK]: IDLE,
        [SELECT_WITH_KEYBOARD]: IDLE,
        [CLOSE_WITH_BUTTON]: IDLE,
        [INTERACT]: INTERACTING,
      },
    },
    [INTERACTING]: {
      on: {
        [CHANGE]: SUGGESTING,
        [FOCUS]: SUGGESTING,
        [BLUR]: IDLE,
        [ESCAPE]: IDLE,
        [NAVIGATE]: NAVIGATING,
        [CLOSE_WITH_BUTTON]: IDLE,
        [SELECT_WITH_CLICK]: IDLE,
      },
    },
  },
};

const reducer: Reducer = (data: StateData, event: MachineEvent) => {
  // TODO(johnrjj) - Don't automatically spread all state?
  const nextState = { ...data, lastEventType: event.type };
  switch (event.type) {
    case CHANGE:
      return {
        ...nextState,
        value: event.value,
        navigationValue:
          nextState.navigationValue ?? (event as any).defaultValue,
      };
    case INITIAL_CHANGE:
      return {
        ...nextState,
        navigationValue: null,
        value: event.value,
      };
    case NAVIGATE:
    case OPEN_WITH_BUTTON:
      return {
        ...nextState,
        navigationValue:
          findNavigationValue(nextState, event) ||
          (event as any).defaultValue ||
          null,
      };

    case CLEAR:
      return {
        ...nextState,
        value: '',
        navigationValue: null,
      };
    case BLUR:
    case ESCAPE:
      return {
        ...nextState,
        navigationValue: null,
      };
    case SELECT_WITH_CLICK:
      return {
        ...nextState,
        value: event.value,
        navigationValue: null,
      };
    case SELECT_WITH_KEYBOARD:
      return {
        ...nextState,
        value: data.navigationValue,
        navigationValue: null,
      };
    case CLOSE_WITH_BUTTON:
      return {
        ...nextState,
        navigationValue: null,
      };
    case INTERACT:
      return nextState;
    case FOCUS:
      return {
        ...nextState,
        navigationValue: findNavigationValue(nextState, event),
      };

    default:
      return nextState;
  }
};

const visibleStates: State[] = [SUGGESTING, NAVIGATING, INTERACTING];
const isVisible = (state: State) => visibleStates.includes(state);

/**
 * When we open a list, set the navigation value to the value in the input, if
 * it's in the list, then it'll automatically be highlighted.
 *
 * @param stateData
 * @param event
 */
function findNavigationValue(stateData: StateData, event: MachineEvent) {
  // @ts-ignore
  if (event.value) {
    // @ts-ignore
    return event.value;
    // @ts-ignore
  } else if (event.persistSelection) {
    return stateData.value;
  } else {
    return null;
  }
}

const ComboboxDescendantContext = createDescendantContext<ComboboxDescendant>(
  'ComboboxDescendantContext',
);
const ComboboxContext = createNamedContext(
  'ComboboxContext',
  {} as IComboboxContext,
);

// Allows us to put the option's value on context so that ComboboxOptionText
// can work it's highlight text magic no matter what else is rendered around
// it.
const OptionContext = createNamedContext(
  'OptionContext',
  {} as ComboboxOptionContextValue,
);

////////////////////////////////////////////////////////////////////////////////

/**
 * Combobox
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#combobox
 */
export const Combobox = forwardRefWithAs<ComboboxProps, 'div'>(
  function Combobox(
    {
      onSelect,
      onHighlightChange,
      openOnFocus = false,
      children,
      as: Comp = 'div',
      ...rest
    },
    forwardedRef,
  ) {
    let [options, setOptions] = useDescendantsInit<ComboboxDescendant>();

    // Need this to focus it
    const inputRef = useRef();

    const popoverRef = useRef();

    const buttonRef = useRef();

    // When <ComboboxInput autocomplete={false} /> we don't want cycle back to
    // the user's value while navigating (because it's always the user's value),
    // but we need to know this in useKeyDown which is far away from the prop
    // here, so we do something sneaky and write it to this ref on context so we
    // can use it anywhere else 😛. Another new trick for me and I'm excited
    // about this one too!
    const autocompletePropRef = useRef();

    const persistSelectionRef = useRef();

    const defaultData: StateData = {
      // The value the user has typed. We derive this also when the developer is
      // controlling the value of ComboboxInput.
      value: '',
      // the value the user has navigated to with the keyboard
      navigationValue: null,
    };

    const [state, data, transition] = useReducerMachine(
      stateChart,
      reducer,
      defaultData,
    );

    useFocusManagement(data.lastEventType, inputRef);

    const id = useId(rest.id);
    const listboxId = id ? makeId('listbox', id) : 'listbox';

    const context: IComboboxContext = {
      autocompletePropRef,
      buttonRef,
      data,
      inputRef,
      isVisible: isVisible(state),
      listboxId,
      onSelect: onSelect || noop,
      openOnFocus,
      persistSelectionRef,
      popoverRef,
      state,
      transition,
    };

    useEffect(() => checkStyles('combobox'), []);

    // HACK(johnrjj) - Autoselect first entry any time the options change if we don't already have a selected value
    useEffect(() => {
      if (options && options.length > 0) {
        if (data.value === options[0].value) {
          return;
        }
        // When a user is explicitly idle (can happen when user has just selected an option) don't highlight anything
        if (state === 'IDLE') {
          return;
        }
        transition(NAVIGATE, { defaultValue: options[0].value });
      }
      // Exclude 'transition' or else will get into infinite loop
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.value, options]);

    React.useEffect(
      function () {
        if (onHighlightChange) {
          onHighlightChange(data.navigationValue);
        }
      },
      [data.navigationValue, onHighlightChange],
    );

    return (
      <DescendantProvider
        context={ComboboxDescendantContext}
        items={options}
        set={setOptions}
      >
        <ComboboxContext.Provider value={context}>
          <Comp
            aria-haspopup="listbox"
            aria-owns={listboxId}
            aria-expanded={context.isVisible}
            {...rest}
            data-reach-combobox=""
            ref={forwardedRef}
            role="combobox"
          >
            {children}
          </Comp>
        </ComboboxContext.Provider>
      </DescendantProvider>
    );
  },
);

/**
 * @see Docs https://reacttraining.com/reach-ui/combobox#combobox-props
 */
export type ComboboxProps = {
  /**
   * @see Docs https://reacttraining.com/reach-ui/combobox#combobox-children
   */
  children?: React.ReactNode;
  /**
   * Called with the selection value when the user makes a selection from the
   * list.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#combobox-onselect
   */
  onSelect?: (value: string) => void;
  /**
   * Called with the navigationValue value when the user makes a navigationValue from the
   * list.
   *
   * @see Docs CUSTOM 0X
   */
  onHighlightChange?: (value: string | null | undefined) => void;
  /**
   * If true, the popover opens when focus is on the text box.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#combobox-openonfocus
   */
  openOnFocus?: boolean;
};

if (__DEV__) {
  Combobox.displayName = 'Combobox';
  Combobox.propTypes = {
    as: PropTypes.any,
    onSelect: PropTypes.func,
    openOnFocus: PropTypes.bool,
  };
}

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxInput
 *
 * Wraps an `<input/>` with a couple extra props that work with the combobox.
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxinput
 */
export const ComboboxInput = forwardRefWithAs<ComboboxInputProps, 'input'>(
  function ComboboxInput(
    {
      as: Comp = 'input',
      selectOnClick = false,
      autocomplete = true,
      onClick,
      onChange,
      onKeyDown,
      onBlur,
      onFocus,
      value: controlledValue,
      ...props
    },
    forwardedRef,
  ) {
    // https://github.com/reach/reach-ui/issues/464
    const { current: initialControlledValue } = useRef(controlledValue);
    const controlledValueChangedRef = useRef(false);
    useUpdateEffect(() => {
      controlledValueChangedRef.current = true;
    }, [controlledValue]);

    const {
      data: { navigationValue, value, lastEventType },
      inputRef,
      state,
      transition,
      listboxId,
      autocompletePropRef,
      openOnFocus,
    } = useContext(ComboboxContext);

    const ref = useForkedRef(inputRef, forwardedRef);

    // Because we close the List on blur, we need to track if the blur is
    // caused by clicking inside the list, and if so, don't close the List.
    const selectOnClickRef = useRef(false);

    const handleKeyDown = useKeyDown();

    const handleBlur = useBlur();

    const isControlled = controlledValue != null;

    // Layout effect should be SSR-safe here because we don't actually do
    // anything with this ref that involves rendering until after we've
    // let the client hydrate in nested components.
    useIsomorphicLayoutEffect(() => {
      autocompletePropRef.current = autocomplete;
    }, [autocomplete, autocompletePropRef]);

    const handleValueChange = useCallback(
      (value: ComboboxValue) => {
        if (value.trim() === '') {
          transition(CLEAR);
        } else if (
          value === initialControlledValue &&
          !controlledValueChangedRef.current
        ) {
          transition(INITIAL_CHANGE, { value });
        } else {
          transition(CHANGE, { value });
        }
      },
      [initialControlledValue, transition],
    );

    // If they are controlling the value we still need to do our transitions, so
    // we have this derived state to emulate onChange of the input as we receive
    // new `value`s ...[*]
    useEffect(() => {
      if (
        isControlled &&
        controlledValue !== value &&
        // https://github.com/reach/reach-ui/issues/481
        (controlledValue!.trim() === '' ? (value || '').trim() !== '' : true)
      ) {
        handleValueChange(controlledValue!);
      }
    }, [controlledValue, handleValueChange, isControlled, value]);

    // [*]... and when controlled, we don't trigger handleValueChange as the user
    // types, instead the developer controls it with the normal input onChange
    // prop
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;
      if (!isControlled) {
        handleValueChange(value);
      }
    }

    function handleFocus() {
      if (selectOnClick) {
        selectOnClickRef.current = true;
      }

      // If we select an option with click, useFocusManagement will focus the
      // input, in those cases we don't want to cause the menu to open back up,
      // so we guard behind these states.
      if (openOnFocus && lastEventType !== SELECT_WITH_CLICK) {
        transition(FOCUS);
      }
    }

    function handleClick() {
      if (selectOnClickRef.current) {
        selectOnClickRef.current = false;
        inputRef.current.select();
      }
    }

    const inputValue =
      autocomplete && (state === NAVIGATING || state === INTERACTING)
        ? // When idle, we don't have a navigationValue on ArrowUp/Down
          navigationValue || controlledValue || value
        : controlledValue || value;

    return (
      <Comp
        aria-activedescendant={
          navigationValue ? String(makeHash(navigationValue)) : undefined
        }
        aria-autocomplete="both"
        aria-controls={listboxId}
        {...props}
        data-reach-combobox-input=""
        ref={ref}
        onBlur={wrapEvent(onBlur, handleBlur)}
        onChange={wrapEvent(onChange, handleChange)}
        onClick={wrapEvent(onClick, handleClick)}
        onFocus={wrapEvent(onFocus, handleFocus)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
        value={inputValue || ''}
      />
    );
  },
);

/**
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxinput-props
 */
export type ComboboxInputProps = {
  /**
   * If true, when the user clicks inside the text box the current value will
   * be selected. Use this if the user is likely to delete all the text anyway
   * (like the URL bar in browsers).
   *
   * However, if the user is likely to want to tweak the value, leave this
   * false, like a google search--the user is likely wanting to edit their
   * search, not replace it completely.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxinput-selectonclick
   */
  selectOnClick?: boolean;
  /**
   * Determines if the value in the input changes or not as the user navigates
   * with the keyboard. If true, the value changes, if false the value doesn't
   * change.
   *
   * Set this to false when you don't really need the value from the input but
   * want to populate some other state (like the recipient selector in Gmail).
   * But if your input is more like a normal `<input type="text"/>`, then leave
   * the `true` default.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxinput-autocomplete
   */
  autocomplete?: boolean;
  /**
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxinput-value
   */
  value?: ComboboxValue;
};

if (__DEV__) {
  ComboboxInput.displayName = 'ComboboxInput';
}

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxPopover
 *
 * Contains the popup that renders the list. Because some UI needs to render
 * more than the list in the popup, you need to render one of these around the
 * list. For example, maybe you want to render the number of results suggested.
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxpopover
 */
export const ComboboxPopover = forwardRef<
  HTMLDivElement,
  ComboboxPopoverProps & Partial<PopoverProps>
>(function ComboboxPopover(
  {
    children,
    portal = true,
    onKeyDown,
    onBlur,
    position = positionMatchWidth,
    ...props
  },
  forwardedRef: React.Ref<any>,
) {
  const { popoverRef, inputRef, isVisible } = useContext(ComboboxContext);
  const ref = useForkedRef(popoverRef, forwardedRef);
  const handleKeyDown = useKeyDown();
  const handleBlur = useBlur();

  const sharedProps = {
    'data-reach-combobox-popover': '',
    'onKeyDown': wrapEvent<any>(onKeyDown, handleKeyDown),
    'onBlur': wrapEvent<any>(onBlur, handleBlur),
    // Instead of conditionally rendering the popover we use the `hidden` prop
    // because we don't want to unmount on close (from escape or onSelect).
    // However, the developer can conditionally render the ComboboxPopover if
    // they do want to cause mount/unmount based on the app's own data (like
    // results.length or whatever).
    'hidden': !isVisible,
    'tabIndex': -1,
    children,
  };

  return portal ? (
    <Popover
      {...props}
      ref={ref}
      position={position}
      targetRef={inputRef}
      {...sharedProps}
    />
  ) : (
    <div ref={ref} {...props} {...sharedProps} />
  );
});

if (__DEV__) {
  ComboboxPopover.displayName = 'ComboboxPopover';
}

/**
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxpopover-props
 */
export type ComboboxPopoverProps = {
  /**
   * If you pass `<ComboboxPopover portal={false} />` the popover will not
   * render inside of a portal, but in the same order as the React tree. This
   * is mostly useful for styling the entire component together, like the pink
   * focus outline in the example earlier in this page.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxpopover-portal
   */
  portal?: boolean;
};

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxList
 *
 * Contains the `ComboboxOption` elements and sets up the proper aria attributes
 * for the list.
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxlist
 */
export const ComboboxList = forwardRefWithAs<ComboboxListProps, 'ul'>(
  function ComboboxList(
    {
      // when true, and the list opens again, the option with a matching value will be
      // automatically highleted.
      persistSelection = false,
      as: Comp = 'ul',
      ...props
    },
    forwardedRef,
  ) {
    const { persistSelectionRef, listboxId } = useContext(ComboboxContext);

    if (persistSelection) {
      persistSelectionRef.current = true;
    }

    return (
      <Comp
        {...props}
        ref={forwardedRef}
        data-reach-combobox-list=""
        role="listbox"
        id={listboxId}
      />
    );
  },
);

/**
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxlist-props
 */
export type ComboboxListProps = {
  /**
   * Defaults to false. When true and the list is opened, if an option's value
   * matches the value in the input, it will automatically be highlighted and
   * be the starting point for any keyboard navigation of the list.
   *
   * This allows you to treat a Combobox more like a `<select>` than an
   * `<input/>`, but be mindful that the user is still able to put any
   * arbitrary value into the input, so if the only valid values for the input
   * are from the list, your app will need to do that validation on blur or
   * submit of the form.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxlist-persistselection
   */
  persistSelection?: boolean;
};

if (__DEV__) {
  ComboboxList.displayName = 'ComboboxList';
}

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxOption
 *
 * An option that is suggested to the user as they interact with the combobox.
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxoption
 */
export const ComboboxOption: ComponentWithForwardedRef<
  'li',
  ComboboxOptionProps
> = forwardRef(function ComboboxOption(
  { children, value, onClick, ...props },
  forwardedRef: React.Ref<any>,
) {
  const {
    onSelect,
    data: { navigationValue },
    transition,
  } = useContext(ComboboxContext);

  let ownRef = useRef<HTMLElement | null>(null);
  let ref = useForkedRef(forwardedRef, ownRef);

  let index = useDescendant(
    {
      element: ownRef.current!,
      value,
    },
    ComboboxDescendantContext,
  );

  const isActive = navigationValue === value;

  const handleClick = () => {
    onSelect && onSelect(value);
    transition(SELECT_WITH_CLICK, { value });
  };

  return (
    <OptionContext.Provider value={{ value, index }}>
      <li
        aria-selected={isActive}
        {...props}
        data-reach-combobox-option=""
        ref={ref}
        id={String(makeHash(value))}
        role="option"
        data-highlighted={isActive ? '' : undefined}
        // Without this the menu will close from `onBlur`, but with it the
        // element can be `document.activeElement` and then our focus checks in
        // onBlur will work as intended
        tabIndex={-1}
        onClick={wrapEvent(onClick, handleClick)}
        // @ts-ignore
        children={children || <ComboboxOptionText />}
      />
    </OptionContext.Provider>
  );
});

/**
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxoption-props
 */
export type ComboboxOptionProps = {
  /**
   * Optional. If omitted, the `value` will be used as the children like as:
   * `<ComboboxOption value="Seattle, Tacoma, Washington" />`. But if you need
   * to control a bit more, you can put whatever children you want, but make
   * sure to render a `ComboboxOptionText` as well, so the value is still
   * displayed with the text highlighting on the matched portions.
   *
   * @example
   *   <ComboboxOption value="Apple" />
   *     🍎 <ComboboxOptionText />
   *   </ComboboxOption>
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxoption-children
   */
  children?: React.ReactNode;
  /**
   * The value to match against when suggesting.
   *
   * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxoption-value
   */
  value: string;
};

if (__DEV__) {
  ComboboxOption.displayName = 'ComboboxOption';
}

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxOptionText
 *
 * Renders the value of a `ComboboxOption` as text but with spans wrapping the
 * matching and non-matching segments of text.
 *
 * We don't forwardRef or spread props because we render multiple spans or null,
 * should be fine 🤙
 *
 * @example
 *   <ComboboxOption value="Seattle">
 *     🌧 <ComboboxOptionText />
 *   </ComboboxOption>
 *
 * @see Docs https://reacttraining.com/reach-ui/combobox#comboboxoptiontext
 */
export function ComboboxOptionText() {
  const { value } = useContext(OptionContext);
  const {
    data: { value: contextValue },
  } = useContext(ComboboxContext);

  const results = useMemo(
    () =>
      findAll({
        searchWords: escapeRegexp(contextValue || '').split(/\s+/),
        textToHighlight: value,
      }),
    [contextValue, value],
  );

  return (
    <>
      {results.length
        ? results.map((result, index) => {
            const str = value.slice(result.start, result.end);
            return (
              <span
                key={index}
                data-user-value={result.highlight ? true : undefined}
                data-suggested-value={result.highlight ? undefined : true}
              >
                {str}
              </span>
            );
          })
        : value}
    </>
  );
}

if (__DEV__) {
  ComboboxOptionText.displayName = 'ComboboxOptionText';
}

////////////////////////////////////////////////////////////////////////////////

/**
 * ComboboxButton
 */
export const ComboboxButton = forwardRefWithAs<{}, 'button'>(
  function ComboboxButton(
    { as: Comp = 'button', onClick, onKeyDown, ...props },
    forwardedRef,
  ) {
    const { transition, state, buttonRef, listboxId, isVisible } = useContext(
      ComboboxContext,
    );
    const ref = useForkedRef(buttonRef, forwardedRef);

    const handleKeyDown = useKeyDown();

    const handleClick = () => {
      if (state === IDLE) {
        transition(OPEN_WITH_BUTTON);
      } else {
        transition(CLOSE_WITH_BUTTON);
      }
    };

    return (
      <Comp
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-expanded={isVisible}
        {...props}
        data-reach-combobox-button=""
        ref={ref}
        onClick={wrapEvent(onClick, handleClick)}
        onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      />
    );
  },
);

if (__DEV__) {
  ComboboxButton.displayName = 'ComboboxButton';
}

////////////////////////////////////////////////////////////////////////////////

/**
 * Move focus back to the input if we start navigating w/ the
 * keyboard after focus has moved to any focusable content in
 * the popup.
 *
 * @param lastEventType
 * @param inputRef
 */
function useFocusManagement(
  lastEventType: MachineEventType | undefined,
  inputRef: React.MutableRefObject<any>,
) {
  // useLayoutEffect so that the cursor goes to the end of the input instead
  // of awkwardly at the beginning, unclear to me why 🤷‍♂️
  //
  // Should be safe to use here since we're just focusing an input.
  useIsomorphicLayoutEffect(() => {
    if (
      lastEventType === NAVIGATE ||
      lastEventType === ESCAPE ||
      // EDIT(johnrjj) - DO NOT focus on a option selection event (on mobile this causes jitter)
      // We assume that when a user clicks an option, it is confirmed, and we're going to navigate away on select
      // lastEventType === SELECT_WITH_CLICK ||
      lastEventType === OPEN_WITH_BUTTON
    ) {
      inputRef.current.focus();
    }
  }, [inputRef, lastEventType]);
}

/**
 * We want the same events when the input or the popup have focus (HOW COOL ARE
 * HOOKS BTW?) This is probably the hairiest piece but it's not bad.
 */
function useKeyDown() {
  const {
    data: { navigationValue },
    onSelect,
    state,
    transition,
    autocompletePropRef,
    persistSelectionRef,
  } = useContext(ComboboxContext);

  const options = useDescendants(ComboboxDescendantContext);

  return function handleKeyDown(event: React.KeyboardEvent) {
    let index = options.findIndex(({ value }) => value === navigationValue);

    function getNextOption() {
      let atBottom = index === options.length - 1;
      if (atBottom) {
        if (autocompletePropRef.current) {
          // Go back to the value the user has typed because we are
          // autocompleting and they need to be able to get back to what
          // they had typed w/o having to backspace out.
          return null;
        } else {
          // cycle through
          return getFirstOption();
        }
      } else {
        // Go to the next item in the list
        return options[(index + 1) % options.length];
      }
    }

    function getPreviousOption() {
      let atTop = index === 0;
      if (atTop) {
        if (autocompletePropRef.current) {
          // Go back to the value the user has typed because we are
          // autocompleting and they need to be able to get back to what
          // they had typed w/o having to backspace out.
          return null;
        } else {
          // cycle through
          return getLastOption();
        }
      } else if (index === -1) {
        // displaying the user's value, so go select the last one
        return getLastOption();
      } else {
        // normal case, select previous
        return options[(index - 1 + options.length) % options.length];
      }
    }

    function getFirstOption() {
      return options[0];
    }

    function getLastOption() {
      return options[options.length - 1];
    }

    switch (event.key) {
      case 'ArrowDown':
        // Don't scroll the page
        event.preventDefault();
        if (!options || !options.length) {
          return;
        }

        if (state === IDLE) {
          // Opening a closed list
          transition(NAVIGATE, {
            persistSelection: persistSelectionRef.current,
          });
        } else {
          let next = getNextOption();
          transition(NAVIGATE, { value: next ? next.value : null });
        }
        break;

      // A lot of duplicate code with ArrowDown up next, I'm already over it.
      case 'ArrowUp':
        // Don't scroll the page
        event.preventDefault();
        if (!options || options.length === 0) {
          return;
        }

        if (state === IDLE) {
          transition(NAVIGATE);
        } else {
          let prev = getPreviousOption();
          transition(NAVIGATE, { value: prev ? prev.value : null });
        }
        break;

      case 'Home':
      case 'PageUp':
        // Don't scroll the page
        event.preventDefault();
        if (!options || options.length === 0) {
          return;
        }

        if (state === IDLE) {
          transition(NAVIGATE);
        } else {
          transition(NAVIGATE, { value: getFirstOption().value });
        }
        break;

      case 'End':
      case 'PageDown':
        // Don't scroll the page
        event.preventDefault();
        if (!options || options.length === 0) {
          return;
        }

        if (state === IDLE) {
          transition(NAVIGATE);
        } else {
          transition(NAVIGATE, { value: getLastOption().value });
        }
        break;

      case 'Escape':
        if (state !== IDLE) {
          transition(ESCAPE);
        }
        break;
      case 'Enter':
        if (state === NAVIGATING && navigationValue !== null) {
          // don't want to submit forms
          event.preventDefault();
          onSelect && onSelect(navigationValue);
          transition(SELECT_WITH_KEYBOARD);
        }
        break;
    }
  };
}

function useBlur() {
  const { state, transition, popoverRef, inputRef, buttonRef } = useContext(
    ComboboxContext,
  );

  return function handleBlur() {
    let ownerDocument = getOwnerDocument(inputRef.current) || document;
    requestAnimationFrame(() => {
      // we on want to close only if focus rests outside the combobox
      if (
        ownerDocument.activeElement !== inputRef.current &&
        ownerDocument.activeElement !== buttonRef.current &&
        popoverRef.current
      ) {
        if (popoverRef.current.contains(ownerDocument.activeElement)) {
          // focus landed inside the combobox, keep it open
          if (state !== INTERACTING) {
            transition(INTERACT);
          }
        } else {
          // focus landed outside the combobox, close it.
          transition(BLUR);
        }
      }
    });
  };
}

/**
 * This manages transitions between states with a built in reducer to manage
 * the data that goes with those transitions.
 *
 * @param chart
 * @param reducer
 * @param initialData
 */
function useReducerMachine(
  chart: StateChart,
  reducer: Reducer,
  initialData: Partial<StateData>,
): [State, StateData, Transition] {
  const [state, setState] = useState(chart.initial);
  const [data, dispatch] = useReducer(reducer, initialData);

  const transition: Transition = (event, payload = {}) => {
    const currentState = chart.states[state];
    const nextState = currentState && currentState.on[event];
    if (nextState) {
      dispatch({ type: event, state, nextState: state, ...payload, payload });
      setState(nextState);
      return;
    }
  };

  return [state, data, transition];
}

/**
 * We don't want to track the active descendant with indexes because nothing is
 * more annoying in a combobox than having it change values RIGHT AS YOU HIT
 * ENTER. That only happens if you use the index as your data, rather than
 * *your data as your data*. We use this to generate a unique ID based on the
 * value of each item.  This function is short, sweet, and good enough™ (I also
 * don't know how it works, tbqh)
 *
 * @see https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 * @param str
 */
const makeHash = (str: string) => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

////////////////////////////////////////////////////////////////////////////////

// Well alright, you made it all the way here to like 1100 lines of code (geez,
// what the heck?). Have a great day :D

////////////////////////////////////////////////////////////////////////////////
// Types

export type ComboboxContextValue = {
  id: string | undefined;
  isExpanded: boolean;
};

type ComboboxDescendant = Descendant<HTMLElement> & {
  value: ComboboxValue;
};

interface ComboboxOptionContextValue {
  value: ComboboxValue;
  index: number;
}

interface IComboboxContext {
  data: StateData;
  inputRef: React.MutableRefObject<any>;
  popoverRef: React.MutableRefObject<any>;
  buttonRef: React.MutableRefObject<any>;
  onSelect(value?: ComboboxValue): any;
  state: State;
  transition: Transition;
  listboxId: string;
  autocompletePropRef: React.MutableRefObject<any>;
  persistSelectionRef: React.MutableRefObject<any>;
  isVisible: boolean;
  openOnFocus: boolean;
}

type Transition = (event: MachineEventType, payload?: any) => any;

type ComboboxValue = string;

type State = 'IDLE' | 'SUGGESTING' | 'NAVIGATING' | 'INTERACTING';

type MachineEventType =
  | 'CLEAR'
  | 'CHANGE'
  | 'INITIAL_CHANGE'
  | 'NAVIGATE'
  | 'SELECT_WITH_KEYBOARD'
  | 'SELECT_WITH_CLICK'
  | 'ESCAPE'
  | 'BLUR'
  | 'INTERACT'
  | 'FOCUS'
  | 'OPEN_WITH_BUTTON'
  | 'CLOSE_WITH_BUTTON';

interface StateChart {
  initial: State;
  states: {
    [key in State]?: {
      on: {
        [key in MachineEventType]?: State;
      };
    };
  };
}

type StateData = {
  lastEventType?: MachineEventType;
  navigationValue?: ComboboxValue | null;
  value?: ComboboxValue | null;
};

type MachineEvent =
  | { type: 'BLUR' }
  | { type: 'CHANGE'; value: ComboboxValue }
  | { type: 'INITIAL_CHANGE'; value: ComboboxValue }
  | { type: 'CLEAR' }
  | { type: 'CLOSE_WITH_BUTTON' }
  | { type: 'ESCAPE' }
  | { type: 'FOCUS' }
  | { type: 'INTERACT' }
  | {
      type: 'NAVIGATE';
      persistSelection?: React.MutableRefObject<any>;
      value?: ComboboxValue;
      defaultValue?: ComboboxValue;
    }
  | { type: 'OPEN_WITH_BUTTON' }
  | {
      type: 'SELECT_WITH_CLICK';
      value: ComboboxValue;
    }
  | {
      type: 'SELECT_WITH_KEYBOARD';
    };

type Reducer = (data: StateData, event: MachineEvent) => StateData;
