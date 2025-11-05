import React from "react";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/theme";
import { IMAGES } from "@/utils/images-path";

export default function BaseContainer({
  children,
  isTopSafeArea = false,
  showBgImage = true,
  isBottomSafeArea = true,
  bgColor = COLORS.transparent,
  headerBGColor = COLORS.headerColor,
  bottomSafeColor = bgColor,
  bgImage = IMAGES.app_bg_container,
}) {
  const inset = useSafeAreaInsets();

  return (
    <>
      {showBgImage ? (
        <Image
          style={styles.bgImageStyle}
          source={bgImage}
          resizeMode="cover"
        />
      ) : null}
      <View
        style={styles.wrapperView(
          inset,
          isTopSafeArea,
          isBottomSafeArea,
          bgColor
        )}
      >
        {children}
      </View>

      {isTopSafeArea ? (
        <View style={styles.headerTopView(headerBGColor, inset)}>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={headerBGColor}
          />
        </View>
      ) : null}
      {isBottomSafeArea && (
        <View style={styles.bottomSafeColorStyle(bottomSafeColor, inset)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerTopView: (headerBGColor, inset) => ({
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: inset.top,
    width: "100%",
    position: "absolute",
    backgroundColor: headerBGColor,
  }),
  bgImageStyle: { position: "absolute", height: "100%", width: "100%" },
  wrapperView: (inset, isTopSafeArea, isBottomSafeArea, bgColor) => ({
    flex: 1,
    backgroundColor: bgColor,
    marginTop: isTopSafeArea ? inset.top : 0,
    marginBottom: isBottomSafeArea ? inset.bottom : 0,
  }),
  bottomSafeColorStyle: (color, inset) => ({
    width: "100%",
    height: inset.bottom,
    backgroundColor: color,
    position: "absolute",
    bottom: 0,
  }),
});
