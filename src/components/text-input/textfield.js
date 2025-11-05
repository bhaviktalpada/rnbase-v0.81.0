import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Text,
  Keyboard,
  InputAccessoryView,
} from "react-native";
import { scale } from "react-native-size-matters";

import { APP } from "../../utils/constants";
import { normalizeText } from "../../utils/text-normalize";
import { FONTS } from "../../theme/typography";
import { COLORS } from "../../theme/colors";
import { IMAGES } from "../../utils/images-path";
import SVGImage from "../../utils/image-svg";
import { isStringNull } from "../../utils/helper-function";
import AppRegularText from "./../utilities/app-regular-text";
import AppMediumText from "./../utilities/app-medium-text";
import LocalizeText from "../../utils/text-localize";
import SvgClose from "../../assets/svg/svg-close";
import SvgPasswordHide from "../../assets/svg/svg-password-hide";


const CustomTextField = ({
  onBlur,
  label,
  placeholder,
  showInlinePlaceholder = true,
  viewStyle,
  textInputStyle,
  keyboardType, //"default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad',* 'decimal-pad', 'twitter', 'web-search', 'visible-password'
  text,
  secureTextEntry,
  maxLength,
  showEye,
  eyeIcon,
  eyeIconType = "Entypo",
  hideClearButton,
  onPressEye,
  onChange,
  onReturnPress,
  returnKeyType,
  onBeginEdit,
  multiline,
  numberOfLines,
  countryCode,
  countryCodePicker,
  onPressCountryCode,
  dividerStyle,
  defaultValue,
  editable = true,
  disableEyeTouch,
  showExtraLabel = false,
  extraLabelColor = COLORS.black,
  extraLabelValue = "",
  autoCapitalize = "sentences", // "none","sentences","words","characters"
  onFocus,
  isOptional = false, // default Compulsory
  bottomSpacing = scale(15),
  autoCorrect = false,
  textContentType = "none",
  is_editing = () => {},
}) => {
  const refInput = React.useRef();
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [tempDividerViewStyle, setDividerViewStyle] = useState(dividerStyle);
  const [isEditing, setEditing] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [, setRefresh] = useState();

  const inputAccessoryViewID = "uniqueID";
  var textPlaceholder = placeholder ? placeholder : "Enter " + label;

  is_editing(isEditing);
  // const keyboardDidShowListener = Keyboard.addListener(
  //   'keyboardDidShow',
  //   () => {
  //     setKeyboardVisible(true); // or some other action
  //   },
  // );
  // const keyboardDidHideListener = Keyboard.addListener(
  //   'keyboardDidHide',
  //   () => {
  //     setEditing(false); // or some other action
  //   },
  // );
  // useEffect(() => {
  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  

  // function onPressEye() {
  //   if (disableEyeTouch) {
  //     return;
  //   }
  //   setIsSecure(!isSecure);
  // }

  function onEndEditing() {
    setEditing(false);

    setDividerViewStyle({
      ...dividerStyle,
      ...{ backgroundColor: COLORS.textFieldBorderColor },
    });
    if (onReturnPress) {
      onReturnPress();
    }
    setRefresh(Math.random());
  }

  function onBeginEditing() {
    setEditing(true);
    setDividerViewStyle({
      ...dividerStyle,
      ...{ backgroundColor: COLORS.primary },
    });
    if (onBeginEdit) {
      onBeginEdit();
    }
    setRefresh(Math.random());
  }

  var showClearButton = false;

  if (
    hideClearButton == null &&
    !isStringNull(text) &&
    Platform.OS == "android"
  ) {
    showClearButton = true;
  }

  return (
    <View style={{ flex: 1, marginBottom: bottomSpacing }}>
      {label && (
        <AppRegularText style={styles.labelStyle(isEditing, text)}>
          {label + (isOptional ? "" : "*")}
        </AppRegularText>
      )}
      <View style={{ ...styles.containerStyle(isEditing), ...viewStyle }}>
        {countryCodePicker == true ? (
          <TouchableOpacity
            activeOpacity={APP.ACTIVE_OPACITY}
            onPress={editable ? onPressCountryCode : null}
            style={styles.countryCodeContainer}
          >
            <View style={styles.countryCodeBox}>
              <Text style={styles.countryCode}>{countryCode}</Text>
            </View>
            <View style={{ ...styles.divider, ...tempDividerViewStyle }} />
          </TouchableOpacity>
        ) : null}

        <TextInput
          onBlur={onBlur}
          ref={refInput}
          style={[
            showEye
              ? styles.inputWithEye
              : styles.inputWithoutEye(hideClearButton),
            textInputStyle,
          ]}
          onFocus={
            editable
              ? () => {
                  setEditing(true);
                }
              : null
          }
          autoCapitalize={autoCapitalize}
          value={text}
          keyboardType={keyboardType}
          secureTextEntry={isSecure}
          placeholder={showInlinePlaceholder ? textPlaceholder : ""}
          placeholderTextColor={COLORS.textPlaceholderColor}
          clearButtonMode={hideClearButton ? null : "always"}
          onChangeText={onChange}
          returnKeyType={returnKeyType}
          onSubmitEditing={multiline ? null : Keyboard.dismiss}
          onEndEditing={onEndEditing}
          // onPressIn={editable ? onBeginEditing : null}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          defaultValue={defaultValue}
          editable={editable}
          autoCorrect={autoCorrect}
          textContentType={textContentType}
          autoFillProps={{
            autoCompleteType: "password",
            autoFillHints: ["password"],
          }}
          inputAccessoryViewID={inputAccessoryViewID}
        />
        {showExtraLabel && (
          <Text style={styles.extraLabelStyle(extraLabelColor)}>
            {extraLabelValue}
          </Text>
        )}
        {/* refInput.current?.blur() */}
        {Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.accessory}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                activeOpacity={APP.ACTIVE_OPACITY}
                onPress={() => Keyboard.dismiss()}
              >
                <AppMediumText style={styles.doneButton}>
                  {LocalizeText.button.done}
                </AppMediumText>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        )}

        <View style={styles.clearBtnContainer}>
          {showClearButton ? (
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => {
                refInput.current.clear();
                onChange("");
              }}
            >
              <View style={styles.clearBtnImageContainer}>
                <SVGImage
                icon={SvgClose}
                height={10}
                width={10}
                fill={COLORS.white}
                />
              </View>
            </TouchableOpacity>
          ) : null}

          {showEye ? (
            <TouchableOpacity
              activeOpacity={disableEyeTouch ? 1 : APP.ACTIVE_OPACITY}
              style={styles.eyeIconContainer}
              onPress={disableEyeTouch ? null : onPressEye}
            >
              {eyeIcon ? (
                <SVGImage
                icon={eyeIcon}
                height={24}
                width={24}
                fill={COLORS.gray_Dark}
                />
              ) : (
                <Image
                  style={styles.eyeIconStyle}
                  source={isSecure ? IMAGES.eyeShow : IMAGES.eyeHide}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: (isEditing) => ({
    height: APP.TEXT_FIELD_HEIGHT,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderColor: isEditing ? COLORS.primary : COLORS.textFieldBorderColor,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: APP.TEXT_FIELD_BORDER_RADIUS,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    overflow: "hidden",
  }),
  labelStyle: (IsEditing, text) => ({
    fontSize: normalizeText(12),
    color: IsEditing
      ? COLORS.primary
      : !isStringNull(text)
      ? COLORS.gray_Dark
      : COLORS.gray_Dark,
    marginBottom: scale(5),
  }),
  countryCodeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputWithEye: {
    height: "100%",
    flex: 1,
    padding: 0,
    borderRadius: 10,
    marginLeft: scale(8),
    marginRight: scale(40),
    fontFamily: FONTS.Regular,
    fontSize: APP.DEFAULT_INPUT_FONT_SIZE,
    color: COLORS.textColor,
  },
  inputWithoutEye: (hideClearButton) => ({
    height: "100%",
    flex: 1,
    padding: 0,
    borderRadius: scale(10),
    marginLeft: scale(10),
    marginRight:
      Platform.OS == "android" && !hideClearButton ? scale(30) : scale(10),
    fontFamily: FONTS.AppRegularFont,
    fontSize: APP.DEFAULT_INPUT_FONT_SIZE,
    color: COLORS.textColor,
    marginTop: Platform.OS == "ios" ? 0 : 0,
  }),
  eyeIconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIconStyle: {
    tintColor: "gray",
    width: 25,
    width: 25,
    resizeMode: "contain",
  },
  clearIconStyle: {
    width: 6,
    height: 6,
    resizeMode: "contain",
  },
  countryCodeContainer: {
    height: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "baseline",
    paddingHorizontal: 15,
  },
  countryCode: {
    fontFamily: FONTS.Regular,
    fontSize: APP.DEFAULT_INPUT_FONT_SIZE,
    color: COLORS.textColor,
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: COLORS.textFieldBorderColor,
    position: "absolute",
    right: 0,
  },
  extraLabelStyle: (extraLabelColor) => ({
    position: "absolute",
    right: 5,
    color: extraLabelColor,
    fontFamily: FONTS.Regular,
    fontSize: normalizeText(10),
  }),
  clearBtnContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 6,
  },
  clearBtnImageContainer: {
    padding: scale(3),
    backgroundColor: COLORS.colorC5,
    borderRadius: scale(10),
  },
  accessory: {
    backgroundColor: COLORS.white,
    height: scale(40),
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.gray_Superlite,
  },
  doneButton: {
    
    fontSize: normalizeText(15),
    paddingHorizontal: scale(15),
  },
});

export default CustomTextField;
