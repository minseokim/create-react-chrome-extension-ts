import styled from 'styled-components';
import React, { useState } from 'react';
import { useSpring, animated as a, interpolate } from 'react-spring';

const CARD_HEIGHT = '300px';
// const CARD_WIDTH = '230px';
const MD_CARD_HEIGHT = '280px';
const SM_CARD_HEIGHT = '220px';

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
const getFeaturedScale = (state: CardState) => {
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
const getFeaturedScaleY = (state: CardState) => {
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
  padding: 30px 20px;
  padding-bottom: 0px;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 20px 24px;
    padding-bottom: 0px;
  }
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopRightContainer = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const BottomRowContainer = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  flex-grow: 1;
  will-change: transform;
  min-height: 170px;
  width: 100%;
  user-select: none;
  img {
    display: block;
    margin: 0 auto;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    min-height: 120px;
  }
`;

export interface FeaturedCardAnimationProps {
  springStyle: any;
}

const FeaturedCardContainer = styled.a<any>`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: ${CARD_HEIGHT};
  background: ${(props) => props.bgColor};
  max-width: 300px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    height: ${MD_CARD_HEIGHT};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: ${SM_CARD_HEIGHT};
  }
`;

const AnimatedFeaturedCardContainer = a(FeaturedCardContainer);

const AnimatedBottomRowContainer = a(BottomRowContainer);

export type CardState = 'hovering' | 'pressed' | 'idle';

export interface FeaturedCardProps {
  bgColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
  topRight?: React.ReactNode;
  topLeft?: React.ReactNode;
}

const FeaturedCard = React.forwardRef<
  any,
  FeaturedCardProps & FeaturedCardAnimationProps
>(
  (
    { bgColor, as, href, topLeft, topRight, children, springStyle, ...rest },
    ref,
  ) => {
    const [currentCardState, setCurrentCardState] = useState<CardState>('idle');

    // Animations
    const cardBackgroundSpring = useSpring({
      config: { mass: 1, tension: 500, friction: 40 },
      scale: getBackgroundScale(currentCardState),
    });
    const cardFeaturedSpring = useSpring({
      scale: getFeaturedScale(currentCardState),
      y: getFeaturedScaleY(currentCardState),
      config: { mass: 1, tension: 400, friction: 50 },
    });

    return (
      <AnimatedFeaturedCardContainer
        {...rest}
        onMouseDown={() => setCurrentCardState('pressed')}
        onMouseUp={() => setCurrentCardState('idle')}
        onMouseLeave={() => setCurrentCardState('idle')}
        onTouchStart={() => setCurrentCardState('pressed')}
        onTouchEnd={() => setCurrentCardState('idle')}
        onMouseEnter={() => setCurrentCardState('hovering')}
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
      >
        <TopRowContainer>
          <TopLeftContainer>{topLeft}</TopLeftContainer>
          <TopRightContainer>{topRight}</TopRightContainer>
        </TopRowContainer>
        <AnimatedBottomRowContainer
          style={{
            transform: interpolate(
              [cardFeaturedSpring.scale, cardFeaturedSpring.y],
              (s, y) => `translate3d(0,${y}px,${y}px) scale(${s})`,
            ),
          }}
        >
          {children}
        </AnimatedBottomRowContainer>
      </AnimatedFeaturedCardContainer>
    );
  },
);

const AnimatedFeaturedCard = a(FeaturedCard);

export { AnimatedFeaturedCard as FeaturedCard };
