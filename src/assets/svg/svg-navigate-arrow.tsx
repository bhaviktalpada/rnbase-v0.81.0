import React from "react";
import { SvgXml } from "react-native-svg";

const xml = `
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13" cy="13" r="12.5" fill="white" stroke="#E0E0E0"/>
<path d="M16 13.4971C16 13.693 15.925 13.8889 15.7826 14.0378L11.2615 18.7708C10.9691 19.0764 10.5042 19.0764 10.2193 18.7708C9.9269 18.473 9.9269 17.9872 10.2193 17.6816L14.2231 13.4971L10.2193 9.31256C9.9344 9.01478 9.9344 8.5211 10.2193 8.22333C10.5042 7.92556 10.9766 7.92556 11.2615 8.22333L15.7826 12.9485C15.925 13.0974 16 13.2933 16 13.4892V13.4971Z" fill="#999999"/>
</svg>
`;

const SvgNavigateArrow: React.FC<IconProps> = ({
  width = 26,
  height = 26,
  fill = "#ffffff",
  ...props
}) => {
  return <SvgXml xml={xml} width={width} height={height} fill={fill} />;
};

export { SvgNavigateArrow };
