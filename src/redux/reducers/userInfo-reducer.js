import {createSlice} from '@reduxjs/toolkit';

const userInfoReducer = createSlice({
  name: 'userInfoReducer',
  initialState: {
    userInfo: null,
    userToken: null,
    userRefreshToken: null,
    fcmToken: null,
    isUserLogin: false,
    notificationCount: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
    setUserRefreshToken(state, action) {
      state.userRefreshToken = action.payload;
    },
    setFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
    setIsUserLogIn(state, action) {
      state.isUserLogin = action.payload;
    },
    setNotificationCount(state, action) {
      state.notificationCount = action.payload;
    },
  },
});

const {actions, reducer} = userInfoReducer;

export const {
  setUserInfo,
  setUserToken,
  setUserRefreshToken,
  setFcmToken,
  setIsUserLogIn,
  setNotificationCount,
} = actions;

export default reducer;
