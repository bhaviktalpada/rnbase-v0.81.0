import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_KEY = {
  FCM_TOKEN: 'STORE_FCM_TOKEN',
  DEVICE_INFO: 'STORE_DEVICE_INFO',
  LOGIN_TOKEN: 'STORE_LOGIN_TOKEN',
  REFRESH_TOKEN: 'STORE_REFRESH_TOKEN',
};

async function asyncStorageSave(key, value) {
  try {
    var saveData = await AsyncStorage.setItem(key, value);
    return saveData;
  } catch (e) {
    return e;
  }
}

async function asyncStorageGet(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return e;
  }
}

async function asyncStorageRemove(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

async function storeJsonValueAsync(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    var data = await AsyncStorage.setItem(key, jsonValue);
    return data;
  } catch (e) {
    // saving error
    return e;
  }
}

async function readJsonValueAsync(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return e;
  }
}

export {
  asyncStorageGet,
  asyncStorageRemove,
  asyncStorageSave,
  storeJsonValueAsync,
  readJsonValueAsync,
  STORE_KEY,
};
