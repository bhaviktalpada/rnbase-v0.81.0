import { Appearance, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from '@react-navigation/stack';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import VersionCheck from "react-native-version-check";
import { globalNavigationRef } from "../utils/helper-navigation";
import { SCREEN } from "../utils/screen-name";
import {
  setConnectionType,
  setDeviceInfo,
  toggleNetState,
} from "../redux/reducers/netInfo-reducer";
import LanguageHelper from "../utils/LanguageHelper";

import { setColorScheme } from "../redux/reducers/color-theme-reducer";
import LoginScreen from "@/screens/auth/login";
import LandingScreen from "@/screens/auth/landing";
import ForceUpdateScreen from '@/screens/force-update-screen';
import HomeScreen from "@/screens/home-screen/home-screen";
import { NoInternet } from "@/components/utilities";
import LocalizeText from "@/localization/text-localize";
import { show_log } from "@/utils/logger";


const Route = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isUserLogIn = useSelector((v) => v?.userInfoReducer?.isUserLogin);
  const [connected, setConnected] = useState(true);
  const colorScheme = Appearance.getColorScheme();
  const [updateAvail, setUpdateAvail] = useState(false);

  useEffect(() => {
    checkUpdate();
    setColorToStore();

    const NetInfoSubscriber = NetInfo.addEventListener((state) => {
      var netLog = state.isConnected
        ? `Routes.js => Device is online & connected with ${state.type.toUpperCase()}`
        : `Routes.js => Device is offline & connected with ${state.type.toUpperCase()}`;

      show_log("netLog", netLog);

      var c_type = state.type.toUpperCase();
      dispatch(toggleNetState(state.isConnected));
      dispatch(setConnectionType(c_type));

      if (state.isConnected == true) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });

    // Device information
    deviceInformation();

    // Language Set
    LanguageHelper.getCurrentLanguage().then((lang) => {
      LocalizeText.setLanguage(lang);
    });

    // Appearance (color scheme) listener
    const colorSchemeListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        dispatch(setColorScheme(colorScheme)); // store in Redux or state
      }
    );

    return () => {
      NetInfoSubscriber(); // cleanup network listener
      colorSchemeListener.remove(); // cleanup appearance listener
    };
  }, []);

  useEffect(() => {
    handleInitFirebase();
  }, []);

  const handleInitFirebase = () => {};

  function setColorToStore() {
    dispatch(setColorScheme(colorScheme));
  }

  const deviceInformation = async () => {
    var systemVersion = DeviceInfo.getSystemVersion();
    var deviceType = Platform.OS == "android" ? "Android" : "iOS";
    var deviceName = await DeviceInfo.getDeviceName();
    var appVersion = DeviceInfo.getVersion();
    var deviceModel = DeviceInfo.getBrand();
    var deviceInfo = {
      systemVersion,
      deviceType,
      deviceName,
      appVersion,
      deviceModel,
    };

    dispatch(setDeviceInfo(deviceInfo));
  };

  if (!connected) {
    return <NoInternet />;
  }

  const checkUpdate = async () => {
    await VersionCheck.needUpdate().then((res) => {
      console.log("Update app res******", res);
      if (res?.isNeeded == true) {
        setUpdateAvail(true);
      }
    });
  };

  return (
    <NavigationContainer ref={globalNavigationRef}>
      {updateAvail == true ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={SCREEN.ForceUpdateScreen}
            component={ForceUpdateScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: false, orientation: "portrait" }}
        >
          <Stack.Screen name={SCREEN.LandingScreen} component={LandingScreen} />
          <Stack.Screen name={SCREEN.homeScreen} component={HomeScreen} />
          <Stack.Screen name={SCREEN.LoginScreen} component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Route;
