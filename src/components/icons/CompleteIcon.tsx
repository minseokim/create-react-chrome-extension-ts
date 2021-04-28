import React, { FC } from 'react';

const CompleteIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#1DD13A"
      d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
    ></path>
  </svg>
);

const MemoizedCompleteIcon = React.memo(CompleteIcon);

export { MemoizedCompleteIcon as CompleteIcon };
