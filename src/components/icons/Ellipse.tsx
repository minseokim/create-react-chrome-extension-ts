import React from 'react';

function EllipseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="5"
      fill="none"
      viewBox="0 0 23 5"
    >
      <path
        fill="#7578B5"
        d="M11.062 4.596a2 2 0 100-4 2 2 0 000 4zM2.062 4.596a2 2 0 100-4 2 2 0 000 4zM20.062 4.596a2 2 0 100-4 2 2 0 000 4z"
      ></path>
    </svg>
  );
}

const MemoEllipseIcon = React.memo(EllipseIcon);

export { MemoEllipseIcon as EllipseIcon };
