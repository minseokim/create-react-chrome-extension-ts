import React from 'react';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      fill="none"
      viewBox="0 0 10 10"
      {...props}
    >
      <path
        fill={props.fill || '#0E103C'}
        fillRule="evenodd"
        d="M8.18 9.278a.75.75 0 001.065-1.056L5.81 4.755 9.278 1.32A.75.75 0 108.222.253L4.754 3.69 1.317.222A.75.75 0 10.252 1.278l3.437 3.468L.222 8.18a.75.75 0 001.056 1.066L4.744 5.81 8.18 9.278z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export { XIcon };
