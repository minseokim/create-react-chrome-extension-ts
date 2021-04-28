import { isAddress } from '@ethersproject/address';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { darken } from 'polished';
import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { usePrevious } from 'react-use';
import styled from 'styled-components';
import { useToken } from '../contexts/aggregated-token-asset-datas';
import { useMixpanelAnalytics } from '../contexts/analytics';
import { useAppContext } from '../contexts/app';
import { useCuratedTokenMap } from '../contexts/curated-token-asset-datas';
import {
  useCustomToken,
  useInputListenerForCustomTokenLoader,
} from '../contexts/custom-token-asset-datas';
import { MATCHA_ANALYTIC_EVENTS } from '../data/analytics';
import {
  SearchableMarketPair,
  useAssetAndMarketSearch,
} from '../hooks/useSearch';
import { Asset, AssetMetadata } from '../types/matcha';
import { routes } from '../utils/routes';
import { BaseButton } from './BaseButton';
import { TokenIconInCircleWithFallback } from './checkout/icons/TokenIcons';
import {
  StateContainer,
  StateLabel,
  ViewAllTokensLink,
} from './ComboboxCommon';
import { HEADER_HEIGHT_DESKTOP } from './Header';
import { OctagonWarningIcon } from './icons/OctagonWarning';
import { XIcon } from './icons/XIcon';

const MobileSearchContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
  background: #ffffff;
`;

const HeaderSearchBoxWrapper = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT_DESKTOP};
  display: grid;
  grid-template-columns: 1fr ${HEADER_HEIGHT_DESKTOP};
  border-bottom: 1px solid #e8ecfd;
`;

const HeaderSearchResultsWrapper = styled.div``;

const CloseButton = styled(BaseButton)`
  > svg {
    height: 18px;
    width: 18px;
  }
`;

const SearchResultsLabel = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  height: 45px;
  padding: 0 24px;
  color: ${(props) => props.theme.colors.primaryText};
  opacity: 0.7;
`;

const SearchResultsRowRight = styled.div`
  display: flex;
  align-items: center;
`;

const SearchResultsRowLeft = styled.div`
  display: flex;
  align-items: center;
`;

const SearchResultsRow = styled.div`
  height: 45px;
  display: flex;
  margin-left: 0;
  margin-right: 0;
  align-items: center;
  padding: 0 24px;
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

const SearchResultsTextNoInheritance = styled.span`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primaryText};
`;

const StyledInput = styled.input`
  position: relative;
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  line-height: 19px;
  color: #0e103c;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7578b5;
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

const StyledInputWrapper = styled.div`
  padding: 0 24px;
`;

const SearchResultsSpacer = styled.div`
  height: 20px;
  width: 100%;
`;

export const MobileSearchBox: FC = () => {
  const {
    isMobileSearchVisible,
    closeMobileSearch,
    addSearchResult,
    searchResults,
  } = useAppContext();
  const previousIsMobileSearchVisible = usePrevious(isMobileSearchVisible);

  const [term, setTerm] = useState('');

  useEffect(() => {
    // resets term after close
    if (!isMobileSearchVisible && previousIsMobileSearchVisible) {
      setTerm('');
    }
  }, [previousIsMobileSearchVisible, isMobileSearchVisible, setTerm]);

  const analytics = useMixpanelAnalytics();

  const [, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const placeholderText = 'Try ETH / DAI';

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

  // const [highlightValue, setHighlightValue] = useState('');

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
      closeMobileSearch();
      addSearchResult(value);
      // Let's go to the market page
      router.push(`${routes.MARKETS}/[...tradingParams]`, routeTo);
    },
    [analytics, router, closeMobileSearch, addSearchResult],
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
    <>
      {isMobileSearchVisible && (
        <MobileSearchContainer>
          <HeaderSearchBoxWrapper>
            <StyledInputWrapper>
              <StyledInput
                spellCheck={false}
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
            </StyledInputWrapper>
            <CloseButton onClick={() => closeMobileSearch()}>
              <XIcon />
            </CloseButton>
          </HeaderSearchBoxWrapper>
          <HeaderSearchResultsWrapper>
            <SearchResultsSpacer />
            {(assetSearchResults || marketSearchResults) && (
              <>
                {hasMatchingAssets || hasMatchingPairs ? (
                  <div>
                    {hasMatchingAssets && curatedAssets.length > 0 && (
                      <>
                        <SearchResultsLabel>Tokens</SearchResultsLabel>
                        {curatedAssets.map((result) => (
                          <SearchResultAssetRow
                            key={`asset-${result.tokenAddress}`}
                            asset={result}
                            handleSelect={handleSelect}
                          />
                        ))}
                      </>
                    )}
                    {hasMatchingPairs && (
                      <SearchResultsLabel>Markets</SearchResultsLabel>
                    )}
                    {marketSearchResults &&
                      marketSearchResults
                        .slice(0, numberOfMarketsToShow)
                        .map((pair, index) => {
                          // HACK(johnrjj) - Only curated assets are included in markets, so we can always reference them by symbol here
                          return (
                            <SearchResultMarketRow
                              key={index}
                              pair={pair}
                              handleSelect={handleSelect}
                            />
                          );
                        })}
                  </div>
                ) : term && term.length > 1 ? (
                  <div>
                    <StateContainer>
                      <StateLabel>Sorry, we can't find "{term}"</StateLabel>
                      <Link href={'/explore'} passHref={true}>
                        <ViewAllTokensLink>View all tokens</ViewAllTokensLink>
                      </Link>
                    </StateContainer>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <SearchResultsLabel>Previous Searches</SearchResultsLabel>
                    {searchResults.map((value) => (
                      <PreviousSearchResultsRow
                        value={value}
                        handleSelect={handleSelect}
                      />
                    ))}
                  </>
                ) : (
                  <div>
                    <StateContainer>
                      <StateLabel>
                        You have no previous search results.
                      </StateLabel>
                    </StateContainer>
                  </div>
                )}
              </>
            )}
          </HeaderSearchResultsWrapper>
        </MobileSearchContainer>
      )}
    </>
  );
};

const SearchResultMarketRow: FC<{
  pair: SearchableMarketPair;
  handleSelect: (value: string) => void;
}> = ({ pair, handleSelect }) => {
  return (
    <SearchResultsRow
      onClick={() => {
        handleSelect(`${pair.baseToken.symbol}-${pair.quoteToken.symbol}`);
      }}
    >
      <SearchResultsRowLeft>
        <SearchResultsTextNoInheritance>
          {`${pair.baseToken.symbol} / ${pair.quoteToken.symbol}`}
        </SearchResultsTextNoInheritance>
      </SearchResultsRowLeft>
      <SearchResultsRowRight>
        {/* {highlightValue ===
            `${pair.baseToken.symbol}-${pair.quoteToken.symbol}` && (
            <GoToMarketButtonContainer>
              <GoToMarketLabel>
                Go to market
              </GoToMarketLabel>{' '}
              <HitEnterShortcutIcon />
            </GoToMarketButtonContainer>
          )} */}
      </SearchResultsRowRight>
    </SearchResultsRow>
  );
};

const SearchResultAssetRow: FC<{
  asset: Asset<AssetMetadata>;
  handleSelect: (value: string) => void;
}> = ({ asset, handleSelect }) => {
  return (
    <SearchResultsRow
      key={`asset-${asset.tokenAddress}`}
      onClick={() => {
        handleSelect(
          asset.importType === 'custom' ? asset.tokenAddress : asset.symbol,
        );
      }}
    >
      <SearchResultsRowLeft>
        {/* Show icon (either warning if not curated or icon if curated) */}
        {asset.importType !== 'curated' && (
          <ListItemIconContainer>
            <OctagonWarningIcon style={{ marginBottom: 2 }} size={'small'} />
          </ListItemIconContainer>
        )}
        {asset.importType === 'curated' && (
          <ListItemIconContainer>
            <TokenIconInCircleWithFallback
              containerHeight={36}
              iconHeight={24}
              iconWidth={24}
              containerWidth={36}
              symbolOrAddress={asset.tokenAddress}
            />
          </ListItemIconContainer>
        )}

        <SearchResultsTextNoInheritance>
          {asset.name}{' '}
        </SearchResultsTextNoInheritance>
        <SearchResultsTextNoInheritance
          style={{ marginLeft: 8, color: '#7578B5' }}
        >
          {asset.symbol}
        </SearchResultsTextNoInheritance>
      </SearchResultsRowLeft>
      <SearchResultsRowRight>
        {/* {highlightValue === result.symbol && (
          <GoToMarketButtonContainer>
            <GoToMarketLabel>
              Go to token
            </GoToMarketLabel>{' '}
            <HitEnterShortcutIcon />
          </GoToMarketButtonContainer>
        )} */}
      </SearchResultsRowRight>
    </SearchResultsRow>
  );
};

const PreviousSearchResultsRow: FC<{
  value: string;
  handleSelect: (value: string) => void;
}> = ({ value, handleSelect }) => {
  // HACK: this should load the value if its a custom token
  useInputListenerForCustomTokenLoader(value);
  const asset = useToken(value);

  const supportedAssets = useCuratedTokenMap();

  const getAssetByContractAddress = useCallback(
    (assetSymbol: string) => {
      return supportedAssets[assetSymbol];
    },
    [supportedAssets],
  );

  // return market results row if its a market value
  if (value.includes('-')) {
    const [baseTokenSymbol, quoteTokenSymbol] = value.split('-');

    const baseTokenAsset = getAssetByContractAddress(baseTokenSymbol)!;
    const quoteTokenAsset = getAssetByContractAddress(quoteTokenSymbol)!;

    const marketPair: SearchableMarketPair = {
      baseTokenSymbol,
      quoteTokenSymbol,
      combinedSearchPair: `${baseTokenSymbol}${quoteTokenSymbol}`,
      baseToken: baseTokenAsset,
      quoteToken: quoteTokenAsset,
      volume24h: 10000, // TODO(johnrjj) - Grab a volume snapshot and serialize it
    };

    return (
      <SearchResultMarketRow pair={marketPair} handleSelect={handleSelect} />
    );
  } else if (asset) {
    return <SearchResultAssetRow asset={asset} handleSelect={handleSelect} />;
  }

  return <></>;
};
