import { View } from "react-native";
import React from "react";
import { BaseContainer } from "@/components/utilities";
import styles from "./styles";

import AppRegularText from "@/components/utilities/app-regular-text";
import { COLORS } from "@/theme";
import MainHeader from "@/components/utilities/header";
import { BackIconSvg } from "@/assets/svg";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";

export default function LoginScreen({ navigation }) {
  console.log("Show Home");

  return (
    <BaseContainer isTopSafeArea={false}>
      <MainHeader navigation={navigation} />
      <View style={styles.container}>
        <AppRegularText
          onPress={() => {
            navigation.navigate(SCREEN.WebContentController, {
              option: "Privacy Policy",
              uri: APP.PRIVACY_POLICY,
            });
          }}
          fontFamily="Light"
          size={20}
          color={COLORS.red_dark}
        >
          Login
        </AppRegularText>
      </View>
    </BaseContainer>
  );
}
