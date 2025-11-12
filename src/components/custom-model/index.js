import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import Modal from "react-native-modal";

// //Constant
import { IMAGES } from "../../utils/images-path";
import { APP } from "../../utils/constants";
import { FONTS } from "../../theme/typography";
import AppBoldText from "../utilities/app-bold-text";
import AppCustomText from "../app-custom-text";
import { screenWidth } from "../../utils/dimensions";
import AppCustomButton from "../app-custom-button";
import { COLORS } from "../../theme/colors";
import ImgSVG from "../../utils/image-svg";

export default function CustomModel({
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
        onBackdropPress={handleBackDropPress}
        onBackButtonPress={handleBackButtonPress}
      >
        <View style={styles.mainContainer}>
          <ImageBackground
            source={IMAGES.app_bg_container}
            resizeMode="cover"
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: APP.TEXT_FIELD_BORDER_RADIUS }}
          >
            <View style={styles.subView}>
              {iconName && (
                <View style={styles.imgIcon}>
                  <ImgSVG
                    height={20}
                    width={20}
                    fill={COLORS.colorRed}
                    src={iconName}
                    //icon={iconName}
                  />
                </View>
              )}
              <AppBoldText
                sizeFont={APP.FONT_SIZE_14}
                style={{ marginTop: scale(10) }}
              >
                {title}
              </AppBoldText>
              <AppCustomText
                numberOfLines={2}
                fontFamily={FONTS.AppRegularFont}
                sizeFont={APP.DEFAULT_INPUT_FONT_SIZE}
                color={COLORS.colorGray6C}
                style={{ marginTop: scale(5), textAlign: "center" }}
              >
                {subTitle}
              </AppCustomText>
              <View style={{ flexDirection: "row", marginTop: scale(15) }}>
                <AppCustomText
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
          </ImageBackground>
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
});
