import React, { FC } from 'react';

interface NegPriceChangeArrowProps {
  className?: string;
}

const NegPriceChangeArrow: FC<NegPriceChangeArrowProps> = () => (
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
          d="M12.0207 13.0501L5.36403 13.0501V11.0504H9.60667L3.53545 4.97918L4.94967 3.56497L11.0209 9.63619L11.0209 5.39355L13.0206 5.39355L13.0206 12.0502C13.0205 12.3154 12.9152 12.5697 12.7277 12.7572C12.5402 12.9447 12.2859 13.0501 12.0207 13.0501Z"
          fill="#FF656D"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
      <clipPath id="clip1">
        <rect
          width="12"
          height="12"
          rx="6"
          transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 8.48535 17)"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
);

const MemoizedNegPriceChangeArrow = React.memo(NegPriceChangeArrow);

export { MemoizedNegPriceChangeArrow as NegPriceChangeArrow };
