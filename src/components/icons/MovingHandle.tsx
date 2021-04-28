import React from 'react';

function MovingHandleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="2" cy="2" r="2" fill="#1F1F41" />
      <circle cx="2" cy="8" r="2" fill="#1F1F41" />
      <circle cx="2" cy="14" r="2" fill="#1F1F41" />
    </svg>
  );
}

const MemoMovingHandleIcon = React.memo(MovingHandleIcon);

export { MemoMovingHandleIcon as MovingHandleIcon };
