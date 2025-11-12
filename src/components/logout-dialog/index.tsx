import React from "react";
import {  StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import Modal from "react-native-modal";
import { APP } from "@/utils/constants";
import { IMAGES, SVGFile } from "@/utils/images-path";
import AppCustomText from "../app-custom-text";
import { COLORS, FONTS } from "@/theme";
import { screenWidth } from "@/utils/dimensions";
import ImgSVG from "@/utils/image-svg";
import AppCustomButton from "../app-custom-button";

//Constant

export default function LogoutCustomModel({
  isVisible,
  handleBackDropPress,
  handleBackButtonPress,
  iconName,
  title,
  subTitle,
  firstButtonTitle,
  secondButtonTitle,
  firstButtonBGColor,
  secondButtonBGColor,
  onPressFirstButton,
  onPressSecondButton,
}) {
  return (
    isVisible && (
      <Modal
        isVisible={isVisible}
        hasBackdrop={false}
        onBackdropPress={handleBackDropPress}
        onBackButtonPress={handleBackButtonPress}
      >
        <View style={styles.mainContainer}>
          
            <View style={styles.subView}>
              {iconName && (
                <View style={styles.imgIcon}>
                  <ImgSVG src={iconName} size={scale(20)} />
                </View>
              )}
              <AppCustomText
                fontFamily={FONTS.Bold}
                sizeFont={APP.FONT_SIZE_14}
                style={{ marginTop: scale(10) }}
              >
                {title}
              </AppCustomText>
              <AppCustomText
                numberOfLines={2}
                fontFamily={FONTS.Regular}
                sizeFont={APP.DEFAULT_INPUT_FONT_SIZE}
                color={COLORS.colorGray6C}
                style={styles.subTitleStyle}
              >
                {subTitle}
              </AppCustomText>
              <View style={styles.buttonsContainer}>
                <AppCustomButton
                  title={firstButtonTitle}
                  fontSize={12}
                  borderWidth={APP.BORDER_WIDTH}
                  borderColor={COLORS.colorTransparent}
                  bgColor={firstButtonBGColor}
                  onPress={onPressFirstButton}
                  textStyle={{ color: COLORS.white }}
                  mainContainerStyle={{
                    width: scale(120),
                    marginRight: scale(10),
                  }}
                />
                <AppCustomButton
                  title={secondButtonTitle}
                  fontSize={12}
                  borderWidth={APP.BORDER_WIDTH}
                  borderColor={COLORS.black}
                  bgColor={secondButtonBGColor}
                  onPress={onPressSecondButton}
                  textStyle={{ color: COLORS.black }}
                  mainContainerStyle={{ width: scale(120) }}
                />
              </View>
            </View>
          
        </View>
      </Modal>
    )
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: scale(180),
    width: screenWidth - 60,
    alignSelf: "center",
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    backgroundColor: COLORS.white
  },
  subView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: APP.APP_SCREEN_VERTICAL_PADDING,
  },
  imgIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.colorMediumLightRed,
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    borderColor: COLORS.colorRed,
    borderWidth: APP.BORDER_WIDTH,
  },
  subTitleStyle: { marginTop: scale(5), textAlign: "center" },
  buttonsContainer: { flexDirection: "row", marginTop: scale(15) },
});
