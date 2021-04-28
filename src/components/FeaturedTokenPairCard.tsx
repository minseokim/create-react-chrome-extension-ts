import styled from 'styled-components';
// import { SimpleLineChart } from './graphs/SimpleLineChart';
import React from 'react';
import { animated as a } from 'react-spring';
import { useTokenChartData } from '../hooks/useTokenChartData';
import { formatPercent, formatUsd } from '../utils/format-number';
import { FeaturedCard, FeaturedCardAnimationProps } from './FeaturedCard';
import { MysteryTokenIcon } from './icons/MysteryToken';

const BaseTokenLabel = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: ${(props) => props.textColor};
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

// const QuoteTokenLabel = styled(BaseTokenLabel)`
//   opacity: 0.6;
// `;

const RecentPriceChangeLabel = styled(BaseTokenLabel)`
  font-weight: 600;
  font-size: 14px;
  line-height: 140%;
`;

const PriceLabel = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-feature-settings: 'tnum' on, 'lnum' on;
  flex-wrap: nowrap;
  font-weight: 600;
  font-size: 28px;
  line-height: 32px;
  color: ${(props) => props.textColor};
  margin-bottom: 0px;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 24px;
    line-height: 28px;
  }
`;

const TokenBaseQuoteTokensContainer = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const TokenIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  img {
    max-height: 180px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    max-height: 120px;
    img {
      max-height: 120px;
    }
  }
`;

export interface FeaturedTokenPairCardProps {
  bgColor: string;
  textColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
}

export interface FeaturedTokenPairMetadataProps {
  baseTokenSymbol: string | undefined;
  quoteTokenSymbol?: string;
}

// function takeEvery<T>(arr: Array<T>, every: number = 5): Array<T> {
//   return arr.filter((_, idx) => idx % every === 0);
// }

const FeaturedTokenPairCard = React.forwardRef<
  any,
  FeaturedTokenPairCardProps &
    FeaturedTokenPairMetadataProps &
    FeaturedCardAnimationProps
>(
  (
    {
      bgColor,
      textColor,
      as,
      href,
      baseTokenSymbol,
      quoteTokenSymbol,
      children,
      ...rest
    },
    ref,
  ) => {
    const { percentChangeValue, quoteData } = useTokenChartData(
      baseTokenSymbol,
      quoteTokenSymbol,
    );

    const TopLeft: React.FC = () => {
      return (
        <>
          <TokenBaseQuoteTokensContainer>
            <BaseTokenLabel textColor={textColor} style={{ marginRight: 10 }}>
              {baseTokenSymbol}
            </BaseTokenLabel>
            {/* {quoteTokenSymbol && (
              <QuoteTokenLabel textColor={textColor}>
                {quoteTokenSymbol}
              </QuoteTokenLabel>
            )} */}
          </TokenBaseQuoteTokensContainer>
          <PriceLabel textColor={textColor}>
            {(quoteData && `$${formatUsd(quoteData.price).formatted}`) ?? '-'}
          </PriceLabel>
          <RecentPriceChangeLabel textColor={textColor}>
            {(percentChangeValue &&
              `${
                formatPercent(percentChangeValue, {
                  positiveSign: true,
                }).full
              }`) ??
              '-'}
          </RecentPriceChangeLabel>
        </>
      );
    };

    const TopRight: React.FC = () => {
      return (
        <></>
        // <SimpleLineChart
        //   chartData={takeEvery(chartData || [])}
        //   width={85}
        //   height={50}
        //   margin={{
        //     top: 2,
        //     left: 2,
        //     right: 2,
        //     bottom: 2,
        //   }}
        //   lineColor={textColor}
        // />
      );
    };

    return (
      <FeaturedCard
        {...rest}
        ref={ref}
        bgColor={bgColor}
        as={as}
        href={href}
        topLeft={<TopLeft />}
        topRight={<TopRight />}
      >
        <TokenIconWrapper>{children}</TokenIconWrapper>
      </FeaturedCard>
    );
  },
);

const AnimatedFeaturedTokenPairCard = a(FeaturedTokenPairCard);

export interface FeaturedCustomTokenCardProps {
  textColor: string;
  as?: 'a';
  href?: string;
  onClick?: () => void;
}

const FeaturedCustomTokenCard = React.forwardRef<
  any,
  FeaturedCustomTokenCardProps & FeaturedCardAnimationProps
>(({ textColor, as, href, children, ...rest }, ref) => {
  const TopLeft: React.FC = () => {
    return (
      <>
        <PriceLabel textColor={textColor}>+ Add Token</PriceLabel>
      </>
    );
  };

  const TopRight: React.FC = () => {
    return <></>;
  };

  return (
    <FeaturedCard
      {...rest}
      ref={ref}
      bgColor={'#FFEFAF'}
      as={as}
      href={href}
      topLeft={<TopLeft />}
      topRight={<TopRight />}
    >
      <TokenIconWrapper>
        <MysteryTokenIcon />
      </TokenIconWrapper>
    </FeaturedCard>
  );
});

const AnimatedFeaturedCustomTokenCard = a(FeaturedCustomTokenCard);

export {
  AnimatedFeaturedTokenPairCard as FeaturedTokenPairCard,
  AnimatedFeaturedCustomTokenCard as FeaturedCustomTokenCard,
};
