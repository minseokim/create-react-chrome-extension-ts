import React from 'react';

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.9999 13.4L11.3999 8.00001L5.9999 2.60001L4.5999 4.00001L8.5999 8.00001L4.5999 12L5.9999 13.4Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

function ChevronRightLargeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="20"
      fill="none"
      viewBox="0 0 12 20"
      {...props}
    >
      <path
        fill="#F6F6FF"
        d="M12 9.515L2.47 19.03 0 16.563l7.059-7.048L0 2.467 2.47 0 12 9.515z"
      ></path>
    </svg>
  );
}

function ChevronRightExtraLargeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="25"
      viewBox="0 0 16 25"
      fill="none"
    >
      <path
        d="M14.9333 12L3.07451 24L0 20.8889L8.78432 12L0 3.11111L3.07451 5.51012e-07L14.9333 12Z"
        fill="#E8ECFD"
      />
    </svg>
  );
}

export { ChevronRightIcon, ChevronRightLargeIcon, ChevronRightExtraLargeIcon };
