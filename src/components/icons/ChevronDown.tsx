import React from 'react';

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="7"
      fill="none"
      viewBox="0 0 11 7"
      {...props}
    >
      <path
        fill="#0A1A5D"
        d="M5.4 6.9L0 1.5 1.4.1l4 4 4-4 1.4 1.4-5.4 5.4z"
      ></path>
    </svg>
  );
}

export { ChevronDownIcon };
