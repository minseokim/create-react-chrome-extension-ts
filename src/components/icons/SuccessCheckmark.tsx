import React from 'react';

function SuccessCheckmark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="25"
      fill="none"
      viewBox="0 0 33 25"
    >
      <path
        fill="#2EDDBF"
        d="M12.13 13.68l-8-4.8-3.2 3.2 11.2 12.8 20.8-20.8-3.2-3.2-17.6 12.8z"
      ></path>
    </svg>
  );
}

const SuccessCheckmarkMemo = React.memo(SuccessCheckmark);

export { SuccessCheckmarkMemo as SuccessCheckmark };
