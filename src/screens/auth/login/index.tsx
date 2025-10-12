import { Keyboard, View } from "react-native";
import React, { useState } from "react";
import { CountryPicker } from "react-native-country-codes-picker";
import { isValidPhoneNumber } from "react-phone-number-input";

import { BaseContainer } from "@/components/utilities";
import CustomImagePicker from "@/components/custom-image-picker";
import AppRegularText from "@/components/utilities/app-regular-text";
import MainHeader from "@/components/utilities/header";
import { CAMERA_TYPE } from "@/utils/app-enum";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";
import { COLORS, GLOBAL_STYLES } from "@/theme";
import styles from "./styles";
import ImgSVG from "@/utils/image-svg";
import { ImgStock, ImgSTATISTICS } from "@/utils/image-svg/svg-images";
import { BackIconSvg } from "@/assets/svg";
import { SvgMonthly } from "@/assets/svg/svg-monthly";
import { SvgFodder } from "@/assets/svg/svg-fodder";
import CustomTextField from "@/components/text-input/textfield";
import { textInputFilterFunction, VALIDATE_FILTER_TYPE } from "@/utils";
import globalStyles from "../../../utils/global-styles";
import { useKeyboard } from "../../../utils/helper-keyboard";

export default function LoginScreen({ navigation }) {
  const [displayNm, setDisplayNm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadCP, setLoadCP] = useState(false);
  const keyboardHeight = useKeyboard();

  function dismissCountryPicker() {
    setShowCountryPicker(false);
    setTimeout(() => {
      setLoadCP(false);
    }, 1000);
  }

  return (
    <BaseContainer isTopSafeArea={false}>
      <MainHeader navigation={navigation} />
      <View style={styles.container}>
        <AppRegularText
          onPress={() => {}}
          fontFamily="Light"
          size={20}
          color={COLORS.red_dark}
        >
          Login
        </AppRegularText>
        {/* Phone */}
        <CustomTextField
          viewStyle={{ marginTop: 20 }}
          countryCodePicker={true}
          countryCode={countryCode}
          placeholder={"Phone Number"}
          keyboardType="number-pad"
          returnKeyType={"done"}
          onPressCountryCode={() => {
            Keyboard.dismiss();
            if (isLoading == false) {
              setLoadCP(true);
              setShowCountryPicker(true);
            }
          }}
          onChange={(v) => {
            if (
              textInputFilterFunction(
                VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC,
                v
              )
            ) {
              setPhoneNumber(v);
            }
          }}
          maxLength={10}
          text={phoneNumber}
          isOptional={false}
        />
      </View>
      {loadCP ? (
        <CountryPicker
          show={showCountryPicker}
          placeholderTextColor={COLORS.textFieldBorderColor}
          style={globalStyles.countryPickerStyle(keyboardHeight)}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            dismissCountryPicker();
          }}
          onBackdropPress={() => {
            dismissCountryPicker();
          }}
        />
      ) : null}
    </BaseContainer>
  );
}
