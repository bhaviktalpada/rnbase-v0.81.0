import React, { useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { useSelector } from "react-redux";
import { scale } from "react-native-size-matters";

// Components
import AppScreenLoader from "@/components/screen-loader/screen-loader";
import DashboardStatistics from "@/components/dashboard-statistics";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import AppScrollView from "@/components/app-scrollview";

// Utils
import { addGoogleAnalytics, formatToINR } from "@/utils/helper-function";
import { APP, bannerAdUnitId } from "@/utils/constants";
import { getRequest, TRAIL_URLS } from "@/api-services";
import LanguageHelper from "@/utils/LanguageHelper";
import { screenWidth } from "@/utils/dimensions";
import LocalizeText from "@/utils/text-localize";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import { SVGFile } from "@/utils/images-path";
import { SCREEN } from "@/utils/screen-name";
import { COLORS } from "@/theme";

export default function GenericFundManageScreen({ navigation, route }) {
  const { screenTitle, general, alerts, auth } = LocalizeText;
  const netConnected = useSelector((v) => v?.netInfoReducer.isConnected);
  const [isPullLoading, setPullLoading] = useState(false);
  const [allSheetData, setAllSheetData] = useState([]);
  const [artistStatistics, setArtistStatistics] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("");

  const fundType = route.params.type;
  const isAdmin = route.params.isAdmin;

  useEffect(() => {
    LanguageHelper.getCurrentLanguage().then((lang) => {
      setCurrentLanguage(lang);
    });
  }, []);

  useEffect(() => {
    if (currentLanguage.length != 0) {
      getDashboardData();
    }
  }, [currentLanguage]);

  function configureOnboarding(data) {
    let statsData = [];

    data.forEach((item, idx) => {
      //console.log(item.title + '1: ' + item.subtitle);

      let strCurrency = formatToINR(`${item.subtitle}`);
      let titleObj = item.title;
      const key = `title_${currentLanguage}`;
      if (currentLanguage != "en") {
        titleObj = item[key];
      }

      let shipData = {
        icon: idx == 0 ? SVGFile.svgDonation : SVGFile.svgCost,
        bgColor: COLORS.colorBlue,
        title: `${strCurrency}`,
        subTitle: titleObj,
      };
      statsData.push(shipData);
    });
    let stateData1 = {
      icon: SVGFile.svgStatistics,
      bgColor: COLORS.colorBlue,
      title: general.statistics,
      subTitle: "",
    };
    statsData.push(stateData1);
    if (isAdmin == true) {
      // Login as Admin
      if (fundType == 1) {
        // Monthly option list
        let adminOption2 = {
          icon: SVGFile.svgAddList,
          bgColor: COLORS.colorBlue,
          title: general.addMonthlyExpenses,
          subTitle: "",
        };
        statsData.push(adminOption2);
      } else {
        // Gaushala option list
        let adminOption2 = {
          icon: SVGFile.svgAddList,
          bgColor: COLORS.colorBlue,
          title: general.addGausalaExpenses,
          subTitle: "",
        };
        statsData.push(adminOption2);
      }
    }

    if (fundType == 2) {
      // Gausala Vastu dan list
      let adminOption3 = {
        icon: SVGFile.svgFodder,
        bgColor: COLORS.colorBlue,
        title: general.gausalaCharaDonation,
        subTitle: "",
      };
      statsData.push(adminOption3);
    }

    setArtistStatistics(statsData);
  }

  function getDashboardData() {
    if (netConnected) {
      const sheetId = APP.SHEET_ID;
      const sheetRange = "A25:B";
      const readType = "COLUMN";

      // Monthly Summery
      let api = `${TRAIL_URLS.entriesSummery}`;
      let sheetTab = "Summery";
      if (fundType == 2) {
        // Gausala summery
        api = `${TRAIL_URLS.genericSummery}?table1=gausala_funds&table2=gausala_expenses`;
        sheetTab = "Summery2";
      } else if (fundType == 3) {
        // Smashan
        api = `${TRAIL_URLS.genericSummery}?table1=smashan_funds&table2=smashan_expenses`;
      }

      setLoading(true);
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log("Get api data ==>3", JSON.stringify(response));
          }
          if (response?.success == true) {
            const resData = response?.data || [];
            setAllSheetData(resData);
            console.log("resData.length count===>", resData.length);
            if (resData.length != 0) {
              configureOnboarding(resData);
            }
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log("Error", e);
          configureOnboarding(0);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
      configureOnboarding(0);
    }
  }

  

  const headerTitle = () => {
    switch (fundType) {
      case 1:
        return screenTitle.monthlyExpansesManage;
        break;
      case 2:
        return screenTitle.gausalaExpansesManage;
        break;
      case 3:
        return general.op3SmasanExpanses;
        break;
      default:
        break;
    }
    return "";
  };

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        showLeftIcon
        leftTitle={headerTitle()}
        navigation={navigation}
      />
      <AppScrollView
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isPullLoading}
            onRefresh={getDashboardData}
          />
        }
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: scale(15),
            marginVertical: scale(15),
          }}
        >
          {isLoading ? (
            <AppScreenLoader />
          ) : (
            artistStatistics?.map((stats, idx) => {
              return (
                <DashboardStatistics
                  key={idx}
                  icon={stats.icon}
                  isLoading={isLoading}
                  iconBGColor={stats.bgColor}
                  totalInfo={stats.title}
                  info={stats.subTitle}
                  iconColor={COLORS.white}
                  onPressHandler={() => {
                    let sTitle = "";
                    let tableName = "";

                    if (idx == 0) {
                      // Funds
                      if (fundType == 1) {
                        // Temple funds
                        addGoogleAnalytics("husm_month_action", {
                          click: "OpenTempleFund",
                        });
                        navigation.navigate(SCREEN.DonationListViewScreen, {
                          sheetData: allSheetData,
                        });
                      } else {
                        // Generic fund | Gausala and Smashan
                        addGoogleAnalytics("husm_month_action", {
                          click: "OpenGausalaFund",
                        });

                        if (fundType == 2) {
                          // Donation list
                          sTitle = screenTitle.gausalaDonation;
                          tableName = "gausala_funds";
                        } else if (fundType == 3) {
                          // Smashan donation list
                          sTitle = screenTitle.smashanDonation;
                          tableName = "smashan_funds";
                        }

                        navigation.navigate(SCREEN.GenericStatisticsScreen, {
                          title: sTitle,
                          type: fundType,
                          tableName: tableName,
                        });
                      }
                    } else if (idx == 1) {
                      // Expanses
                      addGoogleAnalytics("husm_month_action", {
                        click: "OpenGausalaFund",
                      });

                      if (fundType == 1) {
                        // Monthly expense list
                        sTitle = screenTitle.templeExpanses;
                        tableName = "monthly_expenses";
                      } else if (fundType == 2) {
                        // Gausalal Expense list
                        sTitle = screenTitle.gausalaExpanses;
                        tableName = "gausala_expenses";
                      } else if (fundType == 3) {
                        // Smashan Expenses list
                        sTitle = screenTitle.smashanExpenses;
                        tableName = "smashan_expenses";
                      } else {
                        return;
                      }
                      navigation.navigate(SCREEN.GenericStatisticsScreen, {
                        title: sTitle,
                        type: fundType,
                        tableName: tableName,
                      });
                    } else if (idx == 2) {
                      // type 2 = Monthly data, 1 = Gausala fund Chart
                      addGoogleAnalytics("husm_month_action", {
                        click: "OpenChart",
                      });
                      if (fundType == 1) {
                        // Monthly Chart
                        sTitle = screenTitle.templeExpanses;
                        tableName = "monthly_expenses";
                      } else if (fundType == 2) {
                        // Gausalal Chart
                        sTitle = screenTitle.gausalaExpanses;
                        tableName = "gausala_funds";
                      } else if (fundType == 3) {
                        // Smashan Chart
                        sTitle = screenTitle.smashanExpenses;
                        tableName = "smashan_funds";
                      } else {
                        return;
                      }

                      navigation.navigate(SCREEN.ChartViewScreen, {
                        type: fundType,
                        table: tableName,
                      });
                    } else if (
                      stats.title == general.addMonthlyExpenses ||
                      stats.title == general.addGausalaExpenses ||
                      stats.title == general.addGausalaCharaDonation
                    ) {
                      // Temple - Festival expense add
                      // Gaushala expense
                      // Gaushala Fodder donation
                      let tableNm = "";
                      if (stats.title == general.addMonthlyExpenses) {
                        tableNm = "monthly_expenses";
                      } else if (stats.title == general.addGausalaExpenses) {
                        tableNm = "gausala_expenses";
                      }
                      navigation.navigate(SCREEN.AddGeneralExpensesVC, {
                        type: fundType,
                        subType: tableNm,
                      });
                    } else if (stats.title == general.gausalaCharaDonation) {
                      navigation.navigate(SCREEN.GenericStatisticsScreen, {
                        title: stats.title,
                        type: fundType,
                        tableName: "gausala_fodder_donation",
                      });
                    }
                  }}
                />
              );
            })
          )}
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
