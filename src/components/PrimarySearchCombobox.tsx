import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { isAddress } from '@ethersproject/address';
import { darken } from 'polished';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { useWindowSize } from 'react-use';
import {
  StateContainer,
  StateLabel,
  ViewAllTokensLink,
} from './ComboboxCommon';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from './ReachUiCombobox';
import { useDetectMobile } from '../hooks/useDetectMobile';
import { useAssetAndMarketSearch } from '../hooks/useSearch';
import { useMixpanelAnalytics } from '../contexts/analytics';
import { HitEnterShortcutIcon } from './icons/EnterShortcutIcon';
import { Asset } from '../types/matcha';
import { routes } from '../utils/routes';
import { SearchComboboxIcon } from './SearchComboboxIcon';
import { MatchaPrimaryButton } from './Buttons';
import { MATCHA_ANALYTIC_EVENTS } from '../data/analytics';
import { useMounted } from '../hooks/useMounted';
import {
  useCustomToken,
  useInputListenerForCustomTokenLoader,
} from '../contexts/custom-token-asset-datas';
import { OctagonWarningIcon } from './icons/OctagonWarning';
import { TokenIconInCircleWithFallback } from './checkout/icons/TokenIcons';
import { useAppContext } from '../contexts/app';

const StyledStateContainer = styled(StateContainer)`
  padding: 30px 10px 35px 10px;
`;

const StyledCombobox = styled(Combobox)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const StyledComboboxInput = styled(ComboboxInput)`
  position: relative;
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 18px;
  margin: 0;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 14px;
  line-height: 21px;
  padding-left: 20px;
  padding-right: 40px;
  color: #0e103c;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #9193c3;
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
  height: 45px;
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
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primaryText};
`;

const ComboListSelectionLabel = styled.h5`
  display: flex;
  align-items: center;
  font-family: 'Gilroy';
  padding-left: 22px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  height: 45px;
  color: ${(props) => props.theme.colors.primaryText};
  opacity: 0.7;
`;

const StyledComboboxOptionContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
  border-radius: 19px;
  background-color: #e8ecfd;
  box-sizing: border-box;
  padding: 8px;
  z-index: 2;
`;

const StyledComboboxPopoverSpacer = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e7e7e9;
`;

// 232
const StyledComboboxContainerDropShadow1 = styled.div`
  position: absolute;
  left: 23px;
  right: 23px;
  bottom: 0;
  height: 20px;
  box-shadow: 0px 10px 20px rgba(14, 16, 60, 0.2),
    0px 4px 9px rgba(14, 16, 60, 0.15);
`;

const StyledComboboxContainerDropShadow2 = styled.div`
  position: absolute;
  box-shadow: 0px 2px 20px rgba(14, 16, 60, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.2);
  left: 13px;
  right: 13px;
  bottom: 20px;
  height: 20px;
`;

const StyledInputDropshadow = styled.div`
  position: absolute;
  box-shadow: 0px 2px 20px rgba(14, 16, 60, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.2);
  left: 10px;
  right: 10px;
  bottom: 1px;
  height: 20px;
  z-index: -1;
`;

const StyledComboboxContainerInnerDropshadow = styled.div`
  display: relative;
  border-radius: 14px;
  box-shadow: 0px 8px 40px rgba(33, 35, 74, 0.12);
  position: absolute;
  top: 8px;
  bottom: 8px;
  right: 8px;
  left: 8px;
`;

const StyledComboboxContainerInner = styled.div`
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  :focus-within {
    border: 1px solid #706eff;
  }
  /* ${StyledComboboxContainerDropShadow1} {
    display: none;
  }
  ${StyledComboboxContainerDropShadow2} {
    display: none;
  } */
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
  padding: 8px 10px 8px 12px;
  box-shadow: inset 0px 1px 2px rgba(255, 255, 255, 0.25);
  margin-right: 8px;
  border-radius: 5px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.white};
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 8px 12px 8px 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 4px 8px 4px 0;
  }
`;

const GoToMarketLabel = styled.div`
  margin-right: 10px;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const SearchIconAbsoluteContainer = styled.div<{ isFocused?: boolean }>`
  position: absolute;
  right: 20px;
  top: 24px;
  z-index: 100;
  & g {
    transition: all 0.15s ease-in-out;
    fill: ${(props) => (props.isFocused ? '#706EFF' : 'currentColor')};
  }
`;

const SearchButtonAbsoluteContainer = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
  z-index: 100;
`;

const SearchPrimaryTradeButton = styled(MatchaPrimaryButton)`
  height: 52px;
  border-radius: 10px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
`;

const SearchPrimaryTradeButtonText = styled.span`
  transform: translateY(1px);
`;

const SearchPrimaryTradeButtonIcon = styled(SearchComboboxIcon)`
  margin-right: 10px;
  transform: translateY(-1px);
  // visually it looks more 'centered' when moved up by a px
  & g {
    fill: #ffffff;
  }
`;

const ListItemIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  width: 36px;
  justify-content: center;
  margin-right: 8px;
`;

function PrimarySearchComboBox() {
  const [term, setTerm] = useState('');

  const analytics = useMixpanelAnalytics();

  const { addSearchResult } = useAppContext();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isMobile = useDetectMobile();

  const inputRef = useRef<HTMLInputElement>(null);

  // TODO(dave4506): implement more advanced/intuitive logic
  const showPrimaryTradeButton = isEmpty(term);

  useEffect(() => {
    setTimeout(() => {
      if (isMobile === undefined) {
        return;
      }
      // Only focus combobox on mount if we're not on mobile
      // (Automatically focusing on mobile is way too distracting)
      if (isMobile === false) {
        inputRef.current?.focus();
      }
    }, 100);
  }, [isMobile]);

  useInputListenerForCustomTokenLoader(term);

  const maybeCustomToken = useCustomToken(term?.toLowerCase());

  const { assetSearchResults, marketSearchResults } = useAssetAndMarketSearch(
    term,
  );

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

  // If we know the user has a '/' in their search term they are probably looking for markets only
  const isSearchingMarketsExclusively = term.includes('/');

  const [highlightValue, setHighlightValue] = useState('');

  const hasMatchingAssets =
    !isSearchingMarketsExclusively &&
    assetSearchResults &&
    ((assetSearchResults.asset1Results &&
      assetSearchResults.asset1Results.length > 0) ||
      (assetSearchResults.asset2Results &&
        assetSearchResults.asset2Results.length > 0));
  const hasMatchingPairs =
    marketSearchResults && marketSearchResults.length > 0;

  useEffect(() => {
    // Just in case if ethers tries to throw on us :)
    try {
      if (isAddress(term)) {
        analytics.track?.(
          MATCHA_ANALYTIC_EVENTS.SEARCH_TOKEN_ADRESS_INPUT_DETECTED,
          {
            term,
          },
        );
      }
    } catch (e) {
      // noop
    }
  }, [analytics, term]);

  // Temporarily disabling due to event spam
  // useEffect(() => {
  //   if (assetSearchResults || marketSearchResults) {
  //     // if (!hasMatchingAssets && !hasMatchingPairs && term && term.length > 1) {
  //     //   analytics.track?.(MATCHA_ANALYTIC_EVENTS.SEARCH_EMPTY_RESULT, {
  //     //     searchTerm: term,
  //     //     context: 'primary_search_component',
  //     //   });
  //     // }
  //   }
  // }, [
  //   analytics,
  //   assetSearchResults,
  //   hasMatchingAssets,
  //   hasMatchingPairs,
  //   marketSearchResults,
  //   term,
  // ]);

  // TODO(dave4506): use route constants over strings
  const primaryTradeButtonText = useMemo(() => {
    return router.pathname === routes.EXPLORE ||
      router.pathname === routes.CUSTOM_TOKEN_LANDING
      ? 'Trade'
      : 'Explore';
  }, [router]);

  const placeholderText = useMemo(() => {
    if (router.pathname === routes.HOME) {
      return 'Search by token name, symbol, or address…';
    }
    if (router.pathname === routes.CUSTOM_TOKEN_LANDING) {
      return '0xe41d2...99f498';
    }
    return `Try ETH/DAI`;
  }, [router]);

  const handleSelect = useCallback(
    (value: string) => {
      let parsedValue = value;

      const [
        maybeBaseTokenSymbolOrTokenAddress,
        maybeQuoteTokenSymbolOrTokenAddress,
      ] = parsedValue.split('-');

      // ETH-DAI => ETH/DAI for routing format
      if (value.includes('-')) {
        parsedValue = parsedValue.replace('-', '/');
      }

      const routeTo = `${routes.MARKETS}/${parsedValue}`;
      analytics.track?.(
        MATCHA_ANALYTIC_EVENTS.SEARCH_RESULT_CLICK_AND_NAVIGATE,
        {
          baseToken: maybeBaseTokenSymbolOrTokenAddress,
          quoteToken: maybeQuoteTokenSymbolOrTokenAddress,
          clickedType: maybeQuoteTokenSymbolOrTokenAddress ? 'market' : 'asset',
          clickedResult: parsedValue,
          destination: routeTo,
          page: router.pathname,
          context: 'primary_search_component',
        },
      );

      // NOTE(johnrjj) - Added this blur for aesthetic but not sure if it interrupts any useful mobile behaviors?
      inputRef.current?.blur();
      addSearchResult(value);
      // Let's go to the market page
      router.push(`${routes.MARKETS}/[...tradingParams]`, routeTo);
    },
    [analytics, router, addSearchResult],
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

  const { breakpoints } = useTheme();
  const mounted = useMounted();
  const { width: windowWidth } = useWindowSize();
  const isLargeOrWiderScreenSize = windowWidth >= parseInt(breakpoints.md, 10);
  return (
    <StyledCombobox
      onHighlightChange={(val) => setHighlightValue(val ?? '')}
      openOnFocus={true}
      onSelect={handleSelect}
    >
      <StyledComboboxContainer>
        <StyledComboboxContainerInnerDropshadow />
        <StyledComboboxContainerInner>
          {mounted && showPrimaryTradeButton && isLargeOrWiderScreenSize ? (
            <SearchButtonAbsoluteContainer key={'search-button-container'}>
              <SearchPrimaryTradeButton
                onClick={() => {
                  analytics.track?.(
                    MATCHA_ANALYTIC_EVENTS.HOME_CLICK_EXPLORE_BUTTON,
                    {
                      context: 'home',
                    },
                  );
                  if (router.pathname === '/explore') {
                    // TODO(dave4506): what does cta do with no search?
                  } else {
                    router.push(routes.EXPLORE);
                  }
                }}
              >
                <SearchPrimaryTradeButtonIcon width={18} height={18} />
                <SearchPrimaryTradeButtonText>
                  {primaryTradeButtonText}
                </SearchPrimaryTradeButtonText>
              </SearchPrimaryTradeButton>
            </SearchButtonAbsoluteContainer>
          ) : (
            <SearchIconAbsoluteContainer
              key={'search-icon-container'}
              isFocused={isFocused}
            >
              <SearchComboboxIcon width={18} height={18} />
            </SearchIconAbsoluteContainer>
          )}
          <StyledInputDropshadow />
          <StyledComboboxInput
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
              //   context: 'primary_search_component',
              // });
              setTerm(searchValue);
            }}
            ref={inputRef}
          />
          {(assetSearchResults || marketSearchResults) && (
            <StyledComboboxPopover portal={false}>
              {hasMatchingAssets || hasMatchingPairs ? (
                <div>
                  <StyledComboboxPopoverSpacer />
                  <StyledComboboxList persistSelection={true}>
                    {hasMatchingAssets && curatedAssets.length > 0 && (
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
                                      size={'small'}
                                    />
                                  </ListItemIconContainer>
                                )}
                                {result.importType !== 'custom' && (
                                  <ListItemIconContainer>
                                    <TokenIconInCircleWithFallback
                                      containerHeight={36}
                                      iconHeight={24}
                                      iconWidth={24}
                                      containerWidth={36}
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
                                    <GoToMarketLabel>
                                      Go to token
                                    </GoToMarketLabel>{' '}
                                    <HitEnterShortcutIcon />
                                  </GoToMarketButtonContainer>
                                )}
                              </StyledComboboxOptionRightContainer>
                            </StyledComboboxOptionContainer>
                          </StyledComboboxOption>
                        ))}
                      </React.Fragment>
                    )}
                    {hasMatchingPairs && (
                      <ComboListSelectionLabel>Markets</ComboListSelectionLabel>
                    )}
                    {marketSearchResults &&
                      marketSearchResults
                        .slice(0, numberOfMarketsToShow)
                        .map((pair, index) => {
                          // HACK(johnrjj) - Only curated assets are included in markets, so we can always reference them by symbol here
                          return (
                            <StyledComboboxOption
                              key={index}
                              value={`${pair.baseToken.symbol}-${pair.quoteToken.symbol}`}
                            >
                              <StyledComboboxOptionContainer>
                                <StyledComboboxOptionLeftContainer>
                                  <StyledComboboxOptionTextNoInheritance>
                                    {`${pair.baseToken.symbol} / ${pair.quoteToken.symbol}`}
                                  </StyledComboboxOptionTextNoInheritance>
                                </StyledComboboxOptionLeftContainer>
                                <StyledComboboxOptionRightContainer>
                                  {highlightValue ===
                                    `${pair.baseToken.symbol}-${pair.quoteToken.symbol}` && (
                                    <GoToMarketButtonContainer>
                                      <GoToMarketLabel>
                                        Go to market
                                      </GoToMarketLabel>{' '}
                                      <HitEnterShortcutIcon />
                                    </GoToMarketButtonContainer>
                                  )}
                                </StyledComboboxOptionRightContainer>
                              </StyledComboboxOptionContainer>
                            </StyledComboboxOption>
                          );
                        })}
                  </StyledComboboxList>
                </div>
              ) : term && term.length > 1 ? (
                <div>
                  <StyledComboboxPopoverSpacer />
                  <StyledStateContainer>
                    <StateLabel>Sorry, we can't find "{term}"</StateLabel>
                    <Link href={'/explore'} passHref={true}>
                      <ViewAllTokensLink>View all tokens</ViewAllTokensLink>
                    </Link>
                  </StyledStateContainer>
                </div>
              ) : // TODO(johnrjj) - Handle empty case, requires a little more thinking
              null}
            </StyledComboboxPopover>
          )}
        </StyledComboboxContainerInner>
      </StyledComboboxContainer>
    </StyledCombobox>
  );
}

const PrimarySearchComboBoxMemo = React.memo(PrimarySearchComboBox);

export { PrimarySearchComboBoxMemo as PrimarySearchComboBox };
