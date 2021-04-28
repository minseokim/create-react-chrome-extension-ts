import React from 'react';

function HitEnterShortcutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      fill="none"
      viewBox="0 0 11 11"
    >
      <g clipPath="url(#clip1)">
        <path
          fill="#fff"
          d="M4.955 7.216h5a.833.833 0 00.833-.834v-5H9.121V5.55H4.955v-2.5L.788 6.382l4.167 3.334v-2.5z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip1">
          <path
            fill="#fff"
            d="M10.788 10.549H20.788V20.549H10.788z"
            transform="rotate(-180 10.788 10.55)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export { HitEnterShortcutIcon };
