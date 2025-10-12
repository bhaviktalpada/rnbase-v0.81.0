import React from "react";
import Svg, { Path, SvgProps, G } from "react-native-svg";

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  fill?: string;
};

const SvgDownArrow: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "#ffffff",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.50294 6C5.30703 6 5.11113 5.92502 4.96224 5.78257L0.229207 1.26148C-0.0764025 0.969072 -0.0764025 0.504217 0.229207 0.219306C0.526981 -0.0731022 1.01282 -0.0731022 1.31843 0.219306L5.50294 4.22306L9.68744 0.219306C9.98522 -0.0656045 10.4789 -0.0656045 10.7767 0.219306C11.0744 0.504217 11.0744 0.97657 10.7767 1.26148L6.05147 5.78257C5.90258 5.92502 5.70668 6 5.51077 6H5.50294Z"
        fill="#999999"
      />
    </Svg>
  );
};

export { SvgFodder };
