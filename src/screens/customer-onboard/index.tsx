import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import mobileAds, {
  BannerAd,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";
import { bannerAdUnitId } from "@/utils/constants";
import LocalizeText from "@/utils/text-localize";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import { IMAGES } from "@/utils/images-path";
import styles from "./styles";
import { SCREEN } from "@/utils/screen-name";
import { addGoogleAnalytics } from "@/utils/helper-function";
import { COLORS } from "@/theme";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import { screenWidth } from "@/utils/dimensions";
import { getAllBanners } from "@/utils/firebase-db-helper";
import { SvgCemetery } from "@/assets/svg/svg-cemetery";
import { SvgCows } from "@/assets/svg/svg-cows";
import { SvgAgiyaras } from "@/assets/svg/svg-agiyaras";
import { SvgMonthly } from "@/assets/svg/svg-monthly";
import AppScreenLoader from "@/components/screen-loader/screen-loader";
import DashboardStatistics from "@/components/dashboard-statistics";

// import {
//   ImgCemeteryManage,
//   ImgAGiyaras,
//   ImgCowsManage,
//   ImgMonthlyManage,
// } from "../../utils/svg-img-path";


export default function CustomerOnboardingScreen({ navigation }) {
  const { screenTitle, general, alerts } = LocalizeText;

  const [countLoading, setCountLoading] = useState(false);
  const [artistStatistics, setArtistStatistics] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // initializedAdMob()
    configureOnboarding();
  }, []);

  function initializedAdMob() {
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log("AdMob initialized", adapterStatuses);
      });
  }

  function configureOnboarding() {
    getAllBanners(onResponse);

    setCountLoading(false);

    let statsData = [];
    let optionData1 = {
      id: general.op1MonthlyExpanse,
      icon: SvgMonthly,
      bgColor: COLORS.colorBlue,
      title: general.op1MonthlyExpanse,
      subTitle: "",
    };
    let optionData2 = {
      id: screenTitle.gausalaExpanses,
      icon: SvgCows,
      bgColor: COLORS.colorBlue,
      title: general.op2GausalaExpanses,
      subTitle: "",
    };
    let optionData3 = {
      id: general.op3SmasanExpanses,
      icon: SvgCemetery,
      bgColor: COLORS.colorBlue,
      title: general.op3SmasanExpanses,
      subTitle: "",
    };
    let optionData4 = {
      id: general.op5AgiyarasExpanses,
      icon: SvgAgiyaras,
      bgColor: COLORS.colorBlue,
      title: general.op5AgiyarasExpanses,
      subTitle: "",
    };

    statsData.push(optionData1);
    statsData.push(optionData2);
    statsData.push(optionData3);
    statsData.push(optionData4);
    setArtistStatistics(statsData);

    addGoogleAnalytics("ga_customer_dashboard", { info: statsData });
  }

  function onResponse(banners) {
    console.log("on all Banner", banners);
    setPhotos(banners.reverse());
  }

  const handleNavigateToProfile = async () => {
    navigation.navigate(SCREEN.SettingsController);
  };

  const renderItemDataList = ({ item, index }) => {
    const stats = item;

    return (
      <DashboardStatistics
        key={index}
        icon={stats.icon}
        isLoading={countLoading}
        iconBGColor={stats.bgColor}
        totalInfo={stats.title}
        info={stats.subTitle}
        iconColor={COLORS.white}
        titleFontSize={14}
        onPressHandler={() => {
          addGoogleAnalytics("ga_home_action", { click: stats });
          if (stats.title === general.op1MonthlyExpanse) {
            // Monthly Donation mange
            navigation.navigate(SCREEN.GenericFundManageScreen, { type: 1 });
          } else if (stats.title === general.op2GausalaExpanses) {
            // Gaushala Manage
            navigation.navigate(SCREEN.GenericFundManageScreen, { type: 2 });
          } else if (stats.title == general.op3SmasanExpanses) {
            // Smashan donation manage
            navigation.navigate(SCREEN.GenericFundManageScreen, { type: 3 });
          } else if (stats.title == general.op5AgiyarasExpanses) {
            // Agiyaras donation manage
            ShowToast(toastTypes.error, alerts.comingSoon);
          }
        }}
      />
    );
  };

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.welcome}
        onPressProfile={handleNavigateToProfile}
        profileSource={IMAGES.ic_settings}
        navigation={navigation}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.swiperContainer}>
          {photos?.length > 0 ? (
            <Swiper showsButtons={false}>
              {photos?.map((item, index) => {
                const source = { uri: item?.bannerUrl };
                return (
                  <FastImage
                    defaultSource={IMAGES.ic_user_avatar}
                    key={index}
                    style={styles.imageSwiper}
                    source={source}
                  />
                );
              })}
            </Swiper>
          ) : (
            <FastImage
              style={styles.imageSwiper}
              source={IMAGES.ic_user_avatar}
            />
          )}
        </View>
         <View style={styles.mainContainer}>
          {countLoading ? (
            <AppScreenLoader />
          ) : (
            <FlatList
              key={(_, index) => String(index)}
              keyExtractor={(_, index) => String(index)}
              data={artistStatistics}
              renderItem={renderItemDataList}
            />
          )}
        </View> 
      </View>
      <View style={{ width: screenWidth }}>
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          onAdFailedToLoad={(error) => {
            console.log("Ad failed to load:", error);
          }}
          onAdLoaded={() => {
            console.log("Ad loaded successfully");
          }}
        />
      </View>
    </BaseContainer>
  );
}
