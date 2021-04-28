import React from 'react';

function TinyChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="8"
      fill="none"
      viewBox="0 0 11 8"
      {...props}
    >
      <path
        fill="#7578B5"
        d="M5.4 7.4L0 2 1.4.6l4 4 4-4L10.8 2 5.4 7.4z"
      ></path>
    </svg>
  );
}

const MemoTinyChevronDownIcon = React.memo(TinyChevronDownIcon);

export { MemoTinyChevronDownIcon as TinyChevronDownIcon };
