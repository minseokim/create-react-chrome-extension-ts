import React, { FC } from 'react';

const ChristmasTreeIcon: FC<{
  props?: React.SVGProps<SVGSVGElement>;
}> = ({ props }) => (
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
      d="M16 22h-4v-2h10l-5.25-7h3.17L11 .258 2.08 13h3.17L0 20h10v2H6a1 1 0 000 2h10a1 1 0 000-2z"
    ></path>
  </svg>
);

const MemoizedChristmasTreeIcon = React.memo(ChristmasTreeIcon);

export { MemoizedChristmasTreeIcon as ChristmasTreeIcon };
