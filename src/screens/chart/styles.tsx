import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";
import { APP } from "@/utils/constants";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

export default styles = StyleSheet.create({
  thisYearStyle: {
    maxWidth: "80%",
    color: COLORS.colorGray6C,
    fontSize: normalizeText(APP.DEFAULT_TEXT_INPUT_LABEL_SIZE),
    marginVertical: scale(5),
  },
  currentYearStyle: { maxWidth: "95%", color: COLORS.black },
  middleView: {
    flex: 1,
    paddingHorizontal: scale(8),
    justifyContent: "center",
  },
  mainContainer: (bgcolor, colorBorder) => ({
    flex: 1,
    height: APP.TEXT_FIELD_HEIGHT,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderColor: colorBorder,
    borderWidth: APP.BORDER_WIDTH,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    paddingHorizontal: scale(8),
    justifyContent: "center",
  }),
  chartTopSecContainer: { flexDirection: "row", marginBottom:5 },
  yearContainer: { width: "48%", marginHorizontal: "2%" },
});
