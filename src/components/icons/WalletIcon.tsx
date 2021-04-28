import React, { FC } from 'react';

const WalletIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={props?.fill || '#1F1F41'}
      d="M14.667 0H4v2.667h10.667V0z"
    ></path>
    <path
      fill={props?.fill || '#1F1F41'}
      d="M15.333 4H2a.668.668 0 010-1.334h.667V1.333H2a2 2 0 00-2 2v10A2.667 2.667 0 002.667 16h12.666a.667.667 0 00.667-.667V4.666A.667.667 0 0015.333 4zM12 11.333a1.333 1.333 0 110-2.666 1.333 1.333 0 010 2.666z"
    ></path>
  </svg>
);

const MemoizedWalletIcon = React.memo(WalletIcon);

export { MemoizedWalletIcon as WalletIcon };
