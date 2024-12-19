import { IconProps } from "@/types/icons";
import React from "react";

const PlayIcon = ({
  width = 30,
  height = 30,
  fill = "#090909",
  stroke = "#090909",
  className = "",
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.3 11.3072C16.6938 11.5345 16.8907 11.6482 16.9568 11.7966C17.0144 11.9261 17.0144 12.0739 16.9568 12.2034C16.8907 12.3518 16.6938 12.4655 16.3 12.6928L10.075 16.2868C9.6812 16.5142 9.48431 16.6279 9.32274 16.6109C9.18181 16.5961 9.05378 16.5222 8.97049 16.4075C8.875 16.2761 8.875 16.0487 8.875 15.594V8.40598C8.875 7.95127 8.875 7.72391 8.97049 7.59248C9.05378 7.47783 9.18181 7.40392 9.32274 7.38911C9.48431 7.37213 9.6812 7.48581 10.075 7.71316L16.3 11.3072Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayIcon;
