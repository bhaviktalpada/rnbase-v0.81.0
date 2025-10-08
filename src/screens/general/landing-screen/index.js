import {ActivityIndicator, SafeAreaView, StatusBar, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import DeviceInfo from 'react-native-device-info';
import {useSelector} from 'react-redux';

const LandingScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);

  const isTablet = DeviceInfo.isTablet();
  const isUserLogIn = useSelector(v => v?.userInfoReducer?.isUserLogin);
  const userInfo = useSelector(i => i?.userInfoReducer?.userInfo);

  useEffect(() => {
    // checkUpdate();
  }, []);

  // const checkUpdate = async () => {
  //   const version = await checkVersion({country: 'CA'});

  //   if (version?.needsUpdate) {
  //     navigateTo(SCREEN.forceUpdateScreen);
  //   } else if (
  //     userInfo?.role?.slug === ROLES.superAdmin ||
  //     userInfo?.role?.slug === ROLES.guest
  //   ) {
  //     navigateTo(SCREEN.planExpiredScreen);
  //   } else if (userInfo !== null && isPlanExpired(planEndDate)) {
  //     navigateTo(SCREEN.planExpiredScreen);
  //   } else {
  //     checkLandingFlow();
  //   }
  // };

  // function checkLandingFlow() {
  //   if (isUserLogIn) {
  //     setTimeout(() => {
  //       navigateTo(SCREEN.drawerTab);
  //     }, 1500);
  //   } else {
  //     setTimeout(() => {
  //       navigateTo(SCREEN.loginScreen);
  //     }, 1500);
  //   }
  // }

  if (loading == true) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'red'} />

        <ActivityIndicator size="large" color={'red'} />
      </SafeAreaView>
    );
  }
  return null;
};

export default LandingScreen;
