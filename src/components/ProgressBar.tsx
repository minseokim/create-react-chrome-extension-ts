import styled from 'styled-components';
import { calculate24hPriceWidth } from '../utils/calculate-24h-price-width';

const ProgressBarContainer = styled.div`
  padding: 0;
  width: 190px;
  height: 6px;
  background: ${(props) => props.theme.palette.mutedPurple};
  border-radius: 50px;
`;

const ProgressBarMain = styled.div<{ width: number; backgroundColor: string }>`
  position: relative;
  min-width: 1%;
  height: 100%;
  width: ${(props) => `${props.width}%`};
  background: ${(props) => props.backgroundColor || props.theme.palette.grey};
  border-radius: 50px;
`;

const ProgressBarPercentage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

interface ProgressBarProps {
  low?: number;
  high?: number;
  currentPrice?: number;
  width?: number;
  backgroundColor?: string;
}

// Can be used for 24h low / price display(Assets Page) as well as generic progress bar(Transaction Page)
const ProgressBar: React.FC<ProgressBarProps> = ({ ...props }) => {
  let width = props.width;

  // If no width is provided, calculate it based on 24h & current price
  if (!props.width && props.low && props.high && props.currentPrice) {
    width = calculate24hPriceWidth(props.low, props.high, props.currentPrice);
  }

  return (
    <ProgressBarContainer>
      {width ? (
        <ProgressBarMain
          width={width}
          backgroundColor={props.backgroundColor || ''}
        >
          <ProgressBarPercentage></ProgressBarPercentage>
        </ProgressBarMain>
      ) : null}
    </ProgressBarContainer>
  );
};

export { ProgressBar };
