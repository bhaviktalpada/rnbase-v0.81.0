import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { scale } from "react-native-size-matters";
import AppRegularText from "../utilities/app-regular-text"
import {normalizeText} from "../../utils/text-normalize"
import {APP} from "../../utils/constants"
import {COLORS} from "../../theme/colors"

export default function CustomTextHeading({
  titleLeft,
  titleLeftColor = COLORS.black,
  titleRight,
  titleRightColor = COLORS.black,
  iconRight,
  onPress,
  isDisabled,
  styletitleLeft,
  styletitleRight,
  containerStyle,
  textContainerStyle,
  marginTop = scale(8),
  marginBottom = scale(8),
  isLoading = false,
}) {
  return (
    <View
      style={[
        { marginTop, marginBottom },
        styles.mainContainer,
        containerStyle,
      ]}
    >
      <View style={[styles.flexRowContent, textContainerStyle]}>
        <View>
          <AppRegularText
            style={[styles.titleLeft(titleLeftColor), styletitleLeft]}
          >
            {titleLeft}
          </AppRegularText>
        </View>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={onPress}
          disabled={isDisabled}
        >
          <AppRegularText
            style={[styles.titleRight(titleRightColor), styletitleRight]}
          >
            {titleRight}
          </AppRegularText>
          {/* {iconRight && (
            <VectorIcon
              type={IconFamily}
              name={iconRight}
              size={normalizeText(15)}
              color={COLORS.black}
              style={{ marginLeft: scale(1), marginRight: scale(-5) }}
            />
          )} */}
        </TouchableOpacity>
        {isLoading && (
          <View style={{ position: "absolute" }}>
            <ActivityIndicator size="small" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  flexRowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRight: (titleRightColor) => ({
    fontSize: normalizeText(APP.DEFAULT_INPUT_FONT_SIZE),
    fontWeight: "400",
    color: titleRightColor,
  }),
  titleLeft: (titleRightColor) => ({
    fontSize: normalizeText(APP.DEFAULT_INPUT_FONT_SIZE),
    fontWeight: "400",
    color: titleRightColor,
  }),
  touchableStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
