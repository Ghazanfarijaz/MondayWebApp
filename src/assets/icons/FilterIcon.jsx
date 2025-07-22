import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 11H17V13H7V11ZM4 7H20V9H4V7ZM10 15H14V17H10V15Z"
      fill="currentColor"
    />
  </svg>
);
export default SVGComponent;
