import React from 'react';
import Lottie from 'lottie-react';
import animationData from './lotties/aggregation-radar.json';

export interface LottieProps {
  style?: React.CSSProperties;
  className?: string;
}

const AggregationRadarLottie = (props: LottieProps) => {
  return (
    <Lottie
      className={props.className}
      animationData={animationData}
      loop={true}
      autoPlay={true}
      style={props.style}
    />
  );
};

export { AggregationRadarLottie };
export default AggregationRadarLottie;
