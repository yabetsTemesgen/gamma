import React from "react";
import { IconProps } from "@/types/icons";

const CloseIcon = ({
  height = 24,
  width = 24,
  stroke = "currentColor",
  className = "",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      stroke={stroke}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default CloseIcon;
