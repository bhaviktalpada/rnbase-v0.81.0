import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";
import { APP } from "@/utils/constants";
import { StyleSheet } from "react-native";
const { scale } = require("react-native-size-matters");

export default styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nameLabel: {
    flex: 2,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
  },
  nameContainer: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.colorBlue,
  },
  occasionLbl: {
    fontSize: normalizeText(16),
    color: COLORS.colorOrange,
  },
  receiptNo: {
    fontSize: 15,
    color: COLORS.colorGray99,
  },
  chartTopSecContainer: { flexDirection: "row", marginBottom: 5 },
  yearContainer: { width: "44%", marginHorizontal: "2%"},
  middleView: {
    flex: 1,
    justifyContent: "center",
  },
  thisYearStyle: {
    maxWidth: "80%",
    color: COLORS.colorGray6C,
    fontSize: normalizeText(APP.DEFAULT_TEXT_INPUT_LABEL_SIZE),
    marginVertical: scale(5),
  },
  mainContainer: (colorBorder) => ({
    //flex: 1,
    height: APP.TEXT_FIELD_HEIGHT,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderColor: colorBorder,
    borderWidth: APP.BORDER_WIDTH,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    paddingHorizontal: scale(8),
    justifyContent: "center",
  }),
  currentYearStyle: { maxWidth: "95%", color: COLORS.black },
  searchViewMain: {
    backgroundColor: COLORS.white,
    height: scale(APP.TEXT_FIELD_HEIGHT),
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: COLORS.colorLightestGrayE0,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchViewSub: {
    flexDirection: "row",
    alignItems: "center",
    height: APP.TEXT_FIELD_SEARCH_HEIGHT,
    flex: 1,
  },
});
