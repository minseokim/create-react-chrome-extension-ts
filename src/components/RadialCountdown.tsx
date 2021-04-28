import React from 'react';
import styled from 'styled-components';
import { useSpring, animated as a, useTransition } from 'react-spring';
import { SuccessCheckmark } from './icons/SuccessCheckmark';

const Container = styled.div`
  position: relative;
  height: 160px;
  width: 160px;
  min-width: 160px;
  min-height: 160px;
  border-radius: 50%;
  background-color: #e8ecfd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerContainerRelative = styled.div`
  position: relative;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(14, 16, 60, 0.1);
  height: 130px;
  width: 130px;
  border-radius: 50%;
`;

const InnerContainerAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnimatedInnerContainerAbsolute = a(InnerContainerAbsolute);

const PieClipLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 160px;
  clip: rect(0px, 160px, 160px, 80px);
`;

const SliceLeft = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  clip: rect(0px, 80px, 160px, 0px);
  border-radius: 80px;
  background-color: #8e8cff;
  border-color: #8e8cff;
  transform: rotate(0);
  zoom: 1;
`;
const AnimatedSliceLeft = a(SliceLeft);

const PieClipRight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 160px;
  clip: rect(0, 80px, 160px, 0px);
`;

const SliceRight = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  clip: rect(0px, 160px, 160px, 80px);
  border-radius: 80px;
  background-color: #8e8cff;
  border-color: #8e8cff;
  transform: rotate(0);
`;
const AnimatedSliceRight = a(SliceRight);

export const RadialCountdownLabel = styled.div`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  text-align: center;
  color: #0e103c;
  opacity: 0.6;
  margin-bottom: 4px;
`;

export const RadialCountdownNumbers = styled.div`
  font-family: 'Gilroy';
  font-weight: 600;
  font-size: 24px;
  line-height: 120%;
  text-align: center;
  color: #0e103c;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const RadialCountdown: React.FC<{
  percent: number;
  onCountdownCompleteAnimationFinish?: () => void;
}> = ({ percent, children, onCountdownCompleteAnimationFinish }) => {
  const complete = percent >= 100;

  const props = useSpring({
    x: percent, // range 0 - 100
    color: complete ? '#2BDDBF' : '#8e8cff',
    config: {
      duration: complete ? 500 : 1000,
    },
    initial: {
      x: 0,
    },
    onRest: ({ x: percentComplete }) => {
      if ((percentComplete as number) >= 100) {
        setTimeout(() => {
          onCountdownCompleteAnimationFinish?.();
        }, 500);
      }
    },
  });

  // TODO(johnrjj) = Turn these into two useSprings that are chained together rather than a useTransition
  const transitions = useTransition(
    complete,
    (complete) => complete.toString(),
    {
      from: { y: -8, opacity: 0 },
      enter: { y: 0, opacity: 1 },
      leave: { y: -8, opacity: 0 },
      initial: {
        y: 0,
        opacity: 1,
      },
      config: {
        delay: 500,
      },
    },
  );

  // The radial progress bar is done via two half circles (using clippath)
  // We rotate the two half circles to show progress.
  const leftSide = props.x
    .interpolate([0, 50], [0, 180], 'clamp')
    .interpolate((x) => `rotate(${x}deg)`);
  const rightSide = props.x
    .interpolate([49.99999, 100], [0, 180], 'clamp')
    .interpolate((x) => `rotate(${x}deg)`);
  return (
    <Container>
      <PieClipLeft>
        <AnimatedSliceLeft
          style={{ transform: leftSide, backgroundColor: props.color }}
        />
      </PieClipLeft>
      <PieClipRight>
        <AnimatedSliceRight
          style={{ transform: rightSide, backgroundColor: props.color }}
        />
      </PieClipRight>
      <InnerContainerRelative>
        {transitions.map(({ item: isComplete, key, props }) => {
          if (isComplete) {
            return (
              <AnimatedInnerContainerAbsolute key={key} style={props}>
                <a.div>
                  <SuccessCheckmark />
                </a.div>
              </AnimatedInnerContainerAbsolute>
            );
          } else {
            return (
              <AnimatedInnerContainerAbsolute key={key} style={props}>
                <a.div>{children}</a.div>
              </AnimatedInnerContainerAbsolute>
            );
          }
        })}
      </InnerContainerRelative>
    </Container>
  );
};

export { RadialCountdown };
