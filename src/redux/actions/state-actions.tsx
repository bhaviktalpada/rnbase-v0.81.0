import * as types from './action-list';

export const setUserProfileInfo = userProfileData => ({
  type: types.USER_PROFILE_INFO,
  data: userProfileData,
})

// For set the application orientation e.g. portrait or landscape
export const setDeviceOrientation = deviceOrientation => ({
  type: types.SET_DEVICE_ORIENTATION,
  deviceOrientation,
});

// For set the application state e.g. foreground and background
export const setAppState = appState => ({
  type: types.SET_APP_STATE,
  appState,
});

//For set the deviceInformation e.g. deviceName,deviceType,deviceVersion,appVersion
export const setDeviceInfo = deviceInfo => ({
  type: types.DEVICE_INFO,
  data: deviceInfo,
});

export const refreshScreen = data => ({
  type: types.REFRESH_SCREEN_BY_NOTIFICATION,
  data: data,
});
