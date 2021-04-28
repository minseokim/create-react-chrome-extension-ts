import React from 'react';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
    >
      <g fill="#0E103C" filter="url(#filter0_i)">
        <path d="M3.443 5.309h-3l4-5 4 5h-3v8a1 1 0 01-2 0v-8zM11.443 11.309v-8a1 1 0 012 0v8h3l-4 5-4-5h3z"></path>
      </g>
      <defs>
        <filter
          id="filter0_i"
          width="16"
          height="17"
          x="0.443"
          y="0.309"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
          ></feComposite>
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"></feColorMatrix>
          <feBlend in2="shape" result="effect1_innerShadow"></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export { Icon as UpDownSwapIcon };
