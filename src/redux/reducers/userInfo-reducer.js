import { createSlice } from "@reduxjs/toolkit";

const userInfoReducer = createSlice({
  name: "userInfoReducer",
  initialState: {
    userInfo: null, // User Info
    userToken: null, // User Token
    userRefreshToken: null, // User Refresh Token
    fcmToken: null, // Fcm Token
    isUserLogin: false, // Is User Login
    notificationCount: null, // Notification Count
    userRole: null, // User Role
    loginToken: null, // Login Token
    masterData: null, // Master data
    appUsersData: null,
  },
  reducers: {
    // User Info
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    // User Token
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
    // User Refresh Token
    setUserRefreshToken(state, action) {
      state.userRefreshToken = action.payload;
    },
    // Fcm Token
    setFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
    // Is User Login
    setIsUserLogIn(state, action) {
      state.isUserLogin = action.payload;
    },
    // Notification Count
    setNotificationCount(state, action) {
      state.notificationCount = action.payload;
    }, 
    // User Role
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    // Login Token
    setLoginToken(state, action) {
      state.loginToken = action.payload;
    },
    // Master data
    setMasterData(state, action) {
      state.masterData = action.payload;
    },
    setAppUserData: (state, action) => {
      state.appUsersData = action.payload;
    },
    setUserLogout: (state, action) => {
      state.appUsersData = null;
      state.loginToken = null;
      state.userRole = null;
      state.notificationCount = null;
      state.isUserLogin = false;
      state.userToken = null;
      state.userInfo = null;
    },
  },
});

const { actions, reducer } = userInfoReducer;

export const {
  setUserInfo,
  setUserToken,
  setUserRefreshToken,
  setFcmToken,
  setIsUserLogIn,
  setNotificationCount,
  setUserRole,
  setLoginToken,
  setMasterData,
  setAppUserData,
  setUserLogout
} = actions;

export default reducer;
