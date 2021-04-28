import React, { FC } from 'react';

interface ZeroPriceChangeArrowProps {
  className?: string;
}

const ZeroPriceChangeArrow: FC<ZeroPriceChangeArrowProps> = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M13.7072 8.707L9.00021 13.414L7.58621 12L10.5862 9L2.00021 9L2.00021 7L10.5862 7L7.58621 4L9.00021 2.586L13.7072 7.293C13.8947 7.48053 14 7.73484 14 8C14 8.26517 13.8947 8.51947 13.7072 8.707Z"
        fill="#7578B5"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="12"
          height="12"
          rx="6"
          transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 14 14)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

const MemoizedZeroPriceChangeArrow = React.memo(ZeroPriceChangeArrow);

export { MemoizedZeroPriceChangeArrow as ZeroPriceChangeArrow };
