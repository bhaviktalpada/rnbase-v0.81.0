import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";
import { Platform, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";


export const styles = StyleSheet.create({

  innerContainer: {
    
    padding: scale(20),
    justifyContent: "center",
  },
  logoContainer: {
    marginVertical: scale(40),
  },
  orContent: {
    marginBottom: scale(10),
  },
  imgContainerStyle: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  footerComponent: {
    marginTop: scale(50),
  },
  version_container: {
    width: "100%",
    backgroundColor: null,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: scale(5),
  },
  version_view_style: {
    padding: 5,
    borderColor: COLORS.colorOrange,
    //borderWidth: 1,
    borderRadius: 5,
    fontSize: normalizeText(12),
  },
  flexRowContainer: {
    marginTop: scale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: Platform.OS == "android" ? "space-between" : "center",
  },
  labelStyle: (size = 14, color = COLORS.black) => ({
    fontSize: normalizeText(size),
    color: color,
    textAlign: "center",
  }),
});
