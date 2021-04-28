import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { useTransition, a } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import { useToastMessages, TxToastData } from '../contexts/toast-messages';
import { useSecondsRemaining } from '../hooks/useSecondsRemaining';
import { useDetectMobile } from '../hooks/useDetectMobile';
import { TokenIcon } from './checkout/icons/TokenIcons';
import { SpinnerIcon } from './icons/Spinner';

import { getEtherscanLinkFromTxHash } from '../utils/ethereum';
import { TAB_BAR_HEIGHT } from './TabBar';

const TOAST_WIDTH_PX = 370;
const TOAST_PADDING_PX = 15;

const TokenIconContainer = styled.div<{ isRight?: boolean }>`
  width: 30px;
  height: 30px;
  position: absolute;
  background: ${(props) => props.theme.colors.backgroundColor};
  border: 3px solid #f6f6f9;
  border-radius: 94px;
  ${(props) => (props.isRight ? 'right: 0' : 'left: 0')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TokenIcons = styled.div`
  position: relative;
  width: 50px;
  height: 30px;
`;

const ToastContentWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${TOAST_PADDING_PX}px;
  position: relative;
  width: ${TOAST_WIDTH_PX}px;
  height: 61px;
  background: ${(props) => props.theme.colors.backgroundColor};
  border: 1px solid #e3e3f2;
  border-radius: 19px;

  :hover {
    border: 1px solid #cccce2;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const TxStatusWrapper = styled.div<{ borderColor?: string }>`
  height: 30px;
  border: ${(props) => props.borderColor && `1px solid ${props.borderColor}`};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const InProgressStatusWrapper = styled(TxStatusWrapper)`
  min-width: 80px;
  justify-content: space-between;
`;

const MessageText = styled.span<{
  isBold?: boolean;
  fontSize?: string;
  color?: string;
  margin?: string;
}>`
  font-family: 'Gilroy';
  font-weight: ${(props) =>
    props.isBold ? 'bold' : props.theme.fontWeights.medium};
  font-size: ${(props) => props.fontSize || '14px'};
  line-height: 110%;
  color: ${(props) => props.color || props.theme.colors.primaryText};
  margin: ${(props) => props.margin};
`;

const StatusText = styled(MessageText)<{ isNoMargin?: boolean }>`
  line-height: 100%;
  margin: ${(props) => (props.isNoMargin ? '0' : '0 17px')};
`;

const secondsToMMSS = (time: number) => {
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  return [minutes, seconds]
    .map((value) => (value < 10 ? '0' + value : value))
    .join(':');
};

const TxInprogressMessage: FC<{ secondsRemaining?: number }> = ({
  secondsRemaining,
}) => (
  <InProgressStatusWrapper>
    {!isNil(secondsRemaining) && (
      <StatusText fontSize="12px" isNoMargin>
        {secondsToMMSS(secondsRemaining)} left
      </StatusText>
    )}
    <SpinnerIcon />
  </InProgressStatusWrapper>
);

const TxSuccessMessage = () => (
  <TxStatusWrapper borderColor="rgba(49, 167, 147, 0.5)">
    <StatusText fontSize="12px" color="#31A793">
      Success
    </StatusText>
  </TxStatusWrapper>
);

const TxFailedMessage = () => (
  <TxStatusWrapper borderColor="#FFC2C5">
    <StatusText fontSize="12px" color="#FF656D">
      Failed
    </StatusText>
  </TxStatusWrapper>
);

const ToastsWrapper = styled.div`
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + ${TAB_BAR_HEIGHT});
  left: 0;
  margin: 15px;
  display: flex;
  flex-direction: column-reverse;
  cursor: pointer;
  z-index: ${(props) => props.theme.zIndices.overlay};
`;

const CloseIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.1799 9.67768C8.47147 9.97189 8.94634 9.97403 9.24055 9.68246C9.53476 9.39088 9.53689 8.91602 9.24532 8.62181L5.80988 5.15528L9.27766 1.71859C9.57187 1.42702 9.574 0.952149 9.28243 0.65794C8.99086 0.36373 8.51599 0.361592 8.22178 0.653164L4.754 4.08986L1.31732 0.622088C1.02575 0.327879 0.55088 0.32574 0.256671 0.617312C-0.0375382 0.908883 -0.0396762 1.38375 0.251895 1.67796L3.68858 5.14573L0.222063 8.58117C-0.0721456 8.87274 -0.0742843 9.34761 0.217288 9.64181C0.508859 9.93602 0.983728 9.93816 1.27794 9.64659L4.74445 6.21116L8.1799 9.67768Z"
      fill="#0E103C"
    />
  </svg>
);

const CloseToastCirle = styled.div`
  width: 33px;
  height: 33px;
  background: #ffffff;
  border: 1px solid #e3e3f2;
  box-sizing: border-box;
  border-radius: 19px;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
  display: none;

  :hover {
    border: 1px solid #cccce2;
  }
`;

// NOTE: extend the animated wrapper to keep effects
const AnimatedToastContentWrapper = a(ToastContentWrapper);

const TxToastWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  & + & {
    margin-bottom: 21px;
  }

  :hover {
    ${CloseToastCirle} {
      display: flex;
    }
  }
`;

export interface TxToastProps extends TxToastData {
  isMobile?: boolean;
  style?: object;
}

const TxToast: FC<TxToastProps> = ({
  id,
  sellingTokenSymbol,
  sellingAmount,
  buyingTokenSymbol,
  buyingTokenAmount,
  status,
  estimatedCompletionTime,
  style,
  isMobile,
  txHash,
}) => {
  const secondsRemaining = useSecondsRemaining(estimatedCompletionTime);
  const willRemoveRef = useRef<boolean>(false);
  const { removeToast } = useToastMessages();

  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleOnClick = useCallback(() => {
    const etherscanTxUrl = getEtherscanLinkFromTxHash(txHash);
    if (etherscanTxUrl) {
      window.open(etherscanTxUrl, '_blank', 'noopener');
    }
    // if (status === 'failed') {
    // } else if (!router.pathname.includes(routes.PROFILE)) {
    //   router.push(routes.PROFILE);
    // }
  }, [txHash]);

  const handleRemove = useCallback(() => {
    setIsRemoving(true);
    removeToast(id);
  }, [id, removeToast]);

  // TODO: follow along with swipe
  const bind = useDrag(({ swipe }) => {
    const [swipeX] = swipe;

    if (swipeX === -1) {
      handleRemove();
    }
  });

  // Successful or failed transaction toasts should automatically disappear after 5s
  useEffect(() => {
    if (willRemoveRef.current) {
      return;
    }

    if (status === 'success') {
      willRemoveRef.current = true;
      setTimeout(handleRemove, 5000);
    }
  }, [status, handleRemove]);

  return (
    <TxToastWrapper>
      <AnimatedToastContentWrapper
        {...bind()}
        style={style}
        onClick={handleOnClick}
      >
        <TokenIcons>
          <TokenIconContainer>
            <TokenIcon
              width={12}
              height={12}
              symbolOrAddress={sellingTokenSymbol}
            />
          </TokenIconContainer>
          <TokenIconContainer isRight>
            <TokenIcon
              width={12}
              height={12}
              symbolOrAddress={buyingTokenSymbol}
            />
          </TokenIconContainer>
        </TokenIcons>
        <MessageText margin="0 15px">
          <MessageText isBold>{sellingAmount}</MessageText> {sellingTokenSymbol}{' '}
          to <MessageText isBold>{buyingTokenAmount}</MessageText>{' '}
          {buyingTokenSymbol}
        </MessageText>
        {status === 'in-progress' && (
          <TxInprogressMessage secondsRemaining={secondsRemaining} />
        )}
        {status === 'success' && <TxSuccessMessage />}
        {status === 'failed' && <TxFailedMessage />}
      </AnimatedToastContentWrapper>
      {!isRemoving && isMobile === false && (
        <CloseToastCirle onClick={handleRemove}>
          <CloseIcon />
        </CloseToastCirle>
      )}
    </TxToastWrapper>
  );
};

const HIDDEN_TOAST_POSITION = -(TOAST_WIDTH_PX + TOAST_PADDING_PX);
export const ToastMessages: FC = () => {
  const { toasts } = useToastMessages();
  const transitions = useTransition(toasts, (t) => t.id, {
    from: { transform: `translateX(${HIDDEN_TOAST_POSITION}px)` },
    enter: { transform: `translateX(0px)` },
    leave: { transform: `translateX(${HIDDEN_TOAST_POSITION}px)` },
  });

  const isMobile = useDetectMobile();

  return (
    <>
      <ToastsWrapper>
        {transitions.map(({ props, key }, idx) => (
          <TxToast
            isMobile={isMobile}
            // NOTE(johnrjj) - Need to pass the 'live' value of the toast (instead the frozen 'item' prop from react-spring) to get the latest toast 'status'
            {...toasts[idx]}
            style={props}
            key={key}
          />
        ))}
      </ToastsWrapper>
    </>
  );
};

export default ToastMessages;
