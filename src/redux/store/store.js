import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERSIST, persistReducer, persistStore, REGISTER} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const whiteListedReducer = [
  'netInfoReducer',
  'userInfoReducer',
  'colorThemeReducer',
];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: whiteListedReducer,
};
const perReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: perReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REGISTER],
      },
      thunk: true,
    }),
});

// const store = createStore(perReducer, applyMiddleware(...middleWare))
const persistedStore = persistStore(store);

export {store, persistedStore};
