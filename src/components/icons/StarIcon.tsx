import { IconProps } from "@/types/icons";
import React from "react";

const StarIcon= ({
  width = 30,
  height = 30,
  fill = "#E8BC38",
  className = "",
}:IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.0002 1.8335L13.8327 7.57183L20.1668 8.49766L15.5835 12.9618L16.6652 19.2685L11.0002 16.2893L5.33516 19.2685L6.41683 12.9618L1.8335 8.49766L8.16766 7.57183L11.0002 1.8335Z"
        fill={fill}
      />
    </svg>
  );
};

export default StarIcon;
