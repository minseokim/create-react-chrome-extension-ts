import React, { FC } from 'react';

interface ChatBubbleProps {
  className?: string;
}
export const ChatBubble: FC<ChatBubbleProps> = ({ className }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8.59766 0.741211C4.19766 0.741211 0.597656 3.84121 0.597656 7.74121C0.597656 11.6412 4.19766 14.7412 8.59766 14.7412C8.99766 14.7412 9.39766 14.7412 9.69766 14.6412L14.5977 16.7412V12.3412C15.7977 11.1412 16.5977 9.54121 16.5977 7.74121C16.5977 3.84121 12.9977 0.741211 8.59766 0.741211Z"
      fill="#9290FF"
    />
  </svg>
);
