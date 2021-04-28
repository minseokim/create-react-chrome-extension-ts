import React from 'react';

export interface WarningIconProps extends React.SVGProps<SVGSVGElement> {
  size?: 'xsmall' | 'small' | 'medium' | number;
}

const OctagonWarningIcon: React.FC<WarningIconProps> = (props) => {
  // Default size is medium 32px
  let size = props.size ?? 32;
  if (props.size === 'small') {
    size = 24;
  }
  if (props.size === 'xsmall') {
    size = 20;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="#FFB900"
        d="M31.61 8.981L23.016.391c-.25-.25-.589-.39-.942-.391H9.925c-.353 0-.692.14-.942.39L.39 8.982c-.25.25-.39.59-.391.943v12.152c0 .354.14.693.39.943l8.593 8.59c.25.25.589.39.942.391h12.15c.353 0 .692-.14.942-.39l8.592-8.591c.25-.25.39-.59.391-.943V9.924c0-.354-.14-.693-.39-.943zM18.192 6.667l-.86 12h-2.666l-.811-12h4.337zm-2.193 20a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334z"
      ></path>
    </svg>
  );
};

export { OctagonWarningIcon };
