import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, TouchableOpacity, Keyboard } from "react-native";
//Hooks
const { scale } = require("react-native-size-matters");
import { useSelector } from "react-redux";

// Components
import CustomTextField from "@/components/text-input/textfield";
import AppScreenLoader from "@/components/screen-loader/screen-loader";
import NodataFound from "@/components/no-data-found";
import ActionSheetList from "@/components/action-sheet-list";
import FloatingButton from "@/components/floating-button";
import { ShowToast } from "@/components/toast";
import AppBoldText from "@/components/utilities/app-bold-text";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import ActionTextField from "@/components/action-text-field";
import AppRegularText from "@/components/utilities/app-regular-text";

// Util | Constants
import { DATE_FORMAT, format_Date } from "@/utils/date-helper";
import { toastTypes, USER_ROLE_NAME } from "@/utils/app-enum";
import { IMAGES, SVGFile } from "@/utils/images-path";
import LocalizeText from "@/utils/text-localize";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";
import ImgSVG from "@/utils/image-svg";
import { getRequest, TRAIL_URLS } from "@/api-services";
import { COLORS } from "@/theme";
import styles from "./styles";

export default function GenericStatisticsScreen({ navigation, route }) {
  const { screenTitle, placeholder, general, alerts, noData } = LocalizeText;
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const userRole = useSelector((v) => v?.userInfoReducer?.userRole);
  const [allFundListData, setAllFundData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [txtSearch, setSearchText] = useState("");
  const [currentYearFund, setCurrentYearFund] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [allYears, setAllYears] = useState([]);
  const [allMonths, setAllMonths] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const currentYear = format_Date(new Date(), "YYYY");
  const currentMonth = format_Date(new Date(), "MM");
  const [selectedYear, setSelectedState] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isPullLoading, setPullLoading] = useState(false);

  const dropDownSheetRef = useRef();
  const isExpanses =
    route.params.title == screenTitle.gausalaExpanses ? true : false;
  const fundType = route.params.type;
  const tableName = route.params.tableName;

  const [dropDownData, setDropDownData] = useState([]);
  const [dropDownType, setDropDownType] = useState(0); // 1 = Year, 2 = Month
  const [dropDownLoading, setDropDownLoading] = useState(false);
  const [dropDownTitle, setDropDownTitle] = useState("");
  const [selectedDropDownVal, setSelectedDropDownVal] = useState(null);

  useEffect(() => {
    console.log("masterData", route.params.title);

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2024; year <= currentYear + 1; year++) {
      years.push(year);
    }
    setAllYears(years);
    console.log("years", years);

    const month1 = { name: "Jan", monthNumber: "01" };
    const month2 = { name: "Feb", monthNumber: "02" };
    const month3 = { name: "Mar", monthNumber: "03" };
    const month4 = { name: "Apr", monthNumber: "04" };
    const month5 = { name: "May", monthNumber: "05" };
    const month6 = { name: "Jun", monthNumber: "06" };
    const month7 = { name: "Jul", monthNumber: "07" };
    const month8 = { name: "Aug", monthNumber: "08" };
    const month9 = { name: "Sep", monthNumber: "09" };
    const month10 = { name: "Oct", monthNumber: "10" };
    const month11 = { name: "Nov", monthNumber: "11" };
    const month12 = { name: "Dec", monthNumber: "12" };
    const months = [
      month1,
      month2,
      month3,
      month4,
      month5,
      month6,
      month7,
      month8,
      month9,
      month10,
      month11,
      month12,
    ];
    setAllMonths(months);

    const sleMon = months.filter((item) => item.monthNumber == currentMonth);
    console.log("sleMon", sleMon.length != 0 ? sleMon[0] : null);
    if (sleMon.length != 0) {
      setSelectedMonth(sleMon[0]);
    }
  }, []);

  useEffect(() => {
    getFundListData();
  }, [selectedYear]);

  useEffect(() => {
    prepareSheetData();
  }, [allFundListData]);

  function handleSelectionAction(item, index) {
    if (dropDownType == 1) {
      // Year
      setSelectedState(allYears[index]);
    } else {
      // Month
      setSelectedMonth(allMonths[index]);
    }
    handleToggleSheet(false);
    setDropDownType(0);
  }

  function handleToggleSheet(value) {
    console.log("Sheet open", value);

    if (value === true) {
      dropDownSheetRef?.current?.openThis();
      setOpenSheet(true);
    } else {
      dropDownSheetRef?.current?.closeThis();
      setOpenSheet(false);
    }
  }

  function getFundListData() {
    if (netConnected) {
      //let sheetTab = "";
      let api = `${TRAIL_URLS.gausalaFund}?year=${selectedYear}`;
      if (fundType == 1) {
        // Fund type = Temple funds
        //sheetTab = "TempleExpance" + selectedYear;
        api = `${TRAIL_URLS.monthlyExpenses}?year=${selectedYear}`;
      } else if (fundType == 2 || fundType == 3) {
        // Smashan
        api = `${TRAIL_URLS.genericGetAll}?year=${selectedYear}&table=${tableName}`;
      }

      setLoading(true);
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log("Get Gausala Fund data1 ==>", JSON.stringify(response));
          }
          if (response?.success == true) {
            const resData = response?.data || [];
            if (resData.length != 0) {
              console.log("resData.length===>2", resData.length);
              setAllFundData(resData);
            } else {
              setAllFundData([]);
            }
          } else {
            setAllFundData([]);
          }
          setLoading(false);
        })
        .catch((e) => {
          setAllFundData([]);
          setLoading(false);
          console.log("Error", e);
        });
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  function onRefresh() {
    Keyboard.dismiss();
    setSearchText("");
    getFundListData();
  }

  function prepareSheetData() {
    let totalThisYearFund = 0;
    allFundListData.map((record) => {
      //console.log("record.Amount",record.Amount);
      totalThisYearFund += parseFloat(record.Amount);
    });
    setCurrentYearFund(totalThisYearFund);

    handleSearch(txtSearch);
  }

  let formateNumber = new Intl.NumberFormat().format(currentYearFund);

  // Component for each person's data
  const PersonSection = ({ person }) => {
    const { Name, Amount, ReceiptNo, Date, Occasion, ...months } = person;

    const dtFormate = format_Date(Date, DATE_FORMAT.DD_MM_YYYY);

    function onClickFund() {
      if (userRole === USER_ROLE_NAME.Owner) {
        navigation.navigate(SCREEN.AddGeneralExpensesVC, {
          type: fundType,
          subType: tableName,
          donation: person,
          isUpdate: 1,
        });
      }
    }

    return (
      <TouchableOpacity
        activeOpacity={APP.ACTIVE_OPACITY}
        onPress={onClickFund}
        style={styles.section}
      >
        <View style={styles.nameContainer}>
          <Text style={styles.receiptNo}>
            {placeholder.receiptNo}: #{ReceiptNo}
          </Text>
          <Text style={styles.receiptNo}>
            {placeholder.date}: {dtFormate}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          {/* Person's Name */}
          <Text style={styles.nameLabel}>{Name}</Text>
          {/* Total */}
          <Text style={styles.total}>
            {tableName == "gausala_fodder_donation"
              ? `${Amount} ${placeholder.weightMan}`
              : `${placeholder.total}: ${Amount}`}
          </Text>
        </View>
        <AppBoldText style={styles.occasionLbl}>{Occasion}</AppBoldText>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text == null|| text.trim() === "") {
      // If search is cleared, reset to original
      setFilteredData(allFundListData);
    } else {
      const newData = allFundListData.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  function onClickFloatingButton() {
    // Gaushala fund
    navigation.navigate(SCREEN.AddGeneralExpensesVC, {
      type: fundType,
      subType: tableName,
    });
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={route.params.title}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        navigation={navigation}
      />

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
              console.log("allYears", allYears);
              if (dropDownType == 1) {
                handleToggleSheet(true);
              }
              setDropDownType(1);
            }}
            rightImage={SVGFile.svgDownArrow}
          />
        </View>

        <View style={styles.middleView}>
          <AppRegularText numberOfLines={1} style={styles.thisYearStyle}>
            {tableName == "gausala_fodder_donation" ? placeholder.yearTotalWeight : placeholder.yearTotalAmount}
          </AppRegularText>
          <View style={styles.mainContainer(COLORS.colorLightestGrayE0)}>
            <AppRegularText
              numberOfLines={2}
              style={styles.currentYearStyle}
              color={COLORS.colorGray6C}
              sizeFont={12}
            >
              {tableName == "gausala_fodder_donation" ? `${formateNumber}` : `₹${formateNumber}`}
            </AppRegularText>
          </View>
        </View>
      </View>
      <View style={styles.searchViewMain}>
        <View style={styles.searchViewSub}>
          <ImgSVG
            src={SVGFile.svgSearch}
            size={scale(24)}
            color={COLORS.gray_Dark}
          />
          <CustomTextField
          viewStyle={{marginTop: scale(15), borderWidth: 0, bottomBorderWidth: 0}}
            placeholder={general.search}
            text={txtSearch}
            onChange={handleSearch}
            onReturnPress={handleSearch}
            autoFocus={false}
            returnKeyType={"search"}
          />
        </View>
      </View>
      {isLoading ? (
        <AppScreenLoader />
      ) : (
        <FlatList
          data={filteredData}
          style={{ marginHorizontal: 5 }}
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, ind }) => (
            <PersonSection key={ind} person={item} />
          )}
          refreshing={isPullLoading}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <NodataFound
              title={
                netConnected ? noData.ndNoDataFound : alerts.internetConnection
              }
              image={IMAGES.no_data}
              parentHeight={300}
            />
          )}
        />
      )}

      <ActionSheetList
        refFromParent={dropDownSheetRef}
        dataFromChildToParent={handleSelectionAction}
        sheetData={dropDownType == 1 ? allYears : allMonths}
        leftHeaderTitle={
          dropDownType == 1 ? placeholder.selectYear : placeholder.selectMonth
        }
        itemSelected={dropDownType == 1 ? selectedYear : selectedMonth}
      />
      {/* Floating Button */}
      {userRole === USER_ROLE_NAME.Owner && (
        <FloatingButton onPress={onClickFloatingButton} />
      )}
    </BaseContainer>
  );
}
