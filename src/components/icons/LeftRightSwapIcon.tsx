import React from 'react';

function LeftRightSwapBigIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#706EFF"
        d="M6.25 16.25V20L0 15l6.25-5v3.75h10a1.25 1.25 0 010 2.5h-10zM13.75 6.25h-10a1.25 1.25 0 010-2.5h10V0L20 5l-6.25 5V6.25z"
      ></path>
    </svg>
  );
}

function LeftRightSwapSmallIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="11"
      fill="none"
      viewBox="0 0 10 11"
      {...props}
    >
      <path
        fill="#706EFF"
        d="M3.125 8.58v1.875L0 7.955l3.125-2.5V7.33h5a.625.625 0 010 1.25h-5zM6.875 3.58h-5a.625.625 0 010-1.25h5V.455L10 2.955l-3.125 2.5V3.58z"
      ></path>
    </svg>
  );
}

const LeftRightSwapBigIconMemo = React.memo(LeftRightSwapBigIcon);
const LeftRightSwapSmallIconMemo = React.memo(LeftRightSwapSmallIcon);

export {
  LeftRightSwapBigIconMemo as LeftRightSwapBigIcon,
  LeftRightSwapSmallIconMemo as LeftRightSwapSmallIcon,
};
