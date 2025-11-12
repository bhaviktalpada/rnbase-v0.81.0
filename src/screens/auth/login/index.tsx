import { Keyboard, View } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { CommonActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

// Component
import CustomTextField from "@/components/text-input/textfield";
import CustomTextHeading from "@components/custom-text-heading";
import AppCustomButton from "@/components/app-custom-button";
import AppScrollView from "@/components/app-scrollview";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import CheckBox from "@/components/checkbox";

// Util | Constants
import { FIREBASE_ERROR, toastTypes, USER_ROLE_NAME } from "@/utils/app-enum";
import { addGoogleAnalytics, isStringNull } from "@/utils/helper-function";
import { useDispatch, useSelector } from "react-redux";
import * as types from "@redux/actions/action-list";
import LocalizeText from "@/utils/text-localize";
import { ShowToast } from "@/components/toast";
import { SCREEN } from "@/utils/screen-name";
import { COLORS } from "@/theme";
import styles from "./styles";
import {
  asyncStorageGet,
  readJsonValueAsync,
  STORE_KEY,
  validateEmailString,
} from "@/utils";
import {
  getAllUsers,
  getPostCategory,
  getUserDetail,
  saveUserDetail,
} from "@/utils/firebase-db-helper";
import { setAppUserData, setIsUserLogIn, setMasterData, setUserInfo, setUserRole } from "@/redux/reducers/userInfo-reducer";
import { SVGFile } from "@/utils/images-path";


export default function LoginScreen({ navigation }) {
  const { alerts, personalInfo } = LocalizeText;

  const netConnected = useSelector((v) => v?.netInfoReducer?.isConnected);
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();

  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLoadingGuest, setLoadingGuest] = useState(false);
  const [isPasswordSecure, setPasswordSecure] = useState(true);
  let loginUserRole = "";

  /// Login button action
  function loginPressHandler() {
    Keyboard.dismiss();
    if (isStringNull(email)) {
      ShowToast(toastTypes.error, alerts.emailRequired);
      return;
    } else if (!validateEmailString(email)) {
      ShowToast(toastTypes.error, alerts.validateEmail);
      return;
    }

    if (netConnected) {
      addGoogleAnalytics("ga_login_action", {
        email: email,
        password: password,
      });

      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("User account!", res);
          handleLogin(res);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error.code", error.code);
          if (error.code === FIREBASE_ERROR.UserNotFound) {
            ShowToast(toastTypes.error, alerts.userNotFound);
          } else if (error.code === FIREBASE_ERROR.WrongUserNamePassword) {
            ShowToast(toastTypes.error, alerts.wrongUserNameOrPassword);
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

  function forgotPressHandler() {
    Keyboard.dismiss();
    if (isStringNull(email)) {
      ShowToast(toastTypes.error, alerts.emailRequired);
      return;
    } else if (!validateEmailString(email)) {
      ShowToast(toastTypes.error, alerts.validateEmail);
      return;
    }
    if (netConnected) {
      setLoading(true);
      auth()
        .sendPasswordResetEmail(email)
        .then((res) => {
          console.log("Forgot password!", res);
          setLoading(false);
          ShowToast(toastTypes.success, alerts.emailSentToRegisteredEmail);
        })
        .catch((error) => {
          console.log("error.code", error.code);
          if (error.code === FIREBASE_ERROR.InvalidEmail) {
            ShowToast(toastTypes.error, alerts.invalidEmail);
          }
          if (error.code === FIREBASE_ERROR.UserNotFound) {
            ShowToast(toastTypes.error, alerts.userNotFound);
          }
          setLoading(false);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  function signupPressHandler() {
    navigation.navigate(SCREEN.SignupScreen);
  }

  function continueAsGuest() {
    Keyboard.dismiss();
    setLoadingGuest(true);
    dispatch(setUserRole(USER_ROLE_NAME.Guest));
    dispatch(setIsUserLogIn(true));
    getPostCategory(onResponse);
  }

  function handleLogin(res) {
    console.log("userData***>", res.user.uid);
    addGoogleAnalytics("ga_login_response", { info: res.user });
    getUserDetail(res.user.uid, onUserDetailCallBack);
  }

  function onUserDetailCallBack(res) {
    const userInfo = res;
    console.log("snapshot", userInfo);

    updateUserInfo(userInfo);

    dispatch(setUserInfo(userInfo));
    dispatch(setIsUserLogIn(true));
    dispatch(setUserRole(userInfo.role));
    loginUserRole = userInfo.role;
    getPostCategory(onResponse);
  }

  async function updateUserInfo(userInfo) {
    var deviceInfo = await readJsonValueAsync(STORE_KEY.DEVICE_INFO);
    var fcmToken = await asyncStorageGet(STORE_KEY.FCM_TOKEN);
    const deviceInfoObj = {
      device_name: deviceInfo.deviceName,
      device_version: deviceInfo.deviceModel,
      software_version: deviceInfo.systemVersion,
      app_version: deviceInfo.appVersion,
      fcmToken: fcmToken,
    };

    const mergeUserData = { ...userInfo, ...deviceInfoObj };
    console.log("deviceInfoObj1", mergeUserData);
    saveUserDetail(mergeUserData, userInfo.uid);
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

    setLoadingGuest(false);
  }

  function onAllUserResponse(res) {
    //console.log('res', res);
    dispatch(setAppUserData(res));
    console.log("loginUserRole", loginUserRole);
    if (loginUserRole === USER_ROLE_NAME.Owner) {
      replaceNavigationStack(SCREEN.AdminDashboardScreen);
    } else {
      replaceNavigationStack(SCREEN.CustomerOnboardingScreen);
    }
  }

  const replaceNavigationStack = (screenName) => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: screenName }] })
    );
  };

  return (
    <BaseContainer isTopSafeArea={false}>
      <MainHeader navigation={navigation} leftTitle="Login" />
      <AppScrollView
        viewStyle={{ marginBottom: inset.bottom }}
        isLoading={isLoading}
      >
        <View style={styles.mainContainer}>
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
            secureTextEntry={isPasswordSecure}
            showEye={true}
            autoCorrect={true}
            onPressEye={() => {
              console.log("Tap Eye", isPasswordSecure);
              setPasswordSecure(!isPasswordSecure);
            }}
            textContentType={isPasswordSecure ? "password" : null}
          />

          <CustomTextHeading
            titleRight={LocalizeText.auth.forgotPassword}
            titleRightColor={COLORS.colorLightBlack}
            onPress={forgotPressHandler}
          />
          <AppCustomButton
            isLoading={isLoading}
            onPress={loginPressHandler}
            title={LocalizeText.auth.signIn}
            disabled={isLoading}
            mainContainerStyle={{ marginTop: scale(10) }}
          />
          <CustomTextHeading
            titleRight={LocalizeText.auth.signUp}
            titleRightColor={COLORS.colorLightBlack}
            onPress={signupPressHandler}
            textContainerStyle={{ justifyContent: "center" }}
          />

          <CheckBox
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
      </AppScrollView>
      <CustomTextHeading
        isLoading={isLoadingGuest}
        titleRight={LocalizeText.auth.guestButton}
        titleRightColor={COLORS.colorLightBlack}
        onPress={continueAsGuest}
        textContainerStyle={{ justifyContent: "center" }}
      />
    </BaseContainer>
  );
}
