import React from 'react';

function SelectDropdownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="12"
      fill="none"
      viewBox="0 0 8 12"
      {...props}
    >
      <path fill="#1F1F41" d="M8 8H0l4 4 4-4zM8 4L4 0 0 4h8z"></path>
    </svg>
  );
}

const MemoSelectDropdownIcon = React.memo(SelectDropdownIcon);

export { MemoSelectDropdownIcon as SelectDropdownIcon };
