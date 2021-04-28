import React from 'react';

function ImTokenWalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 400 400"
    >
      <path
        fill="url(#paint0_linear)"
        d="M374.062 87.218c11.415 153.814-87.975 226.514-177.075 234.267-82.836 7.207-160.81-43.428-167.65-121.225-5.643-64.274 34.289-91.637 65.663-94.364 32.269-2.814 59.386 19.323 61.738 46.126 2.266 25.77-13.898 37.499-25.14 38.476-8.89.775-20.074-4.595-21.084-16.123-.866-9.906 2.915-11.255 1.991-21.778-1.645-18.735-18.068-20.917-27.059-20.142-10.881.947-30.623 13.581-27.852 45.05 2.785 31.742 33.38 56.822 73.485 53.334 43.28-3.762 73.413-37.284 75.679-84.301a16.994 16.994 0 011.544-7.221l.014-.057a20.229 20.229 0 011.631-2.829c.924-1.378 2.107-2.9 3.637-4.565.014-.043.014-.043.043-.043 1.111-1.249 2.453-2.598 3.969-4.048 18.905-17.745 86.993-59.594 151.386-46.343a6.454 6.454 0 013.506 2.053 6.398 6.398 0 011.574 3.733"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="365.283"
          x2="142.783"
          y1="85.685"
          y2="402.274"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#11C4D1"></stop>
          <stop offset="1" stopColor="#0062AD"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

const ImTokenWalletIconMemo = React.memo(ImTokenWalletIcon);

export { ImTokenWalletIconMemo as ImTokenWalletIcon };
