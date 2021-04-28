import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useContext,
  useEffect,
} from 'react';

import { Tabs, Tab, useTabsContext } from '@reach/tabs';
import { useRect } from '@reach/rect';
import styled from 'styled-components';
import { useSpring, animated as a, config as springConfig } from 'react-spring';
import { useIsomorphicLayoutEffect } from '@reach/utils';

const AnimatedTabContext = React.createContext<
  Dispatch<SetStateAction<DOMRect | null>>
>(() => {
  throw new Error('AnimatedContext needs a provider!');
});

const MovingTab = styled.div`
  position: fixed;
  z-index: 11;
`;
const AnimatedMovingTab = a(MovingTab);

const ACTIVE_TAB_ANIMATED_LINE_HEIGHT = 4;
const AnimatedTabs: React.FC<{
  tabColor: string;
  style: any;
  defaultIndex?: number;
}> = ({ tabColor, children, style, ...rest }) => {
  // some state to store the position we want to animate to
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLElement>(null);
  const rect = useRect(ref);

  const shouldAnimateRef = useRef<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      shouldAnimateRef.current = true;
    }, 250);
  }, []);
  const tabSpring = useSpring({
    height: ACTIVE_TAB_ANIMATED_LINE_HEIGHT,
    background: tabColor,
    left: (activeRect?.left ?? 0) - (rect?.left ?? 0),
    top: (activeRect?.bottom ?? 0) - ACTIVE_TAB_ANIMATED_LINE_HEIGHT,
    width: activeRect?.width ?? 0,
    immediate: !shouldAnimateRef.current,
    config: springConfig.stiff, //{ mass: 2, tension: 500, friction: 80 },
  });

  return (
    <AnimatedTabContext.Provider value={setActiveRect}>
      {/* make sure to forward props since we're wrapping Tabs */}
      <Tabs
        {...(rest as any)}
        ref={ref}
        style={{ ...style, position: 'relative' }}
      >
        {/* Todo convert into a spring? */}
        <AnimatedMovingTab style={tabSpring} />
        {/* HACK(johnrjj) - don't ship to prod lol */}
        {/* <div
          style={{
            position: 'absolute',
            height: 1,
            background: '#E8ECFD',
            top: (activeRect?.bottom ?? 0) - (rect?.top ?? 0),
            // HACK(johnrjj) lol, it works, ok??
            left: -4000,
            right: 4000,
            width: 8000,
          }}
        /> */}
        {children}
      </Tabs>
    </AnimatedTabContext.Provider>
  );
};

const StyledTab = styled(Tab)`
  display: inline-block;
  flex: 0;
  border: none;
  /* padding: 0.25em 0.5em; */
  padding: 0;
  margin: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:active {
    background: none; // TODO(dave4506): should we have an active background color??
  }
  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
  outline: none;
`;

const AnimatedTab: React.FC<{
  index: number;
  style: any;
  disabled?: boolean;
}> = ({ index, style, ...props }) => {
  // get the currently selected index from useTabsContext
  const { selectedIndex } = useTabsContext();
  const isSelected = selectedIndex === index;
  // measure the size of our element, only listen to rect if active
  const ref = useRef<HTMLElement>(null);
  const rect = useRect(ref, isSelected);
  // get the style changing function from context
  const setActiveRect = useContext(AnimatedTabContext);
  // callup to set styles whenever we're active
  useIsomorphicLayoutEffect(() => {
    if (isSelected) {
      setActiveRect(rect);
    }
  }, [isSelected, rect, setActiveRect]);
  return (
    <StyledTab
      ref={ref as any}
      {...props}
      style={{
        ...style,
        flex: 0,
        minWidth: 'max-content',
        border: 'none',
        padding: '4px 0',
        // padding: `4px ${HORIZONTAL_PADDING}px`,
      }}
    />
  );
};

export { AnimatedTab, AnimatedTabs };
