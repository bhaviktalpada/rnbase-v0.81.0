import {
  View,
  ImageBackground,
  Platform,
  Linking,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import DeviceInfo from "react-native-device-info";
import { scale } from "react-native-size-matters";
import VersionCheck from "react-native-version-check";

// Components
import LogoContainer from "@/components/logo-component/logo-component";
import AppRegularText from "@/components/utilities/app-regular-text";
import AppCustomButton from "@/components/app-custom-button";
import WhiteCard from "@/components/white-card/white-card";
import { BaseContainer } from "@/components/utilities";
import TitleContent from "@components/title-subtitle";
import AppScrollView from "@/components/app-scrollview";
// Utils
import LocalizeText from "@utils/text-localize"
import { IMAGES } from "@/utils/images-path";
import {APP} from '@utils/constants';
import { COLORS } from "@/theme";
import { styles } from "./styles";

const ForceUpdateScreen = () => {
  const { button, general } = LocalizeText;
  
  const [latestVersion, setLatestVersion] = useState(0);
  const androidUrl = `market://details?id=com.hinduutsavsamiti`;
  const iosUrl = "https://apps.apple.com/us/app/husm/id6740768429";

  useEffect(() => {
    VersionCheck.getLatestVersion({
      provider: Platform.OS == "android" ? "playStore" : "appStore",
    }).then((latestVersion) => {
      setLatestVersion(latestVersion);
    });
  }, []);

  function onPressUpdate() {
    Linking.openURL(Platform.OS == "ios" ? iosUrl : androidUrl);
  }
  function onPressCancel() {
    BackHandler.exitApp();
  }
  return (
    <BaseContainer isTopSafeArea={false}>
      <ImageBackground
        source={IMAGES.img_container}
        style={styles.imgContainerStyle}
        resizeMode="stretch"
      />
      <AppScrollView >
        <View style={styles.innerContainer}>
          <LogoContainer
            source={IMAGES.app_logo}
            style={styles.logoContainer}
          />
          <WhiteCard>
            <TitleContent
              Title={button.update}
              subTitle={`${general.available} v${latestVersion}`}
            />
            <AppRegularText style={styles.labelStyle(14, COLORS.black)}>
              {general.PleaseUpdate}
            </AppRegularText>
            <AppRegularText
              numberOfLines={2}
              style={[
                styles.labelStyle(14, COLORS.black),
                { marginTop: scale(10) },
              ]}
            >
              {`Your current version is v${DeviceInfo.getVersion()}`}
            </AppRegularText>
            <AppRegularText
              style={[
                styles.labelStyle(14, COLORS.black),
                { marginTop: scale(10) },
              ]}
            >
              {`Thank you`}
            </AppRegularText>
            <View style={styles.flexRowContainer}>
              {Platform.OS == "android" && (
                <AppCustomButton
                  title={button.cancel}
                  fontSize={12}
                  borderWidth={APP.BORDER_WIDTH}
                  borderColor={COLORS.colorDarkGray7A}
                  bgColor={COLORS.colorGray6C}
                  onPress={onPressCancel}
                  textStyle={{ color: COLORS.white }}
                  mainContainerStyle={{ width: "48%" }}
                />
              )}

              <AppCustomButton
                title={button.update}
                mainContainerStyle={{ width: "48%" }}
                bgColor={COLORS.colorYellowE1}
                onPress={onPressUpdate}
              />
            </View>
          </WhiteCard>
        </View>
      </AppScrollView>
    </BaseContainer>
  );
};

export default ForceUpdateScreen;
