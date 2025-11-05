import React from "react";
import { LocalSvg } from "react-native-svg/css";

const SvgLocal: React.FC<IconProps> = ({
  src,
  width = 24,
  height = 24,
  fill = "#111111",
  ...props
}) => {
  return (
    <LocalSvg
      asset={src}
      width={width}
      height={height}
    />
  );
};

export { SvgLocal };
