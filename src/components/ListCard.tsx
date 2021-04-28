import styled from 'styled-components';
import React, { useState } from 'react';
import { useSpring, animated as a, interpolate } from 'react-spring';

export const CARD_HEIGHT = '220px';
export const CARD_WIDTH = '180px';

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
  padding: 24px;
  padding-bottom: 0px;
`;

const TopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TopRightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 15px;
`;

const BottomRowContainer = styled.div`
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  will-change: transform;
  user-select: none;
  img {
    margin: 0 auto;
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 220px;
    max-height: 220px;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;
const AnimatedBottomRowContainer = a(BottomRowContainer);

const HeaderLabel = styled.div`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;

const ListHeaderContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const ListCardContainer = styled.a<ListCardProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${(props) => props.bgColor};
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;

const ListCardRelativeContainer = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  min-height: ${CARD_HEIGHT};
  max-height: ${CARD_HEIGHT};
  max-width: 300px;
  width: 100%;
`;

const AnimatedListCardContainer = a(ListCardContainer);

export interface ListCardProps {
  bgColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
}

export interface ListCardAnimationProps {
  springStyle: any;
}

export interface ListCardMetadataProps {
  title: string | undefined;
  id: string | undefined;
}

const ListCard = React.forwardRef<
  any,
  ListCardProps & ListCardMetadataProps & ListCardAnimationProps
>(({ bgColor, as, href, title, id, children, springStyle, ...rest }, ref) => {
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
    <ListCardRelativeContainer>
      <AnimatedListCardContainer
        {...rest}
        bgColor={bgColor}
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
          opacity: springStyle?.opacity,
          ...((rest as any).style ?? {}),
        }}
      >
        <TopRowContainer>
          <TopLeftContainer>
            <ListHeaderContainer>
              <HeaderLabel>{title}</HeaderLabel>
            </ListHeaderContainer>
          </TopLeftContainer>
          <TopRightContainer></TopRightContainer>
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
      </AnimatedListCardContainer>
    </ListCardRelativeContainer>
  );
});

export type CardState = 'hovering' | 'pressed' | 'idle';

export {
  ListCard,
  //   MobileListCard, TODO(dave4506): do we need a mobile card?
};
