import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import AppCustomText from "../app-custom-text";
import { COLORS, FONTS } from "@/theme";
import { APP } from "@/utils/constants";
import ImgSVG from "@/utils/image-svg";
import { normalizeText } from "@/utils";
import AppRegularText from "@utilities/app-regular-text";

const ActionTextField = ({
  onPress,
  selectedItem,
  placeholderItem,
  value,
  viewStyle,
  textStyle,
  rightImage,
  showLeftButton,
  leftBtnStyle,
  leftImage,
  children,
  disabled = false,
  label,
  isCompulsory = false,
  isActive = false,
  bottomSpacing = scale(10),
}) => {
  return (
    <View>
      {label && (
        <AppCustomText
          fontFamily={FONTS.Regular}
          sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
          style={styles.labelStyle(isActive)}
        >
          {label}
          {isCompulsory && "*"}
        </AppCustomText>
      )}
      <TouchableOpacity
        style={{ marginBottom: bottomSpacing }}
        disabled={disabled}
        activeOpacity={disabled ? 1.0 : APP.ACTIVE_OPACITY}
        onPress={onPress}
      >
        <View
          style={{ ...styles.containerStyle(isActive, disabled), ...viewStyle }}
        >
          {showLeftButton ? (
            <ImgSVG
              src={leftImage}
              height={10}
              width={10}
              viewStyle={[styles.leftButtonImageStyle, leftBtnStyle]}
              fill={COLORS.colorGray99}
            />
          ) : null}

          {showLeftButton ? (
            <View style={{ marginHorizontal: scale(10) }}></View>
          ) : null}

          <AppRegularText
            style={{
              ...styles.textStyle(selectedItem, placeholderItem),
              ...textStyle,
            }}
          >
            {value}
          </AppRegularText>
          {rightImage ? (
            <ImgSVG
              src={rightImage}
              height={10}
              width={10}
              viewStyle={[styles.rightButtonImageStyle, leftBtnStyle]}
            />
          ) : null}
          {children}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionTextField;

const styles = StyleSheet.create({
  containerStyle: (isActive, disabled) => ({
    height: APP.TEXT_FIELD_HEIGHT,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: isActive
      ? COLORS.colorLightestGrayE0
      : COLORS.colorLightestGrayE0,
    borderWidth: APP.BORDER_WIDTH,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    flexDirection: "row",
    backgroundColor: disabled ? COLORS.colorLightestGrayE0 : COLORS.white,
  }),
  textStyle: (selectedItem, placeholderItem) => ({
    fontFamily: FONTS.AppRegularFont,
    fontSize: normalizeText(APP.DEFAULT_INPUT_FONT_SIZE),
    color:
      selectedItem == placeholderItem ? COLORS.colorMidGrayA5 : COLORS.black,
    marginHorizontal: 10,
  }),

  rightButtonImageStyle: {
    position: "absolute",
    right: scale(10),
    resizeMode: "contain",
    tintColor: COLORS.colorGray99,
  },
  leftButtonImageStyle: {
    position: "absolute",
    left: scale(10),
    resizeMode: "contain",
    tintColor: COLORS.colorGray99,
  },
  labelStyle: (isActive) => ({
    fontSize: normalizeText(APP.DEFAULT_TEXT_INPUT_LABEL_SIZE),
    color: isActive ? COLORS.colorGray6C : COLORS.colorGray6C,
    maxWidth: "80%",
    marginVertical: scale(5),
  }),
});
