import React from 'react';

function PreferencesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#000"
        d="M15 3h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zM5 1c-1.3 0-2.4.9-2.8 2H1c-.6 0-1 .4-1 1s.4 1 1 1h1.2C2.6 6.1 3.7 7 5 7c1.7 0 3-1.3 3-3S6.7 1 5 1zM1 13h4c.6 0 1-.4 1-1s-.4-1-1-1H1c-.6 0-1 .4-1 1s.4 1 1 1zM15 11h-1.2c-.4-1.2-1.5-2-2.8-2-1.7 0-3 1.3-3 3s1.3 3 3 3c1.3 0 2.4-.9 2.8-2H15c.6 0 1-.4 1-1s-.4-1-1-1z"
      ></path>
    </svg>
  );
}

const PreferencesIconMemo = React.memo(PreferencesIcon);

export { PreferencesIconMemo as PreferencesIcon };
