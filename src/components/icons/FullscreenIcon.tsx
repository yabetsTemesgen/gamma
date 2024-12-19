import { IconProps } from "@/types/icons";
import React from "react";

const CustomIcon = ({
  fill = "#ffffff",
  stroke = "#ffffff",
  width = 25,
  height = 25,
  className = "",
}: IconProps) => {
  return (
    <svg
      fill={fill}
      stroke={stroke}
      viewBox="0 -0.08 20 20"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <path d="M14.93,9.36a.38.38,0,0,0-.37.38V13a.76.76,0,0,1-.75.75H6.19A.76.76,0,0,1,5.44,13V6.89a.75.75,0,0,1,.75-.74h3.94a.38.38,0,0,0,.38-.38.37.37,0,0,0-.38-.37H6.19a1.5,1.5,0,0,0-1.5,1.49V13a1.51,1.51,0,0,0,1.5,1.5h7.62a1.51,1.51,0,0,0,1.5-1.5V9.74A.38.38,0,0,0,14.93,9.36Z"></path>
      <path d="M12.06,6.18H14L9.61,9.81a.38.38,0,0,0,.24.67.38.38,0,0,0,.24-.09l4.45-3.7,0,1.56a.38.38,0,0,0,.37.37h0a.38.38,0,0,0,.38-.38l0-2.42a.37.37,0,0,0-.37-.37l-2.85,0h0a.38.38,0,0,0,0,.75Z"></path>
    </svg>
  );
};

export default CustomIcon;
