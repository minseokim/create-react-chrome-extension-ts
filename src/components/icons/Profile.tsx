import React from 'react';

function ProfileDesktopIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10Z"
        fill="#1F1F41"
      />
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12 12.4C11.4 11.7 10.6 11 9 11H7C5.4 11 4.6 11.7 4 12.4C2.8 11.3 2 9.8 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 9.8 13.2 11.3 12 12.4Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const MemoProfileDesktopIcon = React.memo(ProfileDesktopIcon);

export { MemoProfileDesktopIcon as ProfileDesktopIcon };
