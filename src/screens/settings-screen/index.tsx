import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import { getAuth } from "@react-native-firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import AppRegularText from "@/components/utilities/app-regular-text";
import LogoutCustomModel from "@/components/logout-dialog";
import { COLORS } from "@/theme";
import LocalizeText from "@/utils/text-localize";
import { APP } from "@/utils/constants";
import { SCREEN } from "@/utils/screen-name";
import { updateUserDetail } from "@/utils/firebase-db-helper";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import * as types from "@redux/actions/action-list";
import { setIsUserLogIn, setUserLogout } from "@/redux/reducers/userInfo-reducer";
import { addGoogleAnalytics } from "@/utils/helper-function";
import { SVGFile } from "@/utils/images-path";
import ImgSVG from "@/utils/image-svg";
import { scale } from "react-native-size-matters";

// import VectorIcon, {
//   ICON_NAME,
//   VICON_TYPE,
// } from "../../components/custom-vector-icon";

export default function SettingsController({ navigation, route }) {
  const { screenTitle, settingsOptions, general, auth, alerts } = LocalizeText;
  const userInfo = useSelector((v) => v.userInfoReducer.userInfo);
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const dispatch = useDispatch();
  const [SETTING_OPTIONS, setSettingsOption] = useState([]);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setSettingsOption([
        {
          label: screenTitle.profileTitle,
          id: 1,
          icon: SVGFile.svgSettingProfile,
        },
        { label: general.changeLanguage, id: 2, icon: SVGFile.svgSettingCL },
        { label: general.aboutUs, id: 3, icon: SVGFile.svgSettingAbout },
        { label: general.contactUs, id: 4, icon: SVGFile.svgSettingContact },
        {
          label: settingsOptions.termsConditions,
          id: 5,
          icon: SVGFile.svgSettingPrivacy,
        },
        {
          label: settingsOptions.privacyPolicy,
          id: 6,
          icon: SVGFile.svgSettingPrivacy,
        },
        { label: general.logout, id: 7, icon: SVGFile.svgLogout },
        { label: auth.deleteAccount, id: 8, icon: SVGFile.svgSettingDelete },
      ]);
    } else {
      setSettingsOption([
        { label: general.changeLanguage, id: 2, icon: SVGFile.svgSettingCL },
        { label: general.aboutUs, id: 3, icon: SVGFile.svgSettingAbout },
        { label: general.contactUs, id: 4, icon: SVGFile.svgSettingContact },
        {
          label: settingsOptions.termsConditions,
          id: 5,
          icon: SVGFile.svgSettingPrivacy,
        },
        {
          label: settingsOptions.privacyPolicy,
          id: 6,
          icon: SVGFile.svgSettingPrivacy,
        },
        { label: auth.signIn, id: 9, icon: SVGFile.svgLogout },
      ]);
    }
  }, []);

  const handleSelectOption = (item) => {
    if (item.id == 1) {
      // Profile
      navigation.navigate(SCREEN.UserProfileScreen);
    } else if (item.id == 2) {
      // Change Language
      navigation.navigate(SCREEN.ChangeLanguageScreen);
    } else if (item.id == 3) {
      // About Us
      navigation.navigate(SCREEN.WebContentController, {
        uri: APP.ABOUT_US_LINK,
        option: general.aboutUs,
      });
    } else if (item.id == 4) {
      // Contact Us
      navigation.navigate(SCREEN.WebContentController, {
        uri: APP.CONTACT_US_LINK,
        option: general.contactUs,
      });
    } else if (item.id == 5) {
      // Terms & Conditions
      navigation.navigate(SCREEN.WebContentController, {
        uri: APP.TERMS_CONDITION,
        option: settingsOptions.termsConditions,
      });
    } else if (item.id == 6) {
      // Privacy Policy
      navigation.navigate(SCREEN.WebContentController, {
        uri: APP.PRIVACY_POLICY,
        option: settingsOptions.privacyPolicy,
      });
    } else if (item.id == 7) {
      // Logout
      setIsLogoutVisible(true);
    } else if (item.id == 8) {
      // Delete Account
      setIsDeleteVisible(true);
    } else if (item.id == 9) {
      // Login
      onClickLogout();
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleSelectOption(item)}
      style={[styles.option(item)]}
    >
      <View style={styles.sideImageContainer(item)}>
        <ImgSVG
          src={item.icon}
          size={scale(24)}
          color={COLORS.white}
        /> 
      </View>

      <Text style={[styles.optionText(item)]}>{item.label}</Text>
    </TouchableOpacity>
  );

  const onClickLogout = () => {
    setIsLogoutVisible(false);
    dispatch(setIsUserLogIn(true));

    dispatch(setUserLogout(true));
    
    navigation.navigate(SCREEN.LoginScreen);
  };

  const onDeleteUserAccount = async () => {
    if (netConnected) {
      console.log("Deleted User:", profileInfo.uid);
      const info = {
        isDeleted: true, // or any other field you want to update
      };
      updateUserDetail(profileInfo.uid, info, (status, snap) => {
        console.log("Update status:", status);
        console.log("Updated snapshot:", snap);

        deleteFirebaseUser();
        setIsDeleteVisible(false);
      });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  };

  async function deleteFirebaseUser() {
    const user = getAuth().currentUser;

    if (user) {
      try {
        await user.delete();
        console.log("User deleted successfully");

        setIsDeleteVisible(false);
        dispatch(setIsUserLogIn(false));
        dispatch({ type: types.CLEAR_DATA });
        navigation.navigate(SCREEN.LoginScreen);

        addGoogleAnalytics("ga_delete_action", {});
      } catch (error) {
        console.error("Failed to delete user:", error);

        // If recent login is required
        if (error.code === "auth/requires-recent-login") {
          // Ask user to re-authenticate and try again
          console.warn("User needs to re-authenticate before deletion.");
        }
      }
    } else {
      console.warn("No user is signed in");
    }
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.settings}
        showLeftIcon
        navigation={navigation}
      />

      <FlatList
        data={SETTING_OPTIONS}
        keyExtractor={(_, index) => index}
        renderItem={renderItem}
        style={styles.list}
      />

      <View style={styles.version_container}>
        <AppRegularText style={styles.version_view_style}>
          {`v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
        </AppRegularText>
      </View>

      <LogoutCustomModel
        isVisible={isLogoutVisible}
        handleBackDropPress={() => setIsLogoutVisible(false)}
        handleBackButtonPress={() => setIsLogoutVisible(false)}
        iconName={SVGFile.svgLogout}
        title={general.logout}
        subTitle={general.confirmLogout}
        firstButtonTitle={general.logout}
        secondButtonTitle={general.cancel}
        firstButtonBGColor={COLORS.colorRed}
        secondButtonBGColor={COLORS.white}
        onPressFirstButton={onClickLogout}
        onPressSecondButton={() => setIsLogoutVisible(!isLogoutVisible)}
      />
      <LogoutCustomModel
        isVisible={isDeleteVisible}
        handleBackDropPress={() => setIsDeleteVisible(false)}
        handleBackButtonPress={() => setIsDeleteVisible(false)}
        iconName={SVGFile.svgLogout}
        title={general.confirm}
        subTitle={general.confirmDelete}
        firstButtonTitle={general.delete}
        secondButtonTitle={general.cancel}
        firstButtonBGColor={COLORS.colorRed}
        secondButtonBGColor={COLORS.white}
        onPressFirstButton={onDeleteUserAccount}
        onPressSecondButton={() => setIsDeleteVisible(!isDeleteVisible)}
      />
    </BaseContainer>
  );
}
