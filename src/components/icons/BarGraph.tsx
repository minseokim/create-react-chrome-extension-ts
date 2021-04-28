import React from 'react';

function BarGraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="13"
      fill="none"
      viewBox="0 0 15 13"
      {...props}
    >
      <path
        fill="#706EFF"
        d="M4.389 13h1.788c.179 0 .326-.144.326-.326V7.639a.328.328 0 00-.326-.327H4.389a.326.326 0 00-.327.327v5.038c0 .179.144.323.327.323zM8.452 13h1.788c.179 0 .326-.144.326-.326V.326a.33.33 0 00-.33-.326H8.448a.326.326 0 00-.326.326v12.35c.003.18.147.324.33.324zM12.514 13h1.788c.179 0 .326-.144.326-.326V5.2a.328.328 0 00-.326-.326h-1.788a.326.326 0 00-.326.326v7.476c0 .179.143.323.326.323zM.326 13h1.788c.18 0 .327-.144.327-.326V3.576a.328.328 0 00-.327-.326H.326A.326.326 0 000 3.576v9.101c0 .18.144.323.326.323z"
      ></path>
    </svg>
  );
}

const BarGraphIconMemo = React.memo(BarGraphIcon);

export { BarGraphIconMemo as BarGraphIcon };
