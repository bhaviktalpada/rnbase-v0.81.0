import React from "react";
import { LocalSvg } from "react-native-svg/css";

const SvgMonthly: React.FC<IconProps> = ({
  width = 26,
  height = 26,
  fill = "#E64C3C",
  ...props
}) => {
  return (
    <LocalSvg
      asset={require("./raw/ic-monthly.svg")}
      width={width}
      height={height}
    />
  );
};

export { SvgMonthly };
