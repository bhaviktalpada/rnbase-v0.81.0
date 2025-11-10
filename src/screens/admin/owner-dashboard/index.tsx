import React, { useEffect, useState } from "react";
import { View } from "react-native";
//Hooks
import { useDispatch, useSelector } from "react-redux";
import mobileAds, {
  BannerAd,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";
import MainHeader from "@/components/utilities/header";

//Component
import { BaseContainer } from "@/components/utilities";
import AppScrollView from "@/components/app-scrollview";
import DashboardStatistics from "@/components/dashboard-statistics";
import LocalizeText from "@/utils/text-localize";

// Const
import styles from "./styles";
import { SCREEN } from "@/utils/screen-name";
import { bannerAdUnitId } from "@/utils/constants";
import { COLORS } from "@/theme";
import { screenWidth } from "@/utils/dimensions";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import { IMAGES, SVGFile } from "@/utils/images-path";
import { SvgAgiyaras } from "@/assets/svg/svg-agiyaras";
import { SvgCemetery } from "@/assets/svg/svg-cemetery";
import { SvgCows } from "@/assets/svg/svg-cows";
import { SvgMonthly } from "@/assets/svg/svg-monthly";
import { SvgStock } from "@/assets/svg/svg-stock";

export default function AdminDashboardScreen({ navigation }) {
  const { screenTitle, alerts, general } = LocalizeText;
  const dispatch = useDispatch();
  const userInfo = useSelector((v) => v.userInfoReducer.userInfo);
  const userRole = useSelector((v) => v.userInfoReducer.userRole);
  const [artistStatistics, setArtistStatistics] = useState([]);

  useEffect(() => {
    console.log("userInfo*****", userInfo);
    console.log("userRole*****", userRole);
  }, []);

  const handleNavigateToProfile = () => {
    navigation.navigate(SCREEN.SettingsController);
  };

  useEffect(() => {
    prepareData();
  }, []);

  function prepareData() {
    let statsData = [];
    let bannerMangeOption1 = {
      icon: SVGFile.svgBanner,
      bgColor: COLORS.colorGreen,
      title: "",
      subTitle: general.manageBanner,
    };

    let monthlyManageOption3 = {
      icon: SVGFile.svgMonthly,
      bgColor: COLORS.colorGreen,
      title: "",
      subTitle: general.manageMonthly,
    };
    let monthlyManageOption4 = {
      icon: SVGFile.svgCows,
      bgColor: COLORS.colorGreen,
      title: "",
      subTitle: general.manageGausala,
    };
    let optionData4 = {
      id: general.op3SmasanExpanses,
      icon: SVGFile.svgCemetery,
      bgColor: COLORS.colorGreen,
      title: "",
      subTitle: general.op3SmasanExpanses,
    };
    let optionData5 = {
      id: general.op5AgiyarasExpanses,
      icon: SVGFile.svgAgiyaras,
      bgColor: COLORS.colorGreen,
      title: "",
      subTitle: general.op5AgiyarasExpanses,
    };
    statsData.push(bannerMangeOption1);
    statsData.push(monthlyManageOption3);
    statsData.push(monthlyManageOption4);
    statsData.push(optionData4);
    //statsData.push(optionData5);

    setArtistStatistics(statsData);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.ownerDashboard}
        onPressProfile={handleNavigateToProfile}
        profileSource={IMAGES.ic_settings}
        navigation={navigation}
      />
      <AppScrollView>
        <View style={styles.mainContainer}>
          {artistStatistics?.map((stats, idx) => {
            return (
              <DashboardStatistics
                key={idx}
                icon={stats.icon}
                iconBGColor={stats.bgColor}
                totalInfo={stats.title}
                info={stats.subTitle}
                onPressHandler={() => {
                  console.log("stats.subTitle", stats.subTitle);
                  if (stats.subTitle === general.manageBanner) {
                    //1. Banner Management
                    navigation.navigate(SCREEN.AddBannerView);
                  } else if (stats.subTitle === general.manageMonthly) {
                    //2. Monthly donation management
                    navigation.navigate(SCREEN.GenericFundManageScreen, {
                      type: 1,
                      isAdmin: true,
                    });
                  } else if (stats.subTitle === general.manageGausala) {
                    //3. Gauslala Donation management
                    navigation.navigate(SCREEN.GenericFundManageScreen, {
                      type: 2,
                      isAdmin: true,
                    });
                  } else if (stats.subTitle === general.op3SmasanExpanses) {
                    // Smashan Fund Manage 
                    navigation.navigate(SCREEN.GenericFundManageScreen, {
                      type: 3,
                    });
                  }
                  
                  else if (stats.subTitle === general.manageUsers) {
                    // 
                    navigation.navigate(SCREEN.GenericFundManageScreen, {
                      type: 1,
                    });
                  }   else if (stats.subTitle == general.op5AgiyarasExpanses) {
                    // Agiyaras donation manage
                    ShowToast(toastTypes.error, alerts.comingSoon);
                  }
                }}
              />
            );
          })}
        </View>
      </AppScrollView>
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
