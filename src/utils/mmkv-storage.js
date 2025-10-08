import {MMKV} from 'react-native-mmkv';
import {show_log} from '../constants/logger';

const myMMkvStore = new MMKV();

const MMKV_KEY = {
  DEVICE_INFO: 'DEVICE_INFO',
  LOGIN_TOKEN: 'LOGIN_TOKEN',
  REMEMBER_ME: 'REMEMBER_ME',
  REMEMBERED_EMAIL: 'REMEMBERED_EMAIL',
  REMEMBERED_PASSWORD: 'REMEMBERED_PASSWORD',
};

function setValueToStore(key, value) {
  try {
    myMMkvStore.set(key, JSON.stringify(value));
  } catch (exception) {
    show_log('error storing value', exception);
  }
}
function getValueFromStore(key) {
  const keyAvailable = myMMkvStore.contains(key);
  if (keyAvailable === true) {
    try {
      return JSON.parse(myMMkvStore.getString(key));
    } catch (exception) {
      show_log('error getting value from store', exception);
    }
  } else {
    show_log('Please check Key Not Available');
  }
}
function clearAllStoredKeyValue() {
  try {
    myMMkvStore.clearAll();
  } catch (e) {
    show_log('error while clearing stored key', e);
  }
}
function deleteStoredKeyValue(key) {
  try {
    myMMkvStore.delete(key);
  } catch (e) {
    show_log('error while clearing stored key', e);
  }
}

export {
  MMKV_KEY,
  myMMkvStore,
  setValueToStore,
  getValueFromStore,
  clearAllStoredKeyValue,
  deleteStoredKeyValue,
};
