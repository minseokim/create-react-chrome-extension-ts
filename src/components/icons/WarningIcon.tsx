import React from 'react';

function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#FCD643" fill-opacity="0.2" />
      <path d="M13.5 5H10.5L11 14H13L13.5 5Z" fill="#FFB800" />
      <path
        d="M12 19C12.8284 19 13.5 18.3284 13.5 17.5C13.5 16.6716 12.8284 16 12 16C11.1716 16 10.5 16.6716 10.5 17.5C10.5 18.3284 11.1716 19 12 19Z"
        fill="#FFB800"
      />
    </svg>
  );
}

const WarningIconMemo = React.memo(WarningIcon);

export { WarningIconMemo as WarningIcon };
