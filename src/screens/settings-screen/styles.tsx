import { COLORS } from "@/theme";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  list: { margin: 20 },
  option: (item) => ({
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.colorC5,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor:
      item.id == 8 || item.id == 7 ? COLORS.colorRed : COLORS.transparent,
    flexDirection: "row",
    alignItems: "center",
  }),
  optionText: (item) => ({
    fontSize: 16,
    color: item.id == 8 || item.id == 7 ? COLORS.white : COLORS.black,
  }),
  selectedOptionText: {
    color: COLORS.caribbeanGreen,
    fontWeight: "bold",
  },
  selectedOption: {
    backgroundColor: COLORS.colorLightGreen,
    borderColor: COLORS.colorGreen,
  },
  version_container: {
    width: "100%",
    backgroundColor: null,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(5),
  },
  sideImageContainer: (item) => ({
    padding: scale(3),
    //backgroundColor: item.id == 7 || item.id == 8 ? COLORS.transparent : COLORS.colorYellowCC,
    borderRadius: scale(10),
    marginRight: scale(10),
  }),
});
