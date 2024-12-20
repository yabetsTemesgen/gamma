import React from 'react';
import { IconProps } from "@/types/icons";

const SvgIcon = ({
  width = 66,
  height = 74,
  fill = "white",
  stroke = "white",
  className = "",
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 66 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M59.2436 31.5928C62.3172 33.3668 63.8539 34.2542 64.3698 35.4125C64.8194 36.4232 64.8194 37.5767 64.3698 38.5874C63.8539 39.7457 62.3172 40.6331 59.2436 42.4071L10.6588 70.4575C7.58531 72.2323 6.04862 73.1197 4.7876 72.987C3.68767 72.8715 2.68843 72.2947 2.03837 71.3995C1.29309 70.374 1.29309 68.5992 1.29309 65.0503V8.9494C1.29309 5.40049 1.29309 3.626 2.03837 2.60021C2.68843 1.70539 3.68767 1.12854 4.7876 1.01295C6.04862 0.880428 7.58531 1.76768 10.6588 3.54209L59.2436 31.5928Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgIcon;
