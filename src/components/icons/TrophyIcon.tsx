import React, { FC } from 'react';

const TrophyIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="24"
    fill="none"
    viewBox="0 0 22 24"
    {...props}
  >
    <path
      fill={props?.fill || '#1F1F41'}
      d="M21 0H1a1 1 0 00-1 1v5a4 4 0 004 4h.08A7 7 0 0010 15.92V19h2v-3.08A7 7 0 0017.92 10H18a4 4 0 004-4V1a1 1 0 00-1-1zM2 6V2h2v6a2 2 0 01-2-2zm18 0a2 2 0 01-2 2V2h2v4zM13 20H9c-5 0-5 4-5 4h14s0-4-5-4z"
    ></path>
  </svg>
);

const MemoizedTrophyIcon = React.memo(TrophyIcon);

export { MemoizedTrophyIcon as TrophyIcon };
