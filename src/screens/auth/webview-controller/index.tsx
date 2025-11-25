import { View } from "react-native";
import React, { useState } from "react";
import {WebView} from 'react-native-webview';
import { BaseContainer } from "@utilities";

import { COLORS } from "@/theme";
import MainHeader from "@utilities/header";

export default function WebContentController({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const { uri = null } = route.params;

  useState(() => {
    console.log("route.params.option", route.params.option);
  }, []);

  return (
    <BaseContainer isTopSafeArea={false}>
      <MainHeader
        leftTitle={
          route.params.option ? route.params.option : 'Web Container'
        }
        navigation={navigation}
        showLeftIcon
      />
      <View style={{flex: 1, backgroundColor: COLORS.transparent}}>
        {uri ? (
          <WebView
            onLoadEnd={() => {
              console.log('on Loading done');
              setLoading(false);
            }}
            style={{flex: 1}}
            source={{uri: uri}}
            sharedCookiesEnabled={false}
          />
        ) : null}
        
      </View>
    </BaseContainer>
  );
}
