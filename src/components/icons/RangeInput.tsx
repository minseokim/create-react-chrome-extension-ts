import React, { DetailedHTMLProps, InputHTMLAttributes, useMemo } from 'react';
import styled from 'styled-components';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface ExternalStyledRangeProps extends InputProps {
  belowThumbColor?: string;
  aboveThumbColor?: string;
  min: number;
  max: number;
  value: number;
}

export interface InternalStyledRangeProps extends ExternalStyledRangeProps {
  rangePercentOutOf100: number | string;
}

const StyledRange = styled.input<InternalStyledRangeProps>`
  -webkit-appearance: none;
  appearance: none;
  height: 6px !important;
  width: 100%;
  border-radius: 4px;
  background-color: #bdc5e8;
  outline: none;
  background: ${(props) =>
    `linear-gradient(to right, ${props.belowThumbColor ?? '#706EFF'} 0%, ${
      props.belowThumbColor ?? '#706EFF'
    } ${props.rangePercentOutOf100}%, ${props.aboveThumbColor ?? `#BDC5E8`} ${
      props.rangePercentOutOf100
    }%, ${props.aboveThumbColor ?? `#BDC5E8`} 100%)`};
  outline: none;
  margin-bottom: 14px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #706eff;
    box-shadow: 0px 10px 30px rgba(14, 16, 60, 0.05);
  }

  /* &:hover::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  } */

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
    border: 2px solid #706eff;
    box-shadow: 0px 10px 30px rgba(14, 16, 60, 0.05);
  }
`;
const StyledRangeMemo = React.memo(StyledRange);

const MatchaRange: React.FC<ExternalStyledRangeProps> = (props) => {
  const inputEl = React.useRef<HTMLInputElement>(null);

  const { min, max, value } = props;
  const { ref, ...propsWithRef } = props;

  const percentage = useMemo(() => {
    const range = Math.max(max - min, 0);
    const adjustedValue = value - min;
    const _percentage =
      !range || range === 0 ? 0 : (adjustedValue * 100) / range;
    return _percentage;
  }, [max, min, value]);

  return (
    <StyledRangeMemo
      ref={inputEl}
      rangePercentOutOf100={percentage}
      {...propsWithRef}
    />
  );
};

const MatchaRangeMemo = React.memo(MatchaRange);

export { MatchaRangeMemo as RangeInput };
