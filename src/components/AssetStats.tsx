import styled from 'styled-components';
import { Asset } from '../types/matcha';
import { CoinGeckoTokenStatsByTokenAddressResponse } from '../utils/coingecko';
import { formatUsd, formatNumber } from '../utils/format-number';
import { ProgressBar } from './ProgressBar';
import { H4, PLabel } from './Typography';

const AssetStatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  margin-bottom: 32px;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const AssetStatContainer = styled(H4)`
  padding: 16px;
  border: 1px solid #f7f7ff;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
    padding-left: 0;
    border-left: none;
    border-bottom: none;
    border-right: none;
  }
  &:nth-child(1) {
    padding-left: 0;
    padding-right: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  &:nth-child(2) {
    border-right: none;
    border-bottom: none;
  }
  &:nth-child(3) {
    border-right: none;
    border-bottom: none;
  }
  &:nth-child(4) {
    border-left: none;
    border-right: none;
    padding-left: 0;
    padding-right: 0;
  }
  &:nth-child(5) {
    border-right: none;
  }
  :last-child {
    border-right: none;
  }
`;

const AssetStatHeader = styled(PLabel)`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  text-align: left;
  color: ${(props) => props.theme.palette.grey};
  margin-bottom: 4px;
`;

const AssetStatHeader24hPriceDisplay = styled(AssetStatHeader)`
  display: flex;
  max-width: 190px;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const AssetStatValue = styled.div`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
`;

const UnknownMetricValue = `-`;

interface TokenStatsProps {
  tokenStatsForAssetFromCoinGecko: CoinGeckoTokenStatsByTokenAddressResponse;
  baseTokenDataFromRoute?: Asset | null;
}

const AssetStats: React.FC<TokenStatsProps> = ({
  tokenStatsForAssetFromCoinGecko,
  baseTokenDataFromRoute,
}) => {
  const { market_data: marketData } = tokenStatsForAssetFromCoinGecko;

  return (
    <>
      {marketData ? (
        <AssetStatsContainer>
          {/* Market Cap Rank */}
          <AssetStatContainer>
            <AssetStatHeader>Market Cap Rank</AssetStatHeader>
            <AssetStatValue>
              {marketData.market_cap_rank
                ? `#${marketData.market_cap_rank}`
                : UnknownMetricValue}
            </AssetStatValue>
          </AssetStatContainer>

          {/* Market Cap */}
          <AssetStatContainer>
            <AssetStatHeader>Market Cap</AssetStatHeader>
            <AssetStatValue>
              {marketData.market_cap.usd === 0
                ? UnknownMetricValue
                : marketData.market_cap.usd
                ? formatUsd(marketData.market_cap.usd, {
                    bigUnitPostfix: true,
                  }).full
                : UnknownMetricValue}
            </AssetStatValue>
          </AssetStatContainer>

          {/* Circulating Supply */}
          <AssetStatContainer>
            <AssetStatHeader>Circulating Supply</AssetStatHeader>
            <AssetStatValue>
              {marketData.circulating_supply
                ? `${formatNumber(marketData.circulating_supply).formatted} ${
                    baseTokenDataFromRoute?.symbol
                  }`
                : UnknownMetricValue}
            </AssetStatValue>
          </AssetStatContainer>

          {/* All-Time ROI */}
          <AssetStatContainer>
            <AssetStatHeader>All-Time ROI</AssetStatHeader>
            <AssetStatValue>
              {!marketData.roi
                ? UnknownMetricValue
                : marketData.roi.percentage &&
                  `${
                    formatNumber(marketData.roi.percentage, { decimals: 1 })
                      .formattedValue
                  } %`}
            </AssetStatValue>
          </AssetStatContainer>

          {/* 24H Volume */}
          <AssetStatContainer>
            <AssetStatHeader>24h Volume</AssetStatHeader>
            <AssetStatValue>
              {marketData.total_volume.usd
                ? formatUsd(marketData.total_volume.usd, {
                    bigUnitPostfix: true,
                  }).full
                : UnknownMetricValue}
            </AssetStatValue>
          </AssetStatContainer>

          {/* 24h low and High */}
          {marketData.low_24h &&
            marketData.high_24h &&
            marketData.current_price && (
              <AssetStatContainer>
                <AssetStatHeader24hPriceDisplay>
                  <span>24h Low {`$${marketData.low_24h.usd}`}</span>
                  <span>High {`$${marketData.high_24h.usd}`}</span>
                </AssetStatHeader24hPriceDisplay>
                <ProgressBar
                  low={marketData.low_24h.usd}
                  high={marketData.high_24h.usd}
                  currentPrice={marketData.current_price.usd}
                />
              </AssetStatContainer>
            )}
        </AssetStatsContainer>
      ) : null}
    </>
  );
};

export { AssetStats };
