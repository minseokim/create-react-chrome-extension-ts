import styled from 'styled-components';
import { SimpleLineChart } from './graphs/SimpleLineChart';
import React, { useMemo, useState } from 'react';
import { ChartDataPoint } from './graphs/LineChartWithTooltip';
import { useSpring, animated as a, interpolate } from 'react-spring';

const CARD_HEIGHT = '398px';
const CARD_WIDTH = '313px';

const CARD_HEIGHT_MINI = '300px';
// const CARD_WIDTH_MINI = '230px';

const getBackgroundScale = (state: CardState) => {
  if (state === 'pressed') {
    return 0.96;
  }
  if (state === 'hovering') {
    return 0.99;
  }
  if (state === 'idle') {
    return 1;
  }
};
const getTokenScale = (state: CardState) => {
  if (state === 'pressed') {
    return 1.18;
  }
  if (state === 'hovering') {
    return 1.08;
  }
  if (state === 'idle') {
    return 1.0;
  }
};
const getTokenScaleY = (state: CardState) => {
  if (state === 'pressed') {
    return 2;
  }
  if (state === 'hovering') {
    return 1;
  }
  if (state === 'idle') {
    return 0;
  }
};

const TopRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopRightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding-left: 2px;
  padding-bottom: 15px;
`;

const BottomRowContainer = styled.div`
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  min-height: 200px;
  will-change: transform;
  margin-top: 20px;
  user-select: none;
  img {
    margin: 0 auto;
    object-fit: cover;
    max-width: 220px;
    max-height: 220px;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;
const AnimatedBottomRowContainer = a(BottomRowContainer);

const BottomRowContainerMini = styled.div`
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  will-change: transform;
  min-height: 170px;
  margin-top: 5px;
  user-select: none;
  img {
    margin: 0 auto;
    object-fit: cover;
    max-width: 170px;
    max-height: 170px;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;

const BaseTokenLabel = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.textColor};
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const QuoteTokenLabel = styled(BaseTokenLabel)`
  opacity: 0.6;
`;

const RecentPriceChangeLabel = styled(BaseTokenLabel)`
  font-weight: 500;
  font-size: 15px;
  line-height: 140%;
`;

const RecentPriceChangeLabelTiny = styled(RecentPriceChangeLabel)`
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
`;

const PriceLabel = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  line-height: 28px;
  color: ${(props) => props.textColor};
  font-feature-settings: 'tnum' on, 'lnum' on;
  margin-bottom: 12px;
  flex-wrap: nowrap;
`;

const PriceLabelTiny = styled(PriceLabel)<{ textColor: string }>`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.textColor};
  margin-bottom: 8px;
`;

const TokenBaseQuoteTokensContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const TokenBaseQuoteTokensContainerTiny = styled(TokenBaseQuoteTokensContainer)`
  margin-bottom: 8px;
`;

const FeaturedTokenPairCardContainer = styled.a<FeaturedTokenPairCardProps>`
  padding: 8px;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: ${CARD_HEIGHT};
  /* flex-basis: ${CARD_WIDTH}; */
  /* max-width: ${CARD_WIDTH}; */
  background: ${(props) => props.bgColor};
  max-width: 300px;
  width: 100%;
  padding: 30px 20px;
  padding-bottom: 5px;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;

const AnimatedFeaturedTokenPairCardContainer = a(
  FeaturedTokenPairCardContainer,
);

export interface FeaturedTokenPairCardProps {
  bgColor: string;
  textColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
}

export interface TokenCardAnimationProps {
  springStyle: any;
}

export interface FeaturedTokenPairMetadataProps {
  chartData?: Array<ChartDataPoint>;
  baseTokenSymbol: string | undefined;
  quoteTokenSymbol?: string;
  priceText: string | undefined;
  secondaryLabel: string | number | React.FC | undefined;
}

const FeaturedTokenPairCard = React.forwardRef<
  any,
  FeaturedTokenPairCardProps &
    FeaturedTokenPairMetadataProps &
    TokenCardAnimationProps
>(
  (
    {
      bgColor,
      textColor,
      as,
      href,
      chartData,
      baseTokenSymbol,
      quoteTokenSymbol,
      priceText,
      secondaryLabel,
      children,
      springStyle,
      ...rest
    },
    ref,
  ) => {
    const [currentCardState, setCurrentCardState] = useState<CardState>('idle');

    // Animations
    const cardBackgroundSpring = useSpring({
      config: { mass: 1, tension: 500, friction: 40 },
      scale: getBackgroundScale(currentCardState),
    });
    const cardTokenSpring = useSpring({
      scale: getTokenScale(currentCardState),
      y: getTokenScaleY(currentCardState),
      config: { mass: 1, tension: 400, friction: 50 },
    });

    const lineChartMargins = useMemo(() => {
      return {
        left: 4,
        top: 2,
        right: 2,
        bottom: 2,
      };
    }, []);

    return (
      <AnimatedFeaturedTokenPairCardContainer
        {...rest}
        bgColor={bgColor}
        textColor={textColor}
        as={as}
        href={href}
        ref={ref}
        onMouseEnter={() => setCurrentCardState('hovering')}
        onMouseDown={() => setCurrentCardState('pressed')}
        onMouseUp={() => setCurrentCardState('idle')}
        onMouseLeave={() => setCurrentCardState('idle')}
        onTouchStart={() => setCurrentCardState('pressed')}
        onTouchEnd={() => setCurrentCardState('idle')}
        style={{
          transform: interpolate(
            [cardBackgroundSpring.scale, springStyle.y],
            (s, y) => `translate3d(0,${y ?? 0}px,0) scale(${s})`,
          ),
          opacity: springStyle.opacity,
          ...((rest as any).style ?? {}),
        }}
      >
        <TopRowContainer>
          <TopLeftContainer>
            <TokenBaseQuoteTokensContainer>
              <BaseTokenLabel textColor={textColor} style={{ marginRight: 10 }}>
                {baseTokenSymbol}
              </BaseTokenLabel>
              {quoteTokenSymbol && (
                <QuoteTokenLabel textColor={textColor}>
                  {quoteTokenSymbol}
                </QuoteTokenLabel>
              )}
            </TokenBaseQuoteTokensContainer>
            <PriceLabel textColor={textColor}>{priceText}</PriceLabel>
            <RecentPriceChangeLabel textColor={textColor}>
              {secondaryLabel}
            </RecentPriceChangeLabel>
          </TopLeftContainer>
          <TopRightContainer>
            <SimpleLineChart
              chartData={chartData ?? []}
              width={110}
              height={50}
              margin={lineChartMargins}
              lineColor={textColor}
            />
          </TopRightContainer>
        </TopRowContainer>
        <AnimatedBottomRowContainer
          style={{
            transform: interpolate(
              [cardTokenSpring.scale, cardTokenSpring.y],
              (s, y) => `translate3d(0,${y}px,${y}px) scale(${s})`,
            ),
          }}
        >
          {children}
        </AnimatedBottomRowContainer>
      </AnimatedFeaturedTokenPairCardContainer>
    );
  },
);

const FeaturedTokenPairCardTinyContainer = styled.a<any>`
  padding: 8px;
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: ${CARD_HEIGHT_MINI};
  /* flex-basis: ${CARD_WIDTH}; */
  /* max-width: ${CARD_WIDTH}; */
  background: ${(props) => props.bgColor};
  max-width: 300px;
  width: 100%;
  padding: 30px 20px;
  padding-bottom: 5px;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;

const AnimatedFeaturedTokenPairCardTinyContainer = a(
  FeaturedTokenPairCardTinyContainer,
);

const AnimatedBottomRowContainerMini = a(BottomRowContainerMini);

export type CardState = 'hovering' | 'pressed' | 'idle';

const FeaturedTokenPairCardTiny = React.forwardRef<
  any,
  FeaturedTokenPairCardProps &
    FeaturedTokenPairMetadataProps &
    TokenCardAnimationProps & { onMouseEnter?: Function }
>(
  (
    {
      bgColor,
      textColor,
      as,
      href,
      chartData,
      baseTokenSymbol,
      quoteTokenSymbol,
      priceText,
      secondaryLabel,
      children,
      springStyle,
      ...rest
    },
    ref,
  ) => {
    const [currentCardState, setCurrentCardState] = useState<CardState>('idle');

    // Animations
    const cardBackgroundSpring = useSpring({
      config: { mass: 1, tension: 500, friction: 40 },
      scale: getBackgroundScale(currentCardState),
    });
    const cardTokenSpring = useSpring({
      scale: getTokenScale(currentCardState),
      y: getTokenScaleY(currentCardState),
      config: { mass: 1, tension: 400, friction: 50 },
    });

    return (
      <AnimatedFeaturedTokenPairCardTinyContainer
        {...rest}
        onMouseDown={() => setCurrentCardState('pressed')}
        onMouseUp={() => setCurrentCardState('idle')}
        onMouseLeave={() => setCurrentCardState('idle')}
        onTouchStart={() => setCurrentCardState('pressed')}
        onTouchEnd={() => setCurrentCardState('idle')}
        ref={ref}
        bgColor={bgColor}
        style={{
          transform: interpolate(
            [cardBackgroundSpring.scale, springStyle.y],
            (s, y) => `translate3d(0,${y ?? 0}px,0) scale(${s})`,
          ),
          opacity: springStyle.opacity,
        }}
        as={as}
        href={href}
        onMouseEnter={(e: any) => {
          setCurrentCardState('hovering');
          // It seems like someone else is passing down a mouse enter -- need to invesitgate?
          rest.onMouseEnter?.(e);
        }}
      >
        <TopRowContainer>
          <TopLeftContainer>
            <TokenBaseQuoteTokensContainerTiny>
              <BaseTokenLabel textColor={textColor} style={{ marginRight: 10 }}>
                {baseTokenSymbol}
              </BaseTokenLabel>
              {quoteTokenSymbol && (
                <QuoteTokenLabel textColor={textColor}>
                  {quoteTokenSymbol}
                </QuoteTokenLabel>
              )}
            </TokenBaseQuoteTokensContainerTiny>
            <PriceLabelTiny textColor={textColor}>{priceText}</PriceLabelTiny>
            <RecentPriceChangeLabelTiny textColor={textColor}>
              {secondaryLabel}
            </RecentPriceChangeLabelTiny>
          </TopLeftContainer>
          <TopRightContainer></TopRightContainer>
        </TopRowContainer>
        <AnimatedBottomRowContainerMini
          style={{
            transform: interpolate(
              [cardTokenSpring.scale, cardTokenSpring.y],
              (s, y) => `translate3d(0,${y}px,${y}px) scale(${s})`,
            ),
          }}
        >
          {children}
        </AnimatedBottomRowContainerMini>
      </AnimatedFeaturedTokenPairCardTinyContainer>
    );
  },
);
const AnimatedFeaturedTokenPairCardTiny = a(FeaturedTokenPairCardTiny);

const MobileTokenCardContainer = styled.a<{ bgColor: string }>`
  width: 100%;
  height: 135px;
  min-height: 135px;
  max-height: 135px;
  overflow: hidden;
  padding: 12px;
  display: flex;
  background-color: blue;
  justify-content: space-between;
  background: ${(props) => props.bgColor};
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;
const AnimatedMobileTokenCardContainer = a(MobileTokenCardContainer);

const MobileTokenLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const MobileTokenRightContainer = styled.div`
  padding: 0 12px;
  /* margin: 0 auto; */
  overflow: hidden;
  will-change: transform;
  /* min-height: 110px; */
  user-select: none;
  img {
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;
const AnimatedMobileTokenRightContainer = a(MobileTokenRightContainer);

const MobileSymbolLabel = styled.div`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #1f1f41;
`;

const MobilePriceLabel = styled.div`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 100%;
  color: #1f1f41;
`;

const MobilePercentChangeLabel = styled.div`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #1f1f41;
  opacity: 0.9;
`;

const MobileTokenCard = React.forwardRef<
  any,
  FeaturedTokenPairCardProps &
    FeaturedTokenPairMetadataProps &
    TokenCardAnimationProps & { onMouseEnter?: Function }
>(
  (
    {
      bgColor,
      textColor,
      as,
      href,
      chartData,
      baseTokenSymbol,
      quoteTokenSymbol,
      priceText,
      secondaryLabel,
      children,
      springStyle,
      ...rest
    },
    ref,
  ) => {
    const [currentCardState, setCurrentCardState] = useState<CardState>('idle');

    // Animations
    const cardBackgroundSpring = useSpring({
      config: { mass: 1, tension: 500, friction: 40 },

      scale: getBackgroundScale(currentCardState),
    });
    const cardTokenSpring = useSpring({
      scale: getTokenScale(currentCardState),
      y: getTokenScaleY(currentCardState),
      config: { mass: 1, tension: 400, friction: 50 },
    });

    return (
      <AnimatedMobileTokenCardContainer
        {...rest}
        onMouseDown={() => setCurrentCardState('pressed')}
        onMouseUp={() => setCurrentCardState('idle')}
        onMouseLeave={() => setCurrentCardState('idle')}
        onTouchStart={() => setCurrentCardState('pressed')}
        onTouchEnd={() => setCurrentCardState('idle')}
        ref={ref}
        bgColor={bgColor}
        style={{
          transform: interpolate(
            [cardBackgroundSpring.scale, springStyle.y],
            (s, y) => `translate3d(0,${y ?? 0}px,0) scale(${s})`,
          ),
          opacity: springStyle.opacity,
        }}
        as={as}
        href={href}
        onMouseEnter={(e: any) => {
          setCurrentCardState('hovering');
          // It seems like someone else is passing down a mouse enter -- need to invesitgate?
          rest.onMouseEnter?.(e);
        }}
      >
        <MobileTokenLeftContainer>
          <MobileSymbolLabel style={{ marginBottom: 8 }}>
            {baseTokenSymbol}
          </MobileSymbolLabel>
          <MobilePriceLabel style={{ marginBottom: 8 }}>
            {priceText}
          </MobilePriceLabel>
          <MobilePercentChangeLabel>{secondaryLabel}</MobilePercentChangeLabel>
        </MobileTokenLeftContainer>
        <AnimatedMobileTokenRightContainer
          style={{
            transform: interpolate(
              [cardTokenSpring.scale, cardTokenSpring.y],
              (s, y) => `translate3d(0,${y}px,${y}px) scale(${s})`,
            ),
          }}
        >
          {children}
        </AnimatedMobileTokenRightContainer>
      </AnimatedMobileTokenCardContainer>
    );
  },
);

// const MemoizedFeaturedTokenPairCard = React.memo(FeaturedTokenPairCard);

export {
  FeaturedTokenPairCard,
  AnimatedFeaturedTokenPairCardTiny as FeaturedTokenPairCardTiny,
  MobileTokenCard,
};
