import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { darken } from 'polished';
import { useRouter } from 'next/router';
import {
  StateLabel,
  StateContainer,
  ViewAllTokensLink,
} from './ComboboxCommon';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from './ReachUiCombobox';
import { useAssetAndMarketSearch } from '../hooks/useSearch';
import { HitEnterShortcutIcon } from './icons/EnterShortcutIcon';
import { SearchComboboxIcon } from './SearchComboboxIcon';
import { Asset } from '../types/matcha';
import { routes } from '../utils/routes';
import { MATCHA_ANALYTIC_EVENTS } from '../data/analytics';
import { useMixpanelAnalytics } from '../contexts/analytics';
import {
  useCustomToken,
  useInputListenerForCustomTokenLoader,
} from '../contexts/custom-token-asset-datas';
import { isAddress } from '@ethersproject/address';
import { TokenIconInCircleWithFallback } from './checkout/icons/TokenIcons';
import { OctagonWarningIcon } from './icons/OctagonWarning';
import { useAppContext } from '../contexts/app';

// TODO(johnrjj) - See if we can merge this component with the main Combobox search.
// Not worth it right this second until design settles, but we should converge on a standard implementation eventually.

const StyledCombobox = styled(Combobox)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StyledComboboxInput = styled(ComboboxInput)`
  position: relative;
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  line-height: 19px;
  padding-left: 20px;
  padding-right: 40px;
  background: #f6f6ff;
  color: #0e103c;
  border: 0px solid transparent;
  transition: border-color 0.15s ease-in-out;
  :focus {
    outline: none;
    background: #ffffff;
  }
  ::placeholder {
    color: #7578b5;
  }
`;

const StyledComboboxPopover = styled(ComboboxPopover)`
  :focus {
    outline: none;
  }
`;

const StyledComboboxList = styled(ComboboxList)`
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
  :focus {
    outline: none;
  }
`;

const StyledComboboxOption = styled(ComboboxOption)`
  height: 40px;
  display: flex;
  padding-left: 22px;
  margin-left: 0;
  margin-right: 0;
  padding-right: 0px;
  align-items: center;
  cursor: pointer;
  &[data-reach-combobox-option][aria-selected='true'] {
    background-color: ${darken(0, '#F6F6FF')};
  }
  &[data-reach-combobox-option]:hover {
    background-color: ${darken(0.02, '#F6F6FF')};
  }
  &[data-reach-combobox-option][aria-selected='true']:hover {
    background-color: ${darken(0.03, '#F6F6FF')};
  }
  &:focus,
  :active {
    outline: none;
  }
`;

const StyledComboboxOptionTextNoInheritance = styled.span`
  font-family: 'Gilroy';
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.primaryText};
`;

const ComboListSelectionLabel = styled.h5`
  display: flex;
  align-items: center;
  font-family: 'Gilroy';
  padding-left: 22px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  height: 40px;
  /* We need this margin otherwise the opacity affects the outside border */
  margin: 0 1px;
  opacity: 0.7;
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledComboboxOptionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const StyledComboboxOptionLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledComboboxOptionRightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledComboboxContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 9px;
  transition: all 0.15s ease-in-out;
  background-color: #ffffff;
  :focus-within {
    background-color: #e8ecfd;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    background-color: #e8ecfd;
  }
  box-sizing: border-box;
  z-index: 1;
`;

const StyledComboboxContainerDropShadow1 = styled.div`
  position: absolute;
  left: 23px;
  right: 23px;
  bottom: 0;
  height: 20px;
  /* box-shadow: 0px 10px 20px rgba(14, 16, 60, 0.2),
    0px 4px 9px rgba(14, 16, 60, 0.15); */
`;

const StyledComboboxContainerDropShadow2 = styled.div`
  position: absolute;
  /* box-shadow: 0px 2px 20px rgba(14, 16, 60, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.2); */
  left: 13px;
  right: 13px;
  bottom: 20px;
  height: 20px;
`;

const StyledInputDropshadow = styled.div`
  position: absolute;
  /* box-shadow: 0px 2px 20px rgba(14, 16, 60, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.2); */
  left: 10px;
  right: 10px;
  bottom: 1px;
  height: 20px;
  z-index: -1;
`;

const StyledComboboxPopoverSpacer = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e7e7e9;
`;

const StyledComboboxContainerInner = styled.div`
  position: relative;
  transition: border-color 0.15s ease-in-out;
  background-color: #ffffff;
  border-radius: 9px;
  border: 1px solid #e8ecfd;
  overflow: hidden;
  /* ${StyledComboboxContainerDropShadow1} {
    display: none;
  }
  ${StyledComboboxContainerDropShadow2} {
    display: none;
  } */
  :focus-within {
    border: 1px solid #706eff;
  }
  :focus-within ${StyledInputDropshadow} {
    /* display: none; */
    opacity: 0;
  }
  :focus-within ${StyledComboboxContainerDropShadow1} {
    display: block;
  }
  :focus-within ${StyledComboboxContainerDropShadow2} {
    display: block;
  }
`;

const GoToMarketButtonContainer = styled.a`
  display: flex;
  align-items: center;
  background: #8e8cff;
  padding: 8px 12px 8px 12px;
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.white};
  margin-right: 4px;
`;

// const GoToMarketLabel = styled.div`
//   margin-right: 10px;
// `;

const SearchIconAbsoluteContainer = styled.div<{ isFocused?: boolean }>`
  position: absolute;
  right: 15px;
  top: 14px;
  z-index: 2;
  & g {
    transition: fill 0.13s ease-in-out;
    fill: ${(props) => (props.isFocused ? '#706EFF' : 'currentColor')};
  }
`;

const ListItemIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  width: 32px;
  justify-content: center;
  margin-right: 6px;
`;

export interface HeaderSearchComboboxProps {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const HeaderSearchCombobox: React.FC<HeaderSearchComboboxProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const analytics = useMixpanelAnalytics();

  const { addSearchResult } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useInputListenerForCustomTokenLoader(searchTerm);

  const maybeCustomToken = useCustomToken(searchTerm?.toLowerCase());

  const { assetSearchResults, marketSearchResults } = useAssetAndMarketSearch(
    searchTerm,
  );

  const [highlightValue, setHighlightValue] = useState('');

  const hasMatchingAssets = Boolean(
    assetSearchResults?.asset1Results?.length ||
      assetSearchResults?.asset2Results?.length,
  );
  const hasMatchingPairs =
    marketSearchResults && marketSearchResults.length > 0;

  const router = useRouter();

  // Preload custom token if detected
  useEffect(() => {
    if (maybeCustomToken) {
      router.prefetch(
        `${routes.MARKETS}/[...tradingParams]`,
        `${routes.MARKETS}/${maybeCustomToken.tokenAddress}`,
      );
    }
  }, [maybeCustomToken, router]);

  useEffect(() => {
    // Just in case if ethers tries to throw on us :)
    try {
      if (isAddress(searchTerm)) {
        analytics.track?.(
          MATCHA_ANALYTIC_EVENTS.SEARCH_TOKEN_ADRESS_INPUT_DETECTED,
          {
            term: searchTerm,
          },
        );
      }
    } catch (e) {
      // noop
    }
  }, [analytics, searchTerm]);

  // Temporarily disabling due to event spam
  // useEffect(() => {
  //   if (assetSearchResults || marketSearchResults) {
  //     if (
  //       !hasMatchingAssets &&
  //       !hasMatchingPairs &&
  //       searchTerm &&
  //       searchTerm.length > 1
  //     ) {
  //       // analytics.track?.(MATCHA_ANALYTIC_EVENTS.SEARCH_EMPTY_RESULT, {
  //       //   searchTerm: searchTerm,
  //       //   context: 'header_search_component',
  //       // });
  //     }
  //   }
  // }, [
  //   analytics,
  //   assetSearchResults,
  //   hasMatchingAssets,
  //   hasMatchingPairs,
  //   marketSearchResults,
  //   searchTerm,
  // ]);

  const placeholderText = useMemo(() => {
    if (router.pathname === routes.EXPLORE) {
      return 'Try ETH/DAI';
    }
    return 'Search by token name, symbol, or address…';
  }, [router]);

  const handleSelect = useCallback(
    (value: string) => {
      let parsedValue = value;

      const [maybeBaseTokenSymbol, maybeQuoteTokenSymbol] = parsedValue.split(
        '-',
      );

      // ETH-DAI => ETH/DAI for routing format
      if (value.includes('-')) {
        parsedValue = parsedValue.replace('-', '/');
      }
      // On the header search combobox, we clear the input
      setSearchTerm('');
      // inputRef.current?.value = '';
      // NOTE(johnrjj) - Added this blur for aesthetic but not sure if it interrupts any useful mobile behaviors?
      inputRef.current?.blur();
      // Let's go to the market page

      const routeTo = `${routes.MARKETS}/${parsedValue}`;

      analytics.track?.(
        MATCHA_ANALYTIC_EVENTS.SEARCH_RESULT_CLICK_AND_NAVIGATE,
        {
          baseToken: maybeBaseTokenSymbol,
          quoteToken: maybeQuoteTokenSymbol,
          clickedType: maybeQuoteTokenSymbol ? 'market' : 'asset',
          clickedResult: parsedValue,
          destination: routeTo,
          page: router.pathname,
          context: 'header_search_component',
        },
      );

      addSearchResult(value);
      router.push(`${routes.MARKETS}/[...tradingParams]`, routeTo);
    },
    [analytics, router, setSearchTerm, addSearchResult],
  );

  const TOTAL_NUMBER_OF_SEARCH_OPTIONS_TO_SHOW = 5;
  const MAX_ASSETS_TO_SHOW_IN_SEARCH_OPTIONS = 3;

  const safeAsset1Results = assetSearchResults.asset1Results || [];
  const safeAsset2Results = assetSearchResults.asset2Results || [];
  // NOTE(johnrjj) Zip the asset matches together for best end-user feel, then grab MAX(2) from the top of the list
  let curatedAssets: Asset[] = [
    safeAsset1Results[0],
    safeAsset2Results[0],
    safeAsset1Results[1],
    safeAsset2Results[1],
    safeAsset1Results[2],
    safeAsset2Results[2],
    safeAsset1Results[3],
    safeAsset2Results[3],
    safeAsset1Results[4],
    safeAsset2Results[4],
  ]
    .filter((x) => !!x)
    .slice(0, MAX_ASSETS_TO_SHOW_IN_SEARCH_OPTIONS);
  const numberOfMarketsToShow =
    TOTAL_NUMBER_OF_SEARCH_OPTIONS_TO_SHOW - curatedAssets.length;

  return (
    <StyledCombobox
      onHighlightChange={(val) => setHighlightValue(val ?? '')}
      openOnFocus={true}
      onSelect={handleSelect}
    >
      <StyledComboboxContainer>
        {/* {(term.length > 0 || hasMatchingAssets || hasMatchingPairs) && (
              <StyledComboboxContainerDropShadow1 />
            )}
            {(term.length > 0 || hasMatchingAssets || hasMatchingPairs) && (
              <StyledComboboxContainerDropShadow2 />
            )} */}
        <StyledComboboxContainerInner>
          <SearchIconAbsoluteContainer isFocused={isFocused}>
            <SearchComboboxIcon width={13} height={13} />
          </SearchIconAbsoluteContainer>
          <StyledInputDropshadow />
          <StyledComboboxInput
            value={searchTerm}
            spellCheck={false}
            autocomplete={false}
            autoCorrect={'false'}
            autoCapitalize={'false'}
            key={'matcha-search'}
            placeholder={placeholderText}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChange={(e: any) => {
              const searchValue = e.target.value;
              // Temporarily disabling due to event spam
              // analytics.track?.(MATCHA_ANALYTIC_EVENTS.SEARCH_QUERY_UPDATE, {
              //   value: searchValue,
              //   page: router.pathname,
              //   context: 'header_search_component',
              // });
              setSearchTerm(searchValue);
            }}
            ref={inputRef}
          />
          {(assetSearchResults || marketSearchResults) && (
            <StyledComboboxPopover portal={false}>
              {hasMatchingAssets || hasMatchingPairs ? (
                <div>
                  <StyledComboboxPopoverSpacer />
                  <StyledComboboxList persistSelection={true}>
                    {curatedAssets.length > 0 && (
                      <React.Fragment>
                        <ComboListSelectionLabel>
                          Tokens
                        </ComboListSelectionLabel>
                        {curatedAssets.map((result) => (
                          <StyledComboboxOption
                            key={`asset-${result.tokenAddress}`}
                            value={
                              result.importType === 'custom'
                                ? result.tokenAddress
                                : result.symbol
                            }
                          >
                            <StyledComboboxOptionContainer>
                              <StyledComboboxOptionLeftContainer>
                                {/* Show icon (show warning icon if custom token) */}
                                {result.importType === 'custom' && (
                                  <ListItemIconContainer>
                                    <OctagonWarningIcon
                                      style={{ marginBottom: 2 }}
                                      size={22}
                                    />
                                  </ListItemIconContainer>
                                )}
                                {result.importType !== 'custom' && (
                                  <ListItemIconContainer>
                                    <TokenIconInCircleWithFallback
                                      containerHeight={32}
                                      iconHeight={22}
                                      iconWidth={22}
                                      containerWidth={32}
                                      symbolOrAddress={result.tokenAddress}
                                    />
                                  </ListItemIconContainer>
                                )}

                                <StyledComboboxOptionTextNoInheritance>
                                  {result.name}{' '}
                                </StyledComboboxOptionTextNoInheritance>
                                <StyledComboboxOptionTextNoInheritance
                                  style={{ marginLeft: 8, color: '#7578B5' }}
                                >
                                  {result.symbol}
                                </StyledComboboxOptionTextNoInheritance>
                              </StyledComboboxOptionLeftContainer>
                              <StyledComboboxOptionRightContainer>
                                {highlightValue === result.symbol && (
                                  <GoToMarketButtonContainer>
                                    <HitEnterShortcutIcon />
                                  </GoToMarketButtonContainer>
                                )}
                              </StyledComboboxOptionRightContainer>
                            </StyledComboboxOptionContainer>
                          </StyledComboboxOption>
                        ))}
                      </React.Fragment>
                    )}
                    {/* Markets */}
                    {hasMatchingPairs && (
                      <ComboListSelectionLabel>Markets</ComboListSelectionLabel>
                    )}
                    {marketSearchResults &&
                      marketSearchResults
                        .slice(0, numberOfMarketsToShow)
                        .map((pair, index) => (
                          <StyledComboboxOption
                            key={index}
                            value={`${pair.baseTokenSymbol}-${pair.quoteTokenSymbol}`}
                          >
                            <StyledComboboxOptionContainer>
                              <StyledComboboxOptionLeftContainer>
                                <StyledComboboxOptionTextNoInheritance>
                                  {`${pair.baseTokenSymbol} / ${pair.quoteTokenSymbol}`}
                                </StyledComboboxOptionTextNoInheritance>
                              </StyledComboboxOptionLeftContainer>
                              <StyledComboboxOptionRightContainer>
                                {highlightValue ===
                                  `${pair.baseTokenSymbol}-${pair.quoteTokenSymbol}` && (
                                  <GoToMarketButtonContainer>
                                    <HitEnterShortcutIcon />
                                  </GoToMarketButtonContainer>
                                )}
                              </StyledComboboxOptionRightContainer>
                            </StyledComboboxOptionContainer>
                          </StyledComboboxOption>
                        ))}
                  </StyledComboboxList>
                </div>
              ) : searchTerm && searchTerm.length > 1 ? (
                <div>
                  <StyledComboboxPopoverSpacer />
                  <StateContainer>
                    <StateLabel>Sorry, we can't find "{searchTerm}"</StateLabel>
                    <Link href={'/explore'} passHref={true}>
                      <ViewAllTokensLink>View all tokens</ViewAllTokensLink>
                    </Link>
                  </StateContainer>
                </div>
              ) : // TODO(johnrjj) - Handle empty case, requires a little more thinking
              null}
            </StyledComboboxPopover>
          )}
        </StyledComboboxContainerInner>
      </StyledComboboxContainer>
    </StyledCombobox>
  );
};

const MemoizedHeaderSearchCombobox = React.memo(HeaderSearchCombobox);

export { HeaderSearchCombobox, MemoizedHeaderSearchCombobox };
