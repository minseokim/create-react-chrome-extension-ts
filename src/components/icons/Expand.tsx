import React from 'react';

function ExpandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z"
        fill="#1F1F41"
      />
      <path
        d="M10.5 7.5C11.3284 7.5 12 6.82843 12 6C12 5.17157 11.3284 4.5 10.5 4.5C9.67157 4.5 9 5.17157 9 6C9 6.82843 9.67157 7.5 10.5 7.5Z"
        fill="#1F1F41"
      />
      <path
        d="M1.5 7.5C2.32843 7.5 3 6.82843 3 6C3 5.17157 2.32843 4.5 1.5 4.5C0.671573 4.5 0 5.17157 0 6C0 6.82843 0.671573 7.5 1.5 7.5Z"
        fill="#1F1F41"
      />
    </svg>
  );
}

const ExpandIconMemo = React.memo(ExpandIcon);

export { ExpandIconMemo as ExpandIcon };
