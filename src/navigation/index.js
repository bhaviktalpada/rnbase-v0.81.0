import { Appearance, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { NavigationContainer } from "@react-navigation/native";
import PushNotification from "react-native-push-notification";
import { getApp } from "@react-native-firebase/app";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import VersionCheck from "react-native-version-check";
import DeviceInfo from "react-native-device-info";
import {
  getMessaging,
  requestPermission,
  getToken,
  onTokenRefresh,
  AuthorizationStatus,
} from "@react-native-firebase/messaging";

// Utils
import { globalNavigationRef } from "@/utils/helper-navigation";
import { addGoogleAnalytics } from "@/utils/helper-function";
import { SCREEN } from "@/utils/screen-name";
import { show_log } from "@/utils/logger";
import { APP } from "@/utils/constants";

// Redux actions
import {
  setConnectionType,
  setDeviceInfo,
  toggleNetState,
} from "@/redux/reducers/netInfo-reducer";
import { FCMToken } from "@/redux/actions/app-actions";
import { setColorScheme } from "@redux/reducers/color-theme-reducer";
import { STORE_KEY, storeJsonValueAsync } from "@/utils";

// Screens
import GenericStatisticsScreen from "@/screens/generic-statistics-screen";
import AddGeneralExpensesVC from "@/screens/admin/add-general-expenses";
import SelectUserController from "@/screens/admin/select-user-screen";
import WebContentController from "@/screens/auth/webview-controller";
import AddMonthlyController from "@/screens/admin/add-monthly-fund";
import GenericFundManageScreen from "@/screens/generic-fund-manage";
import AdminDashboardScreen from "@/screens/admin/owner-dashboard";
import CustomerOnboardingScreen from "@/screens/customer-onboard";
import ForceUpdateScreen from "@/screens/force-update-screen";
import DonationListController from "@/screens/donation-lists";
import ChangeLanguageScreen from "@/screens/change-language";
import SettingsController from "@/screens/settings-screen";
import AddBannerView from "@/screens/admin/add-banner";
import UserProfileScreen from "@/screens/auth/profile";
import LandingScreen from "@/screens/auth/landing";
import SignupScreen from "@/screens/auth/signup";
import LoginScreen from "@/screens/auth/login";
import ChartScreen from "@/screens/chart";

// Components
import { NoInternet } from "@utilities";

const Route = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isUserLogIn = useSelector((v) => v?.userInfoReducer?.isUserLogin);
  const [connected, setConnected] = useState(true);
  const colorScheme = Appearance.getColorScheme();
  const [updateAvail, setUpdateAvail] = useState(false);

  useEffect(() => {
    //handleInitFirebase(); // Firebase
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
    const fetchToken = async () => {
      console.log("*** Start Fetch Token");

      const app = getApp(); // ✅ New modular API

      console.log("*** Get App Res", app);
      const messaging = getMessaging(app);
      console.log("*** Get Messaging Obj", messaging);

      // Request permission (for iOS)
      const authStatus = await requestPermission(messaging);

      console.log("*** Get Auth Status", authStatus);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;
      console.log("*** Enable Permission", enabled);
      if (enabled) {
        const token = await getToken(messaging);
        console.log("FCM Token:", token);
        dispatch(FCMToken());
        //Alert.alert("FCM Token", token);
      } else {
        dispatch(FCMToken("para,"));
      }

      // Listen for token refresh
      onTokenRefresh(messaging, (token) => {
        console.log("New Token:", token);
      });
    };

    fetchToken();
    configureTPushNotification();
  }, []);

  // const requestUserPermission = async () => {
  //   console.log("Requesting Notification***>");

  //   // 1. Get the Messaging service instance
  //   const messagingService = getMessaging();

  //   // 2. Request permission using the imported function
  //   const authStatus = await requestPermission(messagingService);

  //   // 3. AuthorizationStatus is still accessed via the service instance's import
  //   const enabled =
  //     authStatus === AuthorizationStatus.AUTHORIZED ||
  //     authStatus === AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Notification permission granted.***");
  //     // *** FIX: Explicitly register for remote messages on iOS ***

  //     if (isDeviceRegisteredForRemoteMessages(messagingService)) {
  //       console.log("*** YES REGISTER");
  //     }

  //     await getFcmToken(); // This should be the modular version
  //   } else {
  //     console.log("Notification permission denied.");
  //   }
  // };

  // const getFcmToken = async () => {
  //   try {
  //     console.log("Start fetching FCM");

  //     // 1. Get the Messaging service instance
  //     //    If you are using the default Firebase App, you can call getMessaging() with no arguments.
  //     //    If using a secondary app instance, pass it to getMessaging(app).
  //     const messagingService = getMessaging();

  //     // 2. Use the imported getToken function on the service instance
  //     const token = await getToken(messagingService);

  //     if (token) {
  //       console.log("FCM Token:", token);
  //       // Optionally send token to backend
  //     }
  //   } catch (error) {
  //     console.log("Error fetching FCM token:", error);
  //   }
  // };

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
    console.log("======== Device Info =======");
    console.log("Info", deviceInfo);

    dispatch(setDeviceInfo(deviceInfo));
    await storeJsonValueAsync(STORE_KEY.DEVICE_INFO, deviceInfo);
    await addGoogleAnalytics("husm_device_Info", { info: deviceInfo });
  };

  const configureTPushNotification = () => {
    try {
      PushNotification.configure({
        onRegister: function (value) {
          console.log("onRegister:", value);
        },
        onNotification: function (value) {
          console.log("onNotification****", JSON.stringify(value));

          navigateFromRoute(userRole, value, "", dispatch);
          if (Platform.OS === PLATFORM_MOBILE.IOS) {
            value.finish(PushNotificationIOS.FetchResult.NoData);
          }
        },
        onAction: function (value) {
          console.log("onAction:", value);
        },
        onRegistrationError: function (value) {
          if (APP.SHOW_LOG) {
            console.log("onRegistrationError:", value);
          }
        },
        onRemoteFetch: function (value) {
          console.log("onRemoteFetch:", value);
        },
        // popInitialNotification: true,
        requestPermissions: true,
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
      });
    } catch (e) {
      console.log("configureTPushNotification: Error", e);
    }
  };

  const checkUpdate = async () => {
    await VersionCheck.needUpdate().then((res) => {
      console.log("Update app res******", res);
      if (res?.isNeeded == true) {
        setUpdateAvail(true);
      }
    });
  };

  if (!connected) {
    return <NoInternet />;
  }

  return (
    <NavigationContainer ref={globalNavigationRef}>
      {updateAvail == true ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          
          <Stack.Screen name={SCREEN.LoginScreen} component={LoginScreen} />
          <Stack.Screen name={SCREEN.SignupScreen} component={SignupScreen} />
          <Stack.Screen
            name={SCREEN.UserProfileScreen}
            component={UserProfileScreen}
          />
          <Stack.Screen
            name={SCREEN.SettingsController}
            component={SettingsController}
          />
          <Stack.Screen
            name={SCREEN.ChangeLanguageScreen}
            component={ChangeLanguageScreen}
          />
          <Stack.Screen
            name={SCREEN.DonationListViewScreen}
            component={DonationListController}
          />
          <Stack.Screen
            name={SCREEN.GenericFundManageScreen}
            component={GenericFundManageScreen}
          />
          <Stack.Screen
            name={SCREEN.GenericStatisticsScreen}
            component={GenericStatisticsScreen}
          />
          <Stack.Screen name={SCREEN.AddBannerView} component={AddBannerView} />
          <Stack.Screen
            name={SCREEN.AddMonthlyDonationScreen}
            component={AddMonthlyController}
          />
          <Stack.Screen
            name={SCREEN.SelectUserController}
            component={SelectUserController}
          />
          <Stack.Screen
            name={SCREEN.AddGeneralExpensesVC}
            component={AddGeneralExpensesVC}
          />
          <Stack.Screen name={SCREEN.ChartViewScreen} component={ChartScreen} />

          <Stack.Screen
            name={SCREEN.WebContentController}
            component={WebContentController}
          />
          <Stack.Screen
            name={SCREEN.CustomerOnboardingScreen}
            component={CustomerOnboardingScreen}
          />
          <Stack.Screen
            name={SCREEN.AdminDashboardScreen}
            component={AdminDashboardScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Route;
