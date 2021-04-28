import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated as a,
  SpringHandle,
} from 'react-spring';
import { useMeasure } from '../hooks/useMeasure';
import { useMounted } from '../hooks/useMounted';
import { useDetectMobile } from '../hooks/useDetectMobile';
import { TokenIconInCircleWithFallback } from './checkout/icons/TokenIcons';
import { ChevronDownIcon } from './icons/ChevronDown';
import type { Asset } from '../types/matcha';
import { useCuratedTokens } from '../contexts/curated-token-asset-datas';
import { useTokensStats } from '../contexts/token-stats';
import sortBy from 'lodash/sortBy';

const PILL_GRID_GAP = 10;
const PILL_WIDTH = 120;
const PILL_HEIGHT = 44;
const CONTAINER_PADDING_TOP = 2;
const CONTAINER_PADDING_BOTTOM = 24;

const TokenPillContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  border: 1px solid #e8ecfd;
  border-radius: 72px;
  padding: 5px;
  transition: all 0.18s ease-in;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  will-change: transform, background-color, box-shadow;
  :active {
    transform: scale(0.98);
  }
  :hover {
    transform: scale(0.98), translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const H5 = styled.h5`
  font-family: 'Gilroy';
  font-weight: 600;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* 2px top equal out the gilroy line height  */
  margin-top: 2px;
`;

const ChevronAbsolutePositioningContainer = styled.div`
  position: absolute;
  top: ${CONTAINER_PADDING_TOP}px;
  height: ${PILL_HEIGHT}px;
  width: ${PILL_HEIGHT}px;
  z-index: 1;
  border-radius: 100%;
  overflow: hidden;

  transition: all 0.18s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :hover {
    transform: scale(0.98), translateY(-2px);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const HiddenTokenIconPreloader = styled.div`
  visibility: hidden;
  position: absolute;
`;

const ChevronPillContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  transform: rotate(0deg);
  will-change: transform;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e8ecfd;
  box-sizing: border-box;
  border-radius: 100%;
`;

const AnimatedChevronPillContainer = a(ChevronPillContainer);

const RelativeContainer = styled.div`
  width: 100%;
  position: relative;
  will-change: height;
  margin-bottom: 16px;
  padding-top: ${CONTAINER_PADDING_TOP}px;
  overflow-y: hidden;
`;
const AnimatedRelativeContainer = a(RelativeContainer);

const AbsoluteContainer = styled.div<{ itemsPerRow: number | undefined }>`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    ${(props) => props.itemsPerRow ?? 'auto-fill'},
    minmax(${PILL_WIDTH}px, ${PILL_WIDTH}px)
  );
  grid-gap: ${PILL_GRID_GAP}px;
  padding: 0 0 0 0;
  background: white;
  border-radius: 5px;
  will-change: width, height;
`;
const AnimatedAbsoluteContainer = a(AbsoluteContainer);

const Item = styled(a.div)`
  cursor: pointer;
  position: relative;
  width: ${PILL_WIDTH}px;
  height: ${PILL_HEIGHT}px;
  min-width: ${PILL_WIDTH}px;
  max-width: ${PILL_WIDTH}px;
  min-height: ${PILL_HEIGHT}px;
  max-height: ${PILL_HEIGHT}px;
  background: white;
  border-radius: 5px;
  will-change: transform, opacity;
`;

const ItemInner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  will-change: transform;
`;
const AnimatedItemInner = a(ItemInner);

const MobileHorizontalContainer = styled.div`
  position: relative;
  height: ${PILL_HEIGHT + CONTAINER_PADDING_BOTTOM + CONTAINER_PADDING_TOP}px;
  margin-bottom: 16px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const MobileHorizontalScrollContainer = styled.div`
  display: flex;
  flex-wrap: row;
  position: absolute;
  -webkit-overflow-scrolling: touch;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: scroll;
  margin-top: -16px;
  padding-top: 16px;
  margin-bottom: -16px;
  padding-bottom: 16px;
`;

const MobileItemContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  width: ${PILL_WIDTH}px;
  height: ${PILL_HEIGHT}px;
  max-width: ${PILL_WIDTH}px;
  max-height: ${PILL_HEIGHT}px;
  min-width: ${PILL_WIDTH}px;
  min-height: ${PILL_HEIGHT}px;
  margin: 0 5px;
`;

export interface TokenPillContainerProps {
  tokenSymbol: string;
}

const MemoizedTokenPillContainer = React.memo(
  ({ tokenSymbol }: TokenPillContainerProps) => {
    return (
      <TokenPillContainer>
        <TokenIconInCircleWithFallback
          containerHeight={34}
          containerWidth={34}
          iconHeight={16}
          iconWidth={16}
          symbolOrAddress={tokenSymbol}
        />
        <H5 style={{ marginLeft: 10 }}>{tokenSymbol}</H5>
      </TokenPillContainer>
    );
  },
);

export interface ExpandingTokenSelectProps {
  baseTokenSymbol: string | undefined;
  onClickTokenPill: (asset: Asset) => void;
}

const ExpandingTokenSelect: React.FC<ExpandingTokenSelectProps> = ({
  baseTokenSymbol,
  onClickTokenPill,
}) => {
  // Expanding list only has curated tokens
  const curatedAssets = useCuratedTokens();
  const tokensStats = useTokensStats();

  const sortedCuratedAssets = sortBy(
    curatedAssets,
    (a) => tokensStats?.[a.symbol]?.MKTCAP ?? 0,
  )
    .reverse()
    .slice(0, 20);

  const [isAvailableTokensExpanded, setIsAvailableTokensExpanded] = useState(
    false,
  );

  const mounted = useMounted();

  const [
    bindShowAlwaysContainerMeasure,
    { height: relativeContainerHeight, width: availableWidthForContainer },
  ] = useMeasure();

  // Compute number of pills that can sit on one line
  // (we measure the total available container width, pills are constant width, do the math below)
  // -PILL_WIDTH to leave space for the chevron control
  const numberOfPillItemsOnFirstRow = Math.floor(
    (availableWidthForContainer - PILL_WIDTH / 2) /
      (PILL_WIDTH + PILL_GRID_GAP / 2),
  );

  const springRef = useRef<SpringHandle>(null);
  const relativeContainerSpringProps = useSpring({
    ref: springRef,
    opacity: 1,
    config: { ...config.stiff, clamp: true },
    height: isAvailableTokensExpanded
      ? relativeContainerHeight +
        CONTAINER_PADDING_BOTTOM +
        CONTAINER_PADDING_TOP
      : PILL_HEIGHT + CONTAINER_PADDING_BOTTOM + CONTAINER_PADDING_TOP,
  });

  const quoteTokens = useMemo(() => {
    return [...sortedCuratedAssets.filter((x) => x.symbol !== baseTokenSymbol)];
  }, [baseTokenSymbol, sortedCuratedAssets]);
  const transitionData = useMemo(() => {
    if (!mounted) {
      return [];
    }
    return isAvailableTokensExpanded
      ? quoteTokens
      : quoteTokens.slice(0, numberOfPillItemsOnFirstRow || 4);
  }, [
    mounted,
    numberOfPillItemsOnFirstRow,
    isAvailableTokensExpanded,
    quoteTokens,
  ]);

  const transRef = useRef(null);
  const transitions = useTransition(
    transitionData,
    (item) => item.tokenAddress,
    {
      reset: !mounted,
      ref: transRef,
      unique: true,
      trail: 40,
      initial: {
        opacity: 1,
      },
      from: {
        opacity: 0,
        scale: 0.85,
      },
      enter: {
        opacity: 1,
        scale: 1,
      },
      leave: {
        config: {
          duration: 40,
        },
        opacity: 0,
        scale: 0.85,
      },
    },
  );

  const isChevronHidden =
    quoteTokens && numberOfPillItemsOnFirstRow >= quoteTokens?.length;

  const chevronSpringProps = useSpring({
    initial: {
      rotate: 0,
      opacity: 1,
    },
    rotate: isAvailableTokensExpanded ? 180 : 0,
    opacity: isChevronHidden ? 0 : 1,
    config: { mass: 4, tension: 500, friction: 80 },
  });

  const chevronRightPosition =
    numberOfPillItemsOnFirstRow * PILL_WIDTH +
    numberOfPillItemsOnFirstRow * PILL_GRID_GAP;

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(
    isAvailableTokensExpanded ? [springRef, transRef] : [transRef, springRef],
    [0, isAvailableTokensExpanded ? 0.05 : 0],
  );

  const isMobile = useDetectMobile();

  if (isMobile) {
    return (
      <MobileHorizontalContainer>
        <MobileHorizontalScrollContainer>
          {quoteTokens.map((tokenAsset) => {
            return (
              <MobileItemContainer
                onClick={() => {
                  onClickTokenPill(tokenAsset);
                }}
              >
                <MemoizedTokenPillContainer
                  tokenSymbol={tokenAsset.symbol}
                  key={tokenAsset.tokenAddress}
                />
              </MobileItemContainer>
            );
          })}
        </MobileHorizontalScrollContainer>
      </MobileHorizontalContainer>
    );
  }

  return (
    <AnimatedRelativeContainer style={relativeContainerSpringProps}>
      <HiddenTokenIconPreloader>
        {quoteTokens.map((x) => {
          <TokenIconInCircleWithFallback
            key={`${x}-hidden-preload`}
            containerHeight={34}
            containerWidth={34}
            iconHeight={16}
            iconWidth={16}
            symbolOrAddress={x.tokenAddress}
          />;
        })}
      </HiddenTokenIconPreloader>
      <ChevronAbsolutePositioningContainer
        style={{
          left: `${chevronRightPosition}px`,
        }}
        onClick={() => {
          setIsAvailableTokensExpanded((open) => !open);
        }}
      >
        <AnimatedChevronPillContainer style={chevronSpringProps}>
          <ChevronDownIcon width={11} height={7} />
        </AnimatedChevronPillContainer>
      </ChevronAbsolutePositioningContainer>
      <AnimatedAbsoluteContainer
        itemsPerRow={numberOfPillItemsOnFirstRow}
        {...bindShowAlwaysContainerMeasure}
      >
        {transitions.map(
          ({
            item: tokenSymbolSnapshotForTransition,
            key: springKey,
            props: styleProps,
          }) =>
            tokenSymbolSnapshotForTransition && (
              <Item
                key={springKey}
                onClick={() => {
                  onClickTokenPill(tokenSymbolSnapshotForTransition);
                  setIsAvailableTokensExpanded(false);
                }}
              >
                <AnimatedItemInner key={springKey} style={{ ...styleProps }}>
                  <MemoizedTokenPillContainer
                    tokenSymbol={tokenSymbolSnapshotForTransition.symbol}
                  />
                </AnimatedItemInner>
              </Item>
            ),
        )}
      </AnimatedAbsoluteContainer>
    </AnimatedRelativeContainer>
  );
};

const MemoExpandingTokenSelect = React.memo(ExpandingTokenSelect);

export { MemoExpandingTokenSelect as ExpandingTokenSelect };
