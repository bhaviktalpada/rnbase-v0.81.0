import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";
import { COLORS } from "@/theme";
import { normalizeText } from "@/utils";
import LocalizeText from "@/utils/text-localize";
import AppRegularText from "../utilities/app-regular-text";
import AppMediumText from "../utilities/app-medium-text";

const CheckBox = ({ children, style, source, onPress }) => {
  const navigation = useNavigation();
  const { labels, settingsOptions } = LocalizeText;
  function onPressTandC() {
    navigation.navigate(SCREEN.WebContentController, {
      uri: APP.TERMS_CONDITION,
      option: settingsOptions.termsConditions,
    });
  }
  function onPressPrivacyPolicy() {
    navigation.navigate(SCREEN.WebContentController, {
      uri: APP.PRIVACY_POLICY,
      option: settingsOptions.privacyPolicy,
    });
  }
  return (
    <View style={styles.mainContainer}>
      <AppRegularText extraTextStyle={styles.regularText}>
        {`${labels.iAcceptThe} `}

        <AppMediumText
          onPress={onPressTandC}
          extraTextStyle={styles.mediumText}
        >
          {`${labels.terms} `}
        </AppMediumText>

        {`${labels.and}`}

        <AppMediumText
          onPress={onPressPrivacyPolicy}
          extraTextStyle={styles.mediumText}
        >{` ${settingsOptions.privacyPolicy}`}</AppMediumText>
      </AppRegularText>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  mainContainer: {
    width: "98%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: scale(12),
  },
  regularText: {
    fontSize: normalizeText(14),
    color: COLORS.black,
    maxWidth: "95%",
    textAlign: "center",
  },

  mediumText: {
    fontSize: normalizeText(14),
    color: COLORS.primary,
  },

  iconStyle: {
    height: scale(15),
    width: scale(15),
    marginRight: scale(5),
    marginTop: scale(1),
  },
});
