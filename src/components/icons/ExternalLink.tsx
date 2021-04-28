import React from 'react';

/**
 * @deprecated Prefer ExternalLinkIconNew
 */
function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      fill="none"
      viewBox="0 0 13 12"
      {...props}
    >
      <path
        fill="#706EFF"
        d="M6.925 0v1.5h3.44l-3.97 3.97 1.06 1.06 3.97-3.97V6h1.5V.75a.75.75 0 00-.75-.75h-5.25z"
      ></path>
      <path
        fill="#706EFF"
        d="M12.925 12H1.675a.75.75 0 01-.75-.75V0h1.5v10.5h10.5V12z"
      ></path>
    </svg>
  );
}

function ExternalLinkIconNew(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="12"
      fill="none"
      viewBox="0 0 13 12"
      {...props}
    >
      <g fill="#7578B5" clipPath="url(#clip0)">
        <path d="M5.272 0l2.763 2.793L3.874 7l1.398 1.414 4.161-4.207L12.196 7V0H5.272z"></path>
        <path d="M2.305 0H.327v10c0 .53.208 1.04.58 1.414.37.375.873.586 1.398.586h9.89v-2h-9.89V0z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path
            fill="#fff"
            d="M0 0H11.869V12H0z"
            transform="translate(.327)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}

const ExternalLinkIconMemo = React.memo(ExternalLinkIcon);
const ExternalLinkIconNewMemo = React.memo(ExternalLinkIconNew);

export {
  ExternalLinkIconMemo as ExternalLinkIcon,
  ExternalLinkIconNewMemo as ExternalLinkIconNew,
};
