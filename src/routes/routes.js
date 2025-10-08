import { Appearance, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { globalNavigationRef } from '../utils/helper-navigation';
import { SCREEN } from '../constants/screen-name';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { show_log } from '../constants/logger';
import DeviceInfo from 'react-native-device-info';

import {
  setConnectionType,
  setDeviceInfo,
  toggleNetState,
} from '../redux/reducers/netInfo-reducer';

import { setColorScheme } from '../redux/reducers/color-theme-reducer';
import { LandingScreen } from '@/screens/general';
import BottomTab from './navigation-bottom-tab/bottom-tab';
import { NoInternet } from '@/components/utilities';

const Route = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isUserLogIn = useSelector(v => v?.userInfoReducer?.isUserLogin);
  const [connected, setConnected] = useState(true);
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    setColorToStore();

    const NetInfoSubscriber = NetInfo.addEventListener(state => {
      var netLog = state.isConnected
        ? `Routes.js => Device is online & connected with ${state.type.toUpperCase()}`
        : `Routes.js => Device is offline & connected with ${state.type.toUpperCase()}`;

      show_log('netLog', netLog);

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
      },
    );

    return () => {
      NetInfoSubscriber(); // cleanup network listener
      colorSchemeListener.remove(); // cleanup appearance listener
    };
  }, []);

  function setColorToStore() {
    dispatch(setColorScheme(colorScheme));
  }

  const deviceInformation = async () => {
    var systemVersion = DeviceInfo.getSystemVersion();
    var deviceType = Platform.OS == 'android' ? 'Android' : 'iOS';
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

  return (
    <NavigationContainer ref={globalNavigationRef}>
      <Stack.Navigator
        initialRouteName={SCREEN.bottomTab}
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name={SCREEN.landingScreen} component={LandingScreen} />
        <Stack.Screen name={SCREEN.bottomTab} component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
