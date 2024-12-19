import React from "react";
import { IconProps } from "@/types/icons";

const CustomIcon = ({
  width = 59,
  height = 58,
  fill = "white",
  stroke = "white",
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 59 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_20_675)">
        <rect
          x="0.75"
          width="58"
          height="58"
          rx="29"
          fill={fill}
          fillOpacity="0.18"
        />
        <path
          d="M39.5189 27.3478C40.458 27.8899 40.9276 28.161 41.0852 28.5149C41.2226 28.8237 41.2226 29.1762 41.0852 29.485C40.9276 29.839 40.458 30.1101 39.5189 30.6522L24.6735 39.2231C23.7344 39.7654 23.2648 40.0366 22.8795 39.996C22.5434 39.9607 22.2381 39.7845 22.0395 39.511C21.8118 39.1976 21.8118 38.6553 21.8118 37.5709V20.429C21.8118 19.3446 21.8118 18.8024 22.0395 18.489C22.2381 18.2155 22.5434 18.0393 22.8795 18.004C23.2648 17.9635 23.7344 18.2346 24.6735 18.7768L39.5189 27.3478Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_20_675"
          x="-24.25"
          y="-25"
          width="108"
          height="108"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="12.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_20_675"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_20_675"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CustomIcon;
