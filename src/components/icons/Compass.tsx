import React from 'react';

function CompassDesktopIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.2 5.8L9.8 8.8C9.5 9.2 9.2 9.5 8.8 9.7L5.8 11.1C5.2 11.4 4.6 10.8 4.9 10.2L6.3 7.2C6.5 6.8 6.8 6.4 7.2 6.3L10.2 4.9C10.8 4.6 11.4 5.2 11.2 5.8Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const MemoCompassDesktopIcon = React.memo(CompassDesktopIcon);

export { MemoCompassDesktopIcon as CompassDesktopIcon };
