import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";
import { APP } from "@/utils/constants";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";


export default styles = StyleSheet.create({
  middleView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "top",
  },
  thisYearStyle: {
    maxWidth: "80%",
    color: COLORS.colorGray6C,
    fontSize: normalizeText(APP.DEFAULT_TEXT_INPUT_LABEL_SIZE),
    marginVertical: scale(5),
  },
  chartTopSecContainer: { flexDirection: "row", marginBottom: 5 },
  
  yearContainer: { width: "48%", marginHorizontal: "2%", alignSelf: "top" },
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
  section: (active) => ({
    backgroundColor: active ? COLORS.white : COLORS.colorC5,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  }),
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.colorLightBlack,
  },
  capsuleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },
  capsule: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    margin: 4,
    minWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  greenCapsule: {
    backgroundColor: COLORS.colorGreen,
  },
  redCapsule: {
    backgroundColor: COLORS.colorRed,
  },
  capsuleText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.colorBlue,
  },
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
