import React, { FC } from 'react';

interface PosPriceChangeArrowProps {
  className?: string;
}

const PosPriceChangeArrow: FC<PosPriceChangeArrowProps> = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <g clipPath="url(#clip1)">
        <path
          d="M12.0207 3.9499L5.36403 3.9499V5.9496H9.60667L3.53545 12.0208L4.94967 13.435L11.0209 7.36381L11.0209 11.6065L13.0206 11.6065L13.0206 4.94975C13.0205 4.68459 12.9152 4.4303 12.7277 4.2428C12.5402 4.0553 12.2859 3.94994 12.0207 3.9499Z"
          fill="#1DD13A"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
      <clipPath id="clip1">
        <rect
          x="8.48535"
          width="12"
          height="12"
          rx="6"
          transform="rotate(45 8.48535 0)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

const MemoizedPosPriceChangeArrow = React.memo(PosPriceChangeArrow);

export { MemoizedPosPriceChangeArrow as PosPriceChangeArrow };
