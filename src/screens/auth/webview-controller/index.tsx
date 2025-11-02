import { View } from "react-native";
import React, { useState } from "react";
import {WebView} from 'react-native-webview';
import { BaseContainer } from "@/components/utilities";

import { COLORS } from "@/theme";
import MainHeader from "@/components/utilities/header";
import { BackIconSvg } from "@/assets/svg";
import LocalizeText from "@/utils/text-localize";
import styles from "./styles";

export default function WebContentController({ navigation, route }) {
  const { headerTitle, general } = LocalizeText;
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
        LeftSVGIcon={BackIconSvg}
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
