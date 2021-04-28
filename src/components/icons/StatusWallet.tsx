import React, { FC } from 'react';

interface StatusWalletIconProps {
  className?: string;
}

const StatusWalletIcon: FC<StatusWalletIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="27"
    fill="none"
    viewBox="0 0 25 27"
    className={className}
  >
    <path
      fill="#3A38EC"
      d="M19.021 15.234c.438.588.25 1.002.18 1.4-1.273 6.806-7.996 11.358-14.408 10.086-2.88-.57-4.546-2.452-4.765-5.365-.242-3.212 1.068-5.06 3.98-6.087 1.73-.609 3.515-.66 5.305-.558 3.285.19 6.534.998 9.708.524zM5.782 11.87C6.1 5.595 11.384.35 17.41.027c.99-.055 1.981-.047 2.96.19 2.923.71 4.514 2.672 4.625 5.724.107 2.93-1.183 4.909-3.959 5.91-1.52.55-3.098.732-4.69.647-3.483-.177-5.67-1.045-10.563-.63z"
    ></path>
  </svg>
);

const MemoizedStatusWalletIcon = React.memo(StatusWalletIcon);

export { MemoizedStatusWalletIcon as StatusWalletIcon };
