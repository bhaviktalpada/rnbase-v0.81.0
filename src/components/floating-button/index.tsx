import React, { useMemo } from "react";
import { StyleSheet } from "react-native";

import { SPACING } from "../../utils/global-styles";

import ImgSVG from "@/utils/image-svg";
import { SVGFile } from "@/utils/images-path";
import PressableWrapper from "../pressable-wrapper";
import { COLORS } from "@/theme";

const FloatingButton = ({ onPress, extraStyles }) => {
  // const COLORS = useTheme().colors;
  //const styles = useMemo(() => myStyles(COLORS), [COLORS]);
  return (
    <PressableWrapper
      customStyle={{ ...styles.button, ...extraStyles }}
      onPress={onPress}
    >
      <ImgSVG
        src={SVGFile.svgPlus}
        size={SPACING.customSpace(24)}
        fill={COLORS.white}
      />
    </PressableWrapper>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: SPACING.customSpace(50),
    height: SPACING.customSpace(50),
    position: "absolute",
    bottom: SPACING.customSpace(30),
    right: SPACING.customSpace(15),
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.customSpace(30),
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
