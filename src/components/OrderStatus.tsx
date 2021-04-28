import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const OrderCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessIcon: FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4001 6.0001L11.0001 4.6001L7.0001 8.6001L5.0001 6.6001L3.6001 8.0001L7.0001 11.4001L12.4001 6.0001Z"
        fill="#1DD13A"
      />
    </svg>
  );
};

export const SuccessOrderStatus: FC = () => {
  return (
    <OrderCircle style={{ background: '#E8FAEB' }}>
      <SuccessIcon />
    </OrderCircle>
  );
};

const FailureIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1 4.5L8 6.6L5.9 4.5L4.5 5.9L6.6 8L4.5 10.1L5.9 11.5L8 9.4L10.1 11.5L11.5 10.1L9.4 8L11.5 5.9L10.1 4.5Z"
        fill="#FF656D"
      />
    </svg>
  );
};

export const FailureOrderStatus: FC = () => {
  return (
    <OrderCircle style={{ background: '#FFF0F0' }}>
      <FailureIcon />
    </OrderCircle>
  );
};

const CancelledIcon = styled(FailureIcon)`
  > * {
    fill: #7578b5;
  }
`;

export const CancelledOrderStatus: FC = () => {
  return (
    <OrderCircle style={{ background: '#F6F6FF' }}>
      <CancelledIcon />
    </OrderCircle>
  );
};

const LoadingIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 16C6.801 16 5.648 15.741 4.572 15.23L5.429 13.423C6.235 13.806 7.1 14 8 14C11.309 14 14 11.309 14 8C14 4.691 11.309 2 8 2C4.691 2 2 4.691 2 8C2 8.901 2.194 9.766 2.578 10.572L0.772 11.431C0.26 10.354 0 9.2 0 8C0 3.589 3.589 0 8 0C12.411 0 16 3.589 16 8C16 12.411 12.411 16 8 16Z"
        fill="#1F1F41"
      />
    </svg>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AnimatedLoadingIcon = styled(LoadingIcon)`
  animation: ${spinAnimation} 600ms linear infinite;
`;

export const LoadingOrderStatus: FC = () => {
  return (
    <OrderCircle style={{ background: '#F6F6FF' }}>
      <AnimatedLoadingIcon />
    </OrderCircle>
  );
};

const OrderText = styled.p`
  font-size: 12px;
  padding-top: 3px;
  font-weight: 600;
`;

export const TextOrderStatus: FC<{ text?: string }> = ({ text }) => {
  return (
    <OrderCircle style={{ background: '#F6F6FF' }}>
      <OrderText>{text}</OrderText>
    </OrderCircle>
  );
};
