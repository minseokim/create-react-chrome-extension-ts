import styled from 'styled-components';
import React, { ReactNode, useMemo, useState } from 'react';
import { useSpring, animated as a, interpolate } from 'react-spring';
import { ActiveCheckmarkIcon } from '../icons/ActiveCheckmark';

const CARD_HEIGHT_MINI = '220px';
const CARD_WIDTH_MINI = '186px';

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

const TextContainer = styled.div`
  padding: 0 16px 16px 16px;
`;

const ImageContainer = styled.div`
  display: flex;
  overflow: hidden;
  will-change: transform;
  /* margin-top: 5px; */
  user-select: none;
  width: 100%;
  img {
    object-fit: cover;
    max-width: 100%;
    max-height: 132px;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;

const Text = styled.div<{ textColor: string }>`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.textColor};
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const TopRightContainer = styled.div`
  top: 12px;
  right: 12px;
  position: absolute;
`;

export interface CardProps {
  bgColor: string;
  textColor: string;
  as?: 'a';
  href?: string;
  children?: any;
  onClick?: () => void;
}

export interface CardAnimationProps {
  springStyle: any;
}

export interface CardMetadataProps {
  text: string | undefined;
  topRight?: ReactNode | undefined;
}

const CardContainer = styled.a<any>`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: ${CARD_HEIGHT_MINI};
  background: ${(props) => props.bgColor};
  max-width: 300px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;

const AnimatedCardContainer = a(CardContainer);

const AnimatedImageContainer = a(ImageContainer);

export type CardState = 'hovering' | 'pressed' | 'idle';

const ActionCardBase = React.forwardRef<
  any,
  CardProps & CardAnimationProps & CardMetadataProps
>(
  (
    {
      bgColor,
      textColor,
      as,
      href,
      onClick,
      text,
      topRight,
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
      <AnimatedCardContainer
        {...rest}
        onMouseDown={() => setCurrentCardState('pressed')}
        onMouseUp={() => setCurrentCardState('idle')}
        onMouseLeave={() => setCurrentCardState('idle')}
        onTouchStart={() => setCurrentCardState('pressed')}
        onTouchEnd={() => setCurrentCardState('idle')}
        ref={ref}
        bgColor={bgColor}
        style={{
          // transform: interpolate(
          //   [cardBackgroundSpring.scale, springStyle.y],
          //   (s, y) => `translate3d(0,${y ?? 0}px,0) scale(${s})`,
          // ),
          transform: interpolate(
            [cardBackgroundSpring.scale],
            (s) => `scale(${s})`,
          ),
          opacity: springStyle.opacity,
        }}
        as={as}
        href={href}
        onMouseEnter={() => {
          setCurrentCardState('hovering');
          // It seems like someone else is passing down a mouse enter -- need to invesitgate?
        }}
      >
        <AnimatedImageContainer
          style={{
            transform: interpolate(
              [cardTokenSpring.scale, cardTokenSpring.y],
              (s, y) => `translate3d(0,${y}px,${y}px) scale(${s})`,
            ),
          }}
        >
          {children}
        </AnimatedImageContainer>
        <TopRightContainer>{topRight}</TopRightContainer>
        <TextContainer>
          <Text textColor={textColor}>{text}</Text>
        </TextContainer>
      </AnimatedCardContainer>
    );
  },
);

export type ActionCardState = 'completed' | 'available' | 'waiting';

const SuccessCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 9000%;
  background-color: #1dd13a;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 10px;
    height: 10px;
  }
  > svg * {
    fill: #ffffff;
  }
`;

const SuccessIcon = () => {
  return (
    <SuccessCircle>
      <ActiveCheckmarkIcon />
    </SuccessCircle>
  );
};

const ActionCardWithState = React.forwardRef<
  any,
  CardProps &
    CardAnimationProps &
    CardMetadataProps & { actionState: ActionCardState }
>(({ bgColor, textColor, actionState, ...rest }, ref) => {
  const bgColorDerivedFromState = useMemo(() => {
    if (actionState === 'completed' || actionState === 'waiting') {
      return '#F7F7FF';
    }
    return bgColor;
  }, [actionState, bgColor]);
  const textColorDerivedFromState = useMemo(() => {
    if (actionState === 'completed' || actionState === 'waiting') {
      return '#7578B5';
    }
    return textColor;
  }, [actionState, textColor]);

  const topRight = useMemo(() => {
    if (actionState === 'completed') {
      return <SuccessIcon />;
    }
    return <></>;
  }, [actionState]);

  return (
    <ActionCardBase
      ref={ref}
      bgColor={bgColorDerivedFromState}
      textColor={textColorDerivedFromState}
      topRight={topRight}
      {...rest}
    />
  );
});

const ActionCardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, ${CARD_WIDTH_MINI});
  grid-gap: 12px;
`;

export { ActionCardsRow, ActionCardBase, ActionCardWithState };
