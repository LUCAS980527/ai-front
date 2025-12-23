import * as React from "react";
const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2 14 1.267-3.8A5.667 5.667 0 1 1 5.8 12.733L2 14Z"
    />
  </svg>
);
export default ChatIcon;
