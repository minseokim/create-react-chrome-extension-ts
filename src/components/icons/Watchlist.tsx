import React, { FC } from 'react';

const WatchlistCheckmarkIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.4001 6.0001L11.0001 4.6001L7.0001 8.6001L5.0001 6.6001L3.6001 8.0001L7.0001 11.4001L12.4001 6.0001Z"
      fill="#7578B5"
    />
  </svg>
);

const MemoizedWatchlistCheckmarkIcon = React.memo(WatchlistCheckmarkIcon);

const WatchlistAddIcon: FC<{ props?: React.SVGProps<SVGSVGElement> }> = ({
  props,
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9 4H7V7H4V9H7V12H9V9H12V7H9V4Z" fill="#7578B5" />
  </svg>
);

const MemoizedWatchlistAddIcon = React.memo(WatchlistAddIcon);

export {
  MemoizedWatchlistAddIcon as WatchlistAddIcon,
  MemoizedWatchlistCheckmarkIcon as WatchlistCheckmarkIcon,
};
