import {combineReducers} from 'redux';
import netInfoReducer from './netInfo-reducer';
import userInfoReducer from './userInfo-reducer';
import colorThemeReducer from './color-theme-reducer';

const rootReducer = combineReducers({
  netInfoReducer,
  userInfoReducer,
  colorThemeReducer
});

// Exports
export default rootReducer;
