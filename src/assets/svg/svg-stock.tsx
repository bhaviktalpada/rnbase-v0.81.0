import React from "react";
import { LocalSvg } from "react-native-svg/css";

const SvgStock: React.FC<IconProps> = ({
  width = 26,
  height = 26,
  fill = "#ffffff",
  ...props
}) => {
  return (
    <LocalSvg
      asset={require("./raw/ic-stock.svg")}
      width={width}
      height={height}
      fill={fill}
    />
  );
};

export { SvgStock };
