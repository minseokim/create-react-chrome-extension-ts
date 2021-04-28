import React, { FC } from 'react';

type GasPriceIconProps = React.SVGProps<SVGSVGElement>;

const GreenGasPriceIcon: FC<GasPriceIconProps> = ({ ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i)">
        <rect width="16" height="16" rx="8" fill="url(#paint0_linear)" />
        <rect
          x="0.2"
          y="0.2"
          width="15.6"
          height="15.6"
          rx="7.8"
          stroke="#0EBE2B"
          strokeWidth="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0683333 0 0 0 0 0.683333 0 0 0 0 0.167417 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="8"
          y1="0"
          x2="8"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#16C533" />
          <stop offset="1" stopColor="#1EE73F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const YellowGasPriceIcon: FC<GasPriceIconProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i)">
        <rect width="16" height="16" rx="8" fill="url(#paint0_linear)" />
        <rect
          x="0.2"
          y="0.2"
          width="15.6"
          height="15.6"
          rx="7.8"
          stroke="#FFEB35"
          strokeWidth="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.921569 0 0 0 0 0.207843 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="8"
          y1="0"
          x2="8"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4BC2E" />
          <stop offset="1" stopColor="#E3E71E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const RedGasPriceIcon: FC<GasPriceIconProps> = ({ ...props }) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i)">
        <rect width="16" height="16" rx="8" fill="url(#paint0_linear)" />
        <rect
          x="0.2"
          y="0.2"
          width="15.6"
          height="15.6"
          rx="7.8"
          stroke="#FF5935"
          strokeWidth="0.4"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="16"
          height="16"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.34902 0 0 0 0 0.207843 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="8"
          y1="0"
          x2="8"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E1582C" />
          <stop offset="1" stopColor="#E7361E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const GreenGasPriceIconMemo = React.memo(GreenGasPriceIcon);
const RedGasPriceIconMemo = React.memo(RedGasPriceIcon);
const YellowGasPriceIconMemo = React.memo(YellowGasPriceIcon);

export {
  GreenGasPriceIconMemo as GreenGasPriceIcon,
  RedGasPriceIconMemo as RedGasPriceIcon,
  YellowGasPriceIconMemo as YellowGasPriceIcon,
};
