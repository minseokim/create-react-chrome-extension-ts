import React from 'react';

function SmartPhoneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 0H6C4.346 0 3 1.346 3 3V21C3 22.654 4.346 24 6 24H18C19.654 24 21 22.654 21 21V3C21 1.346 19.654 0 18 0ZM19 20C19 20.552 18.552 21 18 21H6C5.448 21 5 20.552 5 20V4C5 3.448 5.448 3 6 3H18C18.552 3 19 3.448 19 4V20Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const MemoSmartPhoneIcon = React.memo(SmartPhoneIcon);

export { MemoSmartPhoneIcon as SmartPhoneIcon };
