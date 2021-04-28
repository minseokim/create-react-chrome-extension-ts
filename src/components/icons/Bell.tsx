import React from 'react';

function BellDesktopIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4 7.8C13.6 7.1 13 6.7 13 6V5C13 2.2 10.8 0 8 0C5.2 0 3 2.2 3 5V6C3 6.7 2.4 7.1 1.6 7.8C0.8 8.4 0 9 0 10C0 12.8 6.1 13 8 13C9.9 13 16 12.8 16 10C16 9 15.2 8.4 14.4 7.8Z"
        fill="#1F1F41"
      />
      <path
        d="M10.9 13.8999C9.79998 13.9999 8.89998 13.9999 7.99998 13.9999C7.09998 13.9999 6.19998 13.9999 5.09998 13.8999C5.49998 15.0999 6.59998 15.9999 7.99998 15.9999C9.39998 15.9999 10.5 15.0999 10.9 13.8999Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const MemoBellDesktopIcon = React.memo(BellDesktopIcon);

export { MemoBellDesktopIcon as BellDesktopIcon };
