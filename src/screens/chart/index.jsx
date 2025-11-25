import { useState, useEffect, useRef } from "react";
import { Dimensions, Keyboard, TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

// Components
import ActionTextField from "@/components/action-text-field";
import AppScrollView from "@/components/app-scrollview";
import DashboardStatistics from "@/components/dashboard-statistics";
import { BaseContainer } from "@utilities";
import AppRegularText from "@utilities/app-regular-text";
import MainHeader from "@utilities/header";
import ActionSheetList from "@/components/action-sheet-list";
import { getRequest, TRAIL_URLS } from "@/api-services";
import { formatToINR } from "@/utils/helper-function";
import { format_Date } from "@/utils/date-helper";
import LocalizeText from "@/utils/text-localize";
import { toastTypes } from "@/utils/app-enum";
import { SVGFile } from "@/utils/images-path";
import { ShowToast } from "@/components/toast";
import { APP } from "@/utils/constants";
import { COLORS } from "@/theme";
import styles from "./styles";

export default function ChartScreen({ navigation, route }) {
  const { screenTitle, alerts, placeholder, general } = LocalizeText;
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const screenWidth = Dimensions.get("window").width;
  const [openSheet, setOpenSheet] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [allYears, setAllYears] = useState(false);
  const [allSheetData, setAllSheetData] = useState(null);
  const stateCityRef = useRef();
  const currentYear = format_Date(new Date(), "YYYY");
  const [selectedYear, setSelectedState] = useState(currentYear);
  const [currentYearFund, setCurrentYearFund] = useState(0);
  const [fundStatus, setFundStatus] = useState(null);
  const fundType = route.params.type;
  const tableName = route.params.table;

  const monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [barChartData, setBarChartData] = useState({
    labels: monthsArray,
    datasets: [
      {
        data: [],
      },
    ],
  });

  const chartConfig = {
    backgroundGradientTo: COLORS.colorOrange,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: COLORS.colorOrange,
    },
    propsForLabels: {
      fontSize: 10,
    },
    barPercentage: 0.3,
    scrollableDotFill: "*",
    propsForHorizontalLabels: {
      // x:40,
      alignmentBaseline: "center",
    },
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear + 1; year++) {
      years.push(year);
    }
    setAllYears(years);
    console.log("years", years);
    //getSummery();
    getDashboardData();
  }, []);

  useEffect(() => {
    if (allSheetData != null) {
      prepareSheetData();
    }
  }, [allSheetData, selectedYear]);

  function getDashboardData() {
    if (netConnected) {
      
      let api = "";
      if (fundType == 1) {
        api = `${TRAIL_URLS.monthlyStatistics}`;
      } else if (fundType == 2) {
        api = `${TRAIL_URLS.gausalaStatistics}`;
      } else if (fundType == 3) {
        api = `${TRAIL_URLS.genericStatistics}?table=${tableName}`;
      } else {
        return;
      }
      setLoading(true);
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log("Get Chart data ==>", JSON.stringify(response));
          }
          if (response?.success == true) {
            const resData = response?.data || [];
            setAllSheetData(resData);
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log("Error", e);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  function prepareSheetData() {
    const yearlyValue = [];

    let totalThisYearFund = 0;
    let ttFund = 0;
    allSheetData.map((item) => (ttFund += parseFloat(item.subtitle)));
    monthsArray.map((month) => {
      const filterArr = allSheetData.filter((sheetDt) => {
        const sheetTitle = new Date(sheetDt.title);
        const formattedMonth = format_Date(sheetTitle, "MMM");
        const formattedYear = format_Date(sheetTitle, "YYYY");
        return formattedMonth == month && formattedYear == selectedYear;
      });
      if (filterArr.length == 0) {
        yearlyValue.push(0);
      } else {
        const foundValue = filterArr[0];
        yearlyValue.push(parseFloat(foundValue.subtitle));
        totalThisYearFund += parseFloat(foundValue.subtitle);
      }
    });
    //console.log("yearlyValue", yearlyValue);

    let strTotalCurrency = formatToINR(`${ttFund}`);

    setFundStatus({
      title: general.totalFund,
      subtitle: strTotalCurrency,
    });

    setCurrentYearFund(totalThisYearFund);
    const finalChartData = {
      labels: monthsArray,
      datasets: [
        {
          data: yearlyValue,
        },
      ],
    };
    setBarChartData(finalChartData);
  }

  function handleSelectionState(item, index) {
    setSelectedState(allYears[index]);
    handleToggleSheet(false);
  }

  function handleToggleSheet(value) {
    if (value === true) {
      stateCityRef?.current?.openThis();
      setOpenSheet(true);
    } else {
      stateCityRef?.current?.closeThis();
      setOpenSheet(false);
    }
  }

  let formateNumber = new Intl.NumberFormat().format(currentYearFund);

  return (
    <BaseContainer isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.monthlyStatistics}
        navigation={navigation}
        showLeftIcon
        leftIconSize={14}
      />
      <AppScrollView>
        <View style={{ margin: 10 }}>
          {fundStatus && (
            <DashboardStatistics
              key={1}
              icon={SVGFile.svgStatistics}
              iconBGColor={COLORS.colorBlue}
              totalInfo={`${fundStatus.title}`}
              info={`${fundStatus.subtitle}`}
              iconColor={COLORS.white}
              onPressHandler={() => {
                console.log("stats");
              }}
            />
          )}
        </View>
        <View style={styles.chartTopSecContainer}>
          <View style={styles.yearContainer}>
            <ActionTextField
              bottomSpacing={0}
              label={placeholder.selectYear}
              selectedItem={selectedYear === null ? "Year" : selectedYear}
              placeholderItem={"Year"}
              isActive={openSheet}
              value={selectedYear === null ? "Year" : selectedYear}
              onPress={() => {
                Keyboard.dismiss();
                console.log("allYears", allYears);
                handleToggleSheet(true);
              }}
              rightImage={SVGFile.svgDownArrow}
            />
          </View>
          <View style={styles.middleView}>
            <AppRegularText numberOfLines={1} style={styles.thisYearStyle}>
              {placeholder.yearTotalAmount}
            </AppRegularText>
            <TouchableOpacity
              style={styles.mainContainer(
                COLORS.colorBlue,
                COLORS.colorLightestGrayE0
              )}
              onPress={() => {}}
            >
              <AppRegularText
                numberOfLines={2}
                style={styles.currentYearStyle}
                color={COLORS.colorGray6C}
                sizeFont={12}
              >
                {`₹${formateNumber}`}
              </AppRegularText>
            </TouchableOpacity>
          </View>
        </View>
        <BarChart
          style={{ marginHorizontal: 5 }}
          data={barChartData}
          width={screenWidth - 10}
          height={250}
          fromZero={true}
          //withVerticalLabels={true} // Dec 23 hide / show
          yAxisLabel="₹"
          // chartConfig={chartConfig}
          verticalLabelRotation={0}
          //showBarTops={true}
          chartConfig={chartConfig}
        />

        <ActionSheetList
          refFromParent={stateCityRef}
          dataFromChildToParent={handleSelectionState}
          sheetData={allYears}
          leftHeaderTitle={"Select Year"}
          itemSelected={selectedYear}
        />
      </AppScrollView>
    </BaseContainer>
  );
}
