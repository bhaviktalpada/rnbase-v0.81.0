/**
 *
 * @format
 */

import React, { useEffect } from 'react';

import { StatusBar, StyleSheet } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, store } from '@/redux/store/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/utils';
import Route from '@/routes/routes';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  const barStyle = 'light-content';

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <StoreProvider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
          <StatusBar barStyle={barStyle} />
          <Route />
          
          <Toast config={toastConfig} />
        </PersistGate>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

export default App;
