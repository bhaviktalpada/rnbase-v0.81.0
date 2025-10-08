import {createSlice} from '@reduxjs/toolkit';

const colorThemeReducer = createSlice({
  name: 'colorThemeReducer',
  initialState: {
    colorScheme: 'light',
  },
  reducers: {
    setColorScheme(state, action) {
      state.colorScheme = action.payload;
    },
  },
});

const {actions, reducer} = colorThemeReducer;

export const {setColorScheme} = actions;

export default reducer;
