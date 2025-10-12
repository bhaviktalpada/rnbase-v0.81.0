import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { normalizeText } from "./text-normalize";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/typography";

const modalHeight = 320;

export default styles = StyleSheet.create({
  countryPickerStyle: (keyboardHeight) => ({
    modal: {
      height:
        Platform.OS === "ios" ? keyboardHeight + modalHeight : modalHeight,
    },
    countryButtonStyles: {
      height: 60,
    },
    textInput: {
      color: COLORS.black,
      fontSize: normalizeText(12),
    },
    countryName: {
      color: COLORS.red,
    },
    dialCode: {
      fontSize: normalizeText(11),
    },
    countryName: { color: COLORS.black, fontSize: normalizeText(11) },
    countryMessageContainer: {
      height: modalHeight - 100,
    },
  }),
  tagContainerStyle: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  tagItemStyle: (selected, width) => ({
    borderWidth: 1,
    backgroundColor: selected ? COLORS.tagSelectedBg : COLORS.white,
    borderColor: selected ? COLORS.caribbeanGreen : COLORS.textFieldBorderColor,
    borderRadius: 5,
    paddingVertical: 8,
    marginRight: 5,
    marginVertical: 10,
    overflow: "hidden",
    width: width,
  }),
  tagLabelStyle: (selected) => ({
    fontFamily: FONTS.Medium,
    fontSize: normalizeText(10),
    textAlign: "center",
    color: selected ? COLORS.white : COLORS.colorA6,
  }),
  headingLabelStyle: {
    fontSize: normalizeText(15),
    marginTop: scale(10),
    marginBottom: scale(8),
  },
  globalShadowRoundedCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,
  },
});
