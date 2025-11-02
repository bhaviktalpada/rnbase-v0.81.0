import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";

import { COLORS } from "@/theme";
import ImgSVG from "@/utils/image-svg";
import { APP } from "@/utils/constants";
import { SvgNavigateArrow } from "@/assets/svg/svg-navigate-arrow";
import AppRegularText from "../utilities/app-regular-text";
import AppBoldText from "../utilities/app-bold-text";
import AppScreenLoader from "../screen-loader/screen-loader";

export default function DashboardStatistics({
  bgcolor = COLORS.white,
  colorBorder = COLORS.colorLightestGrayE0,
  isLoading = false,
  icon,
  iconSize = 36,
  iconColor = COLORS.white,
  iconBGColor,
  totalInfo,
  info,
  rightIcon = SvgNavigateArrow,
  rightIconSize = 20,
  onPressHandler,
  titleFontSize = 15,
}) {
  return (
    <TouchableOpacity
      style={styles.mainContainer(bgcolor, colorBorder)}
      onPress={onPressHandler}
    >
      {icon && (
        <View style={styles.subView}>
          <View style={styles.leftImgView(iconSize, iconBGColor)}>
            <ImgSVG
              icon={icon}
              height={iconSize * 0.8}
              width={iconSize * 0.8}
              fill={iconColor}
              viewStyle={{ alignItems: "center" }}
            />
          </View>
        </View>
      )}

      <View style={styles.middleView}>
        {isLoading ? (
          <View style={{ alignItems: "flex-start" }}>
            <AppScreenLoader type="small" />
          </View>
        ) : totalInfo.length !== 0 ? (
          <AppBoldText
            numberOfLines={2}
            style={styles.titleStyle(titleFontSize)}
          >
            {totalInfo}
          </AppBoldText>
        ) : null}
        {info.length !== 0 ? (
          <AppRegularText
            numberOfLines={2}
            style={styles.subTitleStyle}
            color={COLORS.colorGray6C}
          >
            {info}
          </AppRegularText>
        ) : null}
      </View>
      {rightIcon && (
        <ImgSVG
          icon={rightIcon}
          height={rightIconSize}
          width={rightIconSize}
          viewStyle={styles.selfCenterStyle}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: (bgcolor, colorBorder) => ({
    flex: 1,
    // width: "100%",
    // marginHorizontal: scale(5),
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
    backgroundColor: bgcolor,
    flexDirection: "row",
    borderColor: colorBorder,
    borderWidth: APP.BORDER_WIDTH,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    marginBottom: scale(15),
  }),
  subView: {
    alignItems: "center",
    justifyContent: "center",
  },
  leftImgView: (iconSize, iconBGColor) => ({
    height: scale(iconSize),
    width: scale(iconSize),
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    backgroundColor: iconBGColor,
    justifyContent: "center",
    alignContent: "center",
  }),
  middleView: {
    flex: 1,
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    justifyContent: "center",
    alignSelf: "center",
  },
  titleStyle: (fontSize) => ({ maxWidth: "95%", fontSize: fontSize }),
  subTitleStyle: { maxWidth: "95%", fontSize: 14 },
  selfCenterStyle: { alignSelf: "center" },
});
