import React, { FC } from 'react';
import styled from 'styled-components';
interface PlaceholderProps {
  className?: string;
}

export const LoadingWalletBalance: FC<PlaceholderProps> = React.memo(
  ({ className }) => (
    <div className={className}>
      <svg
        width="131"
        height="36"
        viewBox="0 0 131 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.791992"
          y="0.597656"
          width="130"
          height="35"
          rx="8"
          fill="#F0F0F7"
        />
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="131"
          height="36"
        >
          <rect
            x="0.791992"
            y="0.597656"
            width="130"
            height="35"
            rx="8"
            fill="#F6F6F9"
          />
        </mask>
        <g mask="url(#mask0)">
          <path
            opacity="0.5"
            d="M54.4886 -12.3054H97.5938L42.857 104.274H-0.248291L54.4886 -12.3054Z"
            fill="url(#paint0_linear)"
          />
          <path
            opacity="0.5"
            d="M110.78 -12.3054H119.674L64.9375 104.274H56.0427L110.78 -12.3054Z"
            fill="url(#paint1_linear)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="48.6728"
            y1="-12.3054"
            x2="48.6728"
            y2="104.274"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="104.964"
            y1="-12.3054"
            x2="104.964"
            y2="104.274"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
);

const ResponsiveWrapper = styled.div`
  width: calc(100vw - 42px);
  max-width: 626px;
  overflow: hidden;
`;

export const LoadingMainContent: FC<PlaceholderProps> = React.memo(
  ({ className }) => (
    <ResponsiveWrapper className={className}>
      <svg
        width="628"
        height="201"
        viewBox="0 0 628 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7">
          <rect
            x="0.797363"
            y="0.597656"
            width="626.208"
            height="200"
            rx="8"
            fill="#F0F0F7"
          />
          <path
            opacity="0.5"
            d="M131.005 0.597656H194.005L114.005 200.448H51.0054L131.005 0.597656Z"
            fill="url(#paint0_linear)"
          />
          <path
            opacity="0.5"
            d="M213.277 0.597656H226.277L146.277 200.448H133.277L213.277 0.597656Z"
            fill="url(#paint1_linear)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="122.505"
            y1="0.597656"
            x2="122.505"
            y2="200.448"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="204.777"
            y1="0.597656"
            x2="204.777"
            y2="200.448"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </ResponsiveWrapper>
  ),
);

export const LoadingTradeHistory: FC<PlaceholderProps> = React.memo(
  ({ className }) => (
    <div className={className}>
      <svg
        width="324"
        height="201"
        viewBox="0 0 324 201"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.7">
          <rect
            x="0.627625"
            y="0.597656"
            width="323"
            height="200"
            rx="8"
            fill="#F0F0F7"
          />
          <path
            opacity="0.5"
            d="M130.836 0.597656H193.836L113.836 200.448H50.8356L130.836 0.597656Z"
            fill="url(#paint0_linear)"
          />
          <path
            opacity="0.5"
            d="M213.107 0.597656H226.107L146.107 200.448H133.107L213.107 0.597656Z"
            fill="url(#paint1_linear)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="122.336"
            y1="0.597656"
            x2="122.336"
            y2="200.448"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="204.607"
            y1="0.597656"
            x2="204.607"
            y2="200.448"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0.5" />
            <stop offset="0.516297" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),
);
