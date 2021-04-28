import React from 'react';

function HouseDesktopIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 16.0001C14.6 16.0001 15 15.6001 15 15.0001V6.0001C15 5.7001 14.9 5.4001 14.6 5.2001L8.6 0.200098C8.2 -0.0999023 7.7 -0.0999023 7.3 0.200098L1.3 5.2001C1.1 5.4001 1 5.7001 1 6.0001V15.0001C1 15.6001 1.4 16.0001 2 16.0001H6V11.0001H10V16.0001H14Z"
        fill="#1F1F41"
      />
      <defs></defs>
    </svg>
  );
}

const MemoHouseDesktopIcon = React.memo(HouseDesktopIcon);
export { MemoHouseDesktopIcon as HouseDesktopIcon };
