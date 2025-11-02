import { scale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";

export default styles = StyleSheet.create({
  plusButtonTouch: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    justifyContent: "center",
  },
  addGroundImage: {
    height: 40,
    width: 40,
  },
  addGroundText: {
    fontSize: normalizeText(11),
    color: COLORS.primary,
  },
  addGroundView: { flex: 1, marginLeft: 5 },
  expandButton: (bottomSpace, btnWidth) => ({
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
    position: "absolute",
    bottom: bottomSpace,
    right: 30,
    borderRadius: 25,
    width: btnWidth,
    height: 50,
  }),
  expandHorizontalView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(15),
    marginVertical: scale(15),
  },
});
