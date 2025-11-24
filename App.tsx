/**
 *
 * @format
 */

import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore, store } from "@/redux/store/store";
import Toast from "react-native-toast-message";
import BootSplash from "react-native-bootsplash";

import { STATUSBAR_TYPE } from "@/utils/app-enum";
import LanguageHelper from "@/utils/LanguageHelper";
import LocalizeText from "@/utils/text-localize";
import { toastConfig } from "@/utils";
import { COLORS } from "@/theme";
import Route from "@/navigation";

function App(): React.JSX.Element {
  const barStyle = "light-content";

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("BootSplash has been hidden successfully");

      console.log("***Start Language initializing***");
      let lang = await LanguageHelper.getCurrentLanguage();
      console.log("*** App Language", lang);
      LocalizeText.setLanguage(lang);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <PersistGate persistor={persistedStore} loading={null}>
          <StatusBar
            translucent={true}
            barStyle={STATUSBAR_TYPE.DARK}
            backgroundColor={COLORS.colorTransparent}
          />
          <View style={styles.mainContainer}>
            <MenuProvider>
              <Route />
            </MenuProvider>
            <Toast config={toastConfig} />
          </View>
        </PersistGate>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

export default App;
