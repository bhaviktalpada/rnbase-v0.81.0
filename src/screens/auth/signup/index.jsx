import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { scale } from "react-native-size-matters";
import auth from "@react-native-firebase/auth";
import { CommonActions } from "@react-navigation/native";
import { CountryPicker } from "react-native-country-codes-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//Hooks
import { useDispatch, useSelector } from "react-redux";
import {
  setAppUserData,
  setIsUserLogIn,
  setMasterData,
  setUserInfo,
  setUserRole,
} from "@/redux/reducers/userInfo-reducer";

// Component
import { BaseContainer } from "@/components/utilities";
import AppScrollView from "@/components/app-scrollview";
import AppCustomButton from "@/components/app-custom-button";
import CustomTextField from "@/components/text-input/textfield";
import { AuthHeader } from "@/components/auth-header";
import { ShowToast } from "@/components/toast";

//Util | Constants
import { FIREBASE_ERROR, toastTypes, USER_ROLE_NAME } from "@/utils/app-enum";
import { useKeyboard } from "@utils/helper-keyboard";
import { isStringNull } from "@/utils/helper-function";
import globalStyles from "@/utils/global-styles";
import LocalizeText from "@/utils/text-localize";
import { SCREEN } from "@/utils/screen-name";
import { SVGFile } from "@/utils/images-path";
import { COLORS } from "@/theme";
import {
  asyncStorageGet,
  readJsonValueAsync,
  STORE_KEY,
  textInputFilterFunction,
  VALIDATE_FILTER_TYPE,
  validateEmailString,
} from "@/utils";
import {
  getAllUsers,
  getPostCategory,
  saveUserDetail,
} from "@/utils/firebase-db-helper";

export default function SignupScreen({ navigation }) {
  const { alerts, placeholder, personalInfo } = LocalizeText;

  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const dispatch = useDispatch();
  const keyboardHeight = useKeyboard();
  const inset = useSafeAreaInsets();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isPasswordSecure, setPasswordSecure] = useState(true);

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(`+91`);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loadCP, setLoadCP] = useState(false);

  function signupPressHandler() {
    if (isStringNull(userName)) {
      ShowToast(toastTypes.error, alerts.userRequired);
    } else if (isStringNull(email)) {
      ShowToast(toastTypes.error, alerts.emailRequired);
    } else if (!validateEmailString(email)) {
      ShowToast(toastTypes.error, alerts.validateEmail);
    } else if (isStringNull(password)) {
      ShowToast(toastTypes.error, alerts.passwordRequired);
    } else if (password !== confPassword) {
      ShowToast(toastTypes.error, alerts.passwordConfPassNotMatch);
    } else {
      if (netConnected) {
        setLoading(true);
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            console.log("User account!****", res);
            handleSignup(res);
            setLoading(false);
          })
          .catch((error) => {
            console.log("error.code", error.code);
            if (error.code === FIREBASE_ERROR.InvalidPassword) {
              ShowToast(toastTypes.error, alerts.invalidPassword);
            } else if (error.code === FIREBASE_ERROR.EmailAlreadyInUse) {
              ShowToast(toastTypes.error, alerts.emailAlreadyUsed);
            } else {
              ShowToast(toastTypes.error, error.code);
            }
            console.log(error);
            setLoading(false);
          });
      } else {
        ShowToast(toastTypes.error, alerts.internetConnection);
      }
    }
  }

  async function handleSignup(res) {
    const userData = res.user;
    console.log("userData", userData);
    var fcmToken = await asyncStorageGet(STORE_KEY.FCM_TOKEN);
    var deviceInfo = await readJsonValueAsync(STORE_KEY.DEVICE_INFO);
    let actualPhoneNumber = phone ?? "";
    let actualCountryCode = countryCode ?? "";
    const additionalData = res.additionalUserInfo;
    const userInfo = {
      displayName: userName,
      phoneNumber: actualPhoneNumber,
      countryCode: actualCountryCode,
      fcmToken: fcmToken,
      email: userData.email,
      uid: userData.uid,
      emailVerified: userData.emailVerified,
      role: USER_ROLE_NAME.User,
      signupType: additionalData.providerId,
      profilePhoto: "",
      filePath: "",
      address: "",
      device_name: deviceInfo.deviceName,
      device_version: deviceInfo.deviceModel,
      software_version: deviceInfo.systemVersion,
      app_version: deviceInfo.appVersion,
    };
    console.log("Prep users data***", userInfo);
    saveUserDetail(userInfo, userData.uid);

    dispatch(setUserInfo(userInfo));
    dispatch(setIsUserLogIn(true));
    dispatch(setUserRole(USER_ROLE_NAME.User));

    getPostCategory(onResponse);
  }

  function onResponse(res) {
    //console.log('res', res);
    const allKeys = Object.keys(res);
    const allCategory = [];
    allKeys.forEach((key, index) => {
      const object = res[key];
      allCategory.push(object);
    });
    dispatch(setMasterData(allCategory));
    getAllUsers(onAllUserResponse);
  }

  function onAllUserResponse(res) {
    //console.log('res', res);

    dispatch(setAppUserData(res));
    //replaceNavigationStack(SCREEN.CustomerDashboardScreen);
    replaceNavigationStack(SCREEN.CustomerOnboardingScreen);
  }

  const replaceNavigationStack = (screenName) => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: screenName }] })
    );
  };

  function dismissCountryPicker() {
    setShowCountryPicker(false);
    setTimeout(() => {
      setLoadCP(false);
    }, 1000);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
      <AppScrollView
        viewStyle={{ marginTop: inset.top, marginBottom: inset.bottom }}
        isLoading={isLoading}
      >
        <AuthHeader
          navigation={navigation}
          title={LocalizeText.auth.signUp}
          isUnderBarOption={true}
          isBackOption={true}
        />
        <View style={styles.mainContainer}>
          <CustomTextField
            label={personalInfo.displayName}
            text={userName}
            onChange={(v) => setUserName(v)}
            isOptional={true}
          />

          <CustomTextField
            countryCodePicker={true}
            countryCode={countryCode}
            onPressCountryCode={() => {
              // Keyboard.dismiss();
              // setLoadCP(true);
              // setShowCountryPicker(true);
            }}
            label={personalInfo.phone}
            text={phone}
            maxLength={10}
            keyboardType={"phone-pad"}
            returnKeyType={"done"}
            onChange={(v) => {
              if (phone.length > v.length) {
                setPhone(v);
              } else if (
                textInputFilterFunction(
                  VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC,
                  v
                )
              ) {
                setPhone(v);
              }
            }}
            isOptional={true}
          />
 
          <CustomTextField
            label={personalInfo.email}
            text={email}
            onChange={(v) => setEmail(v)}
            autoCorrect={true}
            autoCapitalize="none"
            keyboardType={"email-address"}
            textContentType={"username"}
          />
          <CustomTextField
            label={LocalizeText.auth.password}
            text={password}
            onChange={(v) => setPassword(v)}
            autoCapitalize="none"
            hideClearButton={true}
            eyeIcon={isPasswordSecure ? SVGFile.svgPasswordHide : SVGFile.svgPasswordShow}
            showEye={true}
            secureTextEntry={isPasswordSecure}
            autoCorrect={true}
            onPressEye={() => {
              console.log("Tap Eye", isPasswordSecure);
              setPasswordSecure(!isPasswordSecure);
            }}
            textContentType={isPasswordSecure ? "password" : null}
          />

          <CustomTextField
            label={LocalizeText.auth.ConfirmPassword}
            text={confPassword}
            onChange={(v) => setConfPassword(v)}
            autoCapitalize="none"
            hideClearButton={true}
            secureTextEntry={true}
            showEye={true}
            autoCorrect={true}
            textContentType={"password"}
          />

          <AppCustomButton
            isLoading={isLoading}
            onPress={signupPressHandler}
            title={LocalizeText.auth.signIn}
            disabled={isLoading}
            mainContainerStyle={{ marginTop: scale(10) }}
          />
        </View>
      </AppScrollView>
      {loadCP ? (
        <CountryPicker
          show={showCountryPicker}
          enableModalAvoiding={true}
          placeholderTextColor={COLORS.colorGray99}
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
