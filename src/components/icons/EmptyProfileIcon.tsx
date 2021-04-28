import React, { FC } from 'react';

const EmptyProfileIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    fill="none"
    viewBox="0 0 80 80"
    {...props}
  >
    <circle cx="40" cy="40" r="40" fill="#fff"></circle>
    <path fill="#BDC5E8" d="M40 45a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"></path>
    <path
      fill="#BDC5E8"
      d="M40 20c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm10 31c-1.5-1.75-3.5-3.5-7.5-3.5h-5c-4 0-6 1.75-7.5 3.5-3-2.75-5-6.5-5-11 0-8.25 6.75-15 15-15s15 6.75 15 15c0 4.5-2 8.25-5 11z"
    ></path>
  </svg>
);

const MemoizedEmptyProfileIcon = React.memo(EmptyProfileIcon);

export { MemoizedEmptyProfileIcon as EmptyProfileIcon };
