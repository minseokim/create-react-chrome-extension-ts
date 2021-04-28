import React from 'react';

function QrIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12.75V12H9.75V9.75H12V11.25H13.5V12.75H12.75V14.25H11.25V15.75H9.75V13.5H11.25V12.75H12ZM15.75 15.75H12.75V14.25H14.25V12.75H15.75V15.75ZM2.25 2.25H8.25V8.25H2.25V2.25ZM3.75 3.75V6.75H6.75V3.75H3.75ZM9.75 2.25H15.75V8.25H9.75V2.25ZM11.25 3.75V6.75H14.25V3.75H11.25ZM2.25 9.75H8.25V15.75H2.25V9.75ZM3.75 11.25V14.25H6.75V11.25H3.75ZM13.5 9.75H15.75V11.25H13.5V9.75ZM4.5 4.5H6V6H4.5V4.5ZM4.5 12H6V13.5H4.5V12ZM12 4.5H13.5V6H12V4.5Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const MemoQrIcon = React.memo(QrIcon);

export { MemoQrIcon as QrIcon };
