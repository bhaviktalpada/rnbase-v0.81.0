import React from "react";
import Svg, { Path, SvgProps, G } from "react-native-svg";

type IconProps = SvgProps & {
  width?: number;
  height?: number;
  fill?: string;
};

const SvgUnfillCheckbox: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "#ffffff",
  ...props
}) => {
  return (
    <Svg width={width}
      height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="0.75" width="20.5" height="20.5" rx="2.25" stroke="#E0E0E0" stroke-width="1.5"/>
</Svg>
  );
};

export { SvgUnfillCheckbox };
