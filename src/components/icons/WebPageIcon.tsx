import React from 'react';

function WebPageIcon() {
  return (
    <svg
      width="32"
      height="31"
      viewBox="0 0 32 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)" filter="url(#filter0_d)">
        <path
          d="M27 1H5C4.73478 1 4.48043 1.10536 4.29289 1.29289C4.10536 1.48043 4 1.73478 4 2V22C4 22.2652 4.10536 22.5196 4.29289 22.7071C4.48043 22.8946 4.73478 23 5 23H27C27.2652 23 27.5196 22.8946 27.7071 22.7071C27.8946 22.5196 28 22.2652 28 22V2C28 1.73478 27.8946 1.48043 27.7071 1.29289C27.5196 1.10536 27.2652 1 27 1ZM11 3C11.1978 3 11.3911 3.05865 11.5556 3.16853C11.72 3.27841 11.8482 3.43459 11.9239 3.61732C11.9996 3.80004 12.0194 4.00111 11.9808 4.19509C11.9422 4.38907 11.847 4.56725 11.7071 4.70711C11.5673 4.84696 11.3891 4.9422 11.1951 4.98079C11.0011 5.01937 10.8 4.99957 10.6173 4.92388C10.4346 4.84819 10.2784 4.72002 10.1685 4.55557C10.0586 4.39112 10 4.19778 10 4C10 3.73478 10.1054 3.48043 10.2929 3.29289C10.4804 3.10536 10.7348 3 11 3ZM7 3C7.19778 3 7.39112 3.05865 7.55557 3.16853C7.72002 3.27841 7.84819 3.43459 7.92388 3.61732C7.99957 3.80004 8.01937 4.00111 7.98079 4.19509C7.9422 4.38907 7.84696 4.56725 7.70711 4.70711C7.56725 4.84696 7.38907 4.9422 7.19509 4.98079C7.00111 5.01937 6.80004 4.99957 6.61732 4.92388C6.43459 4.84819 6.27841 4.72002 6.16853 4.55557C6.05865 4.39112 6 4.19778 6 4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3ZM26 21H6V7H26V21Z"
          fill="#1F1F41"
        />
        <path d="M12 9H8V19H12V9Z" fill="#1F1F41" />
        <path d="M24 9H14V19H24V9Z" fill="#1F1F41" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="32"
          height="32"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="white" transform="translate(4)" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoWebPageIcon = React.memo(WebPageIcon);

export { MemoWebPageIcon as WebPageIcon };
