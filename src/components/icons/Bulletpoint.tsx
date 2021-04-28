import React from 'react';

function BulletpointIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12.6611" r="12" fill="#E8ECFD" />
      <path
        d="M16.3996 10.6612L14.9996 9.26123L10.9996 13.2612L8.99961 11.2612L7.59961 12.6612L10.9996 16.0612L16.3996 10.6612Z"
        fill="#706EFF"
      />
    </svg>
  );
}

export { BulletpointIcon };
