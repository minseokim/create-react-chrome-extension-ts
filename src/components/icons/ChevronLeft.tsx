import React from 'react';

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M10.0001 13.4L4.6001 8.00001L10.0001 2.60001L11.4001 4.00001L7.4001 8.00001L11.4001 12L10.0001 13.4Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

function ChevronLeftExtraLargeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="25"
      viewBox="0 0 16 25"
      fill="none"
      {...props}
    >
      <path
        d="M0.477798 12.5L12.3366 0.5L15.4111 3.61111L6.62682 12.5L15.4111 21.3889L12.3366 24.5L0.477798 12.5Z"
        fill="#F6F6FF"
      />
    </svg>
  );
}

export { ChevronLeftIcon, ChevronLeftExtraLargeIcon };
