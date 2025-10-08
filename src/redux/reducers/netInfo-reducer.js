import {createSlice} from '@reduxjs/toolkit';

const netInfoReducer = createSlice({
  name: 'NET_INFO_SLICE',
  initialState: {
    isConnected: false,
    connectionType: 'NONE',
    deviceInfo: {},
  },
  reducers: {
    toggleNetState(state, action) {
      state.isConnected = action.payload;
    },
    setConnectionType(state, action) {
      state.connectionType = action.payload;
    },
    setConnectionType(state, action) {
      state.connectionType = action.payload;
    },
    setDeviceInfo(state, action) {
      state.deviceInfo = action.payload;
    },
  },
});

const {actions, reducer} = netInfoReducer;

export const {toggleNetState, setConnectionType,setDeviceInfo} = actions;

export default reducer;
