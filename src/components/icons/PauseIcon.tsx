import { IconProps } from "@/types/icons";
import React from "react";

const PauseIcon = ({
  width = 25,
  height = 25,
  fill = "white",
  stroke = "white",
  className = "",
}: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      stroke={stroke}
      width={width}
      height={height}
      className={className}
    >
      <path
        d="M8 5V19M16 5V19"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default PauseIcon;
