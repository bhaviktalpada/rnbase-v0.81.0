import React from "react";
import { LocalSvg } from "react-native-svg/css";

const SvgCemetery: React.FC<IconProps> = ({
  width = 26,
  height = 26,
  fill = "#E64C3C",
  ...props
}) => {
  return (
    <LocalSvg
      asset={require("./raw/ic-cemetery.svg")}
      width={width}
      height={height}
    />
  );
};

export { SvgCemetery };
