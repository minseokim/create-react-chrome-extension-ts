import React from 'react';

const CheckmarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          fill="#fff"
          d="M10.725 1.725L3.75 8.7 1.275 6.225c-.3-.3-.75-.3-1.05 0-.3.3-.3.75 0 1.05l3 3c.15.15.3.225.525.225a.68.68 0 00.525-.225l7.5-7.5c.3-.3.3-.75 0-1.05-.3-.3-.75-.3-1.05 0z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H12V12H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

const ChubbyCheckmarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.8 1.4L7.4 0L3.4 4L1.4 2L0 3.4L3.4 6.8L8.8 1.4Z"
        fill="white"
      />
    </svg>
  );
};

const CheckmarkIconMemo = React.memo(CheckmarkIcon);
const ChubbyCheckmarkIconMemo = React.memo(ChubbyCheckmarkIcon);

export {
  CheckmarkIconMemo as CheckmarkIcon,
  ChubbyCheckmarkIconMemo as ChubbyCheckmarkIcon,
};
