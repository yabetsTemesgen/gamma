import React from 'react';
import { IconProps } from '@/types/icons';

const BackIcon = ({
  width = 50,
  height = 50,
  fill = "black",
  stroke = "white",
}:IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_2_2570)">
        <rect
          width="38"
          height="38"
          rx="19"
          fill={fill}
          fillOpacity="0.08"
        />
        <path
          d="M21.675 13.65L16.3294 18.9891C16.3235 18.9951 16.3235 19.0049 16.3294 19.0108L21.675 24.35"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_2_2570"
          x="-25"
          y="-25"
          width="88"
          height="88"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur
            in="BackgroundImageFix"
            stdDeviation="12.5"
          />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2_2570"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2_2570"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default BackIcon;
