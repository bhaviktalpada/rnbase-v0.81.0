import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text } from "react-native";
const { scale } = require("react-native-size-matters");

//Hooks
import { useSelector } from "react-redux";

import AppScreenLoader from "@/components/screen-loader/screen-loader";
import AppRegularText from "@/components/utilities/app-regular-text";
import CustomTextField from "@/components/text-input/textfield";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import NodataFound from "@/components/no-data-found";
import { toastTypes, USER_ROLE_NAME } from "@/utils/app-enum";
import { getRequest, TRAIL_URLS } from "@/api-services";
import ActionTextField from "@/components/action-text-field";
import ActionSheetList from "@/components/action-sheet-list";
import FloatingButton from "@/components/floating-button";
import { format_Date } from "@/utils/date-helper";
import LocalizeText from "@/utils/text-localize";
import { ShowToast } from "@/components/toast";
import { SCREEN } from "@/utils/screen-name";
import { IMAGES, SVGFile } from "@/utils/images-path";
import { APP } from "@/utils/constants";
import { COLORS } from "@/theme";
import styles from "./styles";
import ImgSVG from "@/utils/image-svg";

export default function DonationListController({ navigation, route }) {
  const { screenTitle, noData, general, alerts, placeholder } = LocalizeText;
  const netConnected = useSelector((v) => v?.netInfoReducer.isConnected);
  const userRole = useSelector((v) => v?.userInfoReducer?.userRole);
  const [currentYearFund, setCurrentYearFund] = useState(0);
  const [allDonateData, setAllDonateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [txtSearch, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [allYears, setAllYears] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const currentYear = format_Date(new Date(), "YYYY");
  const [selectedYear, setSelectedState] = useState(currentYear);

  const stateCityRef = useRef();
  // Month Names Mapping
  const monthNames = [
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
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    console.log("masterData", route.params.sheetData);

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear + 1; year++) {
      years.push(year);
    }
    setAllYears(years);
    console.log("years", years);

    setAllDonateData(route.params.sheetData);
  }, []);

  useEffect(() => {
    getListData();
  }, [selectedYear]);

  useEffect(() => {
    prepareSheetData();
  }, [allDonateData]);

  function handleSelectionState(item, index) {
    setSelectedState(allYears[index]);
    handleToggleSheet(false);
  }

  function handleToggleSheet(value) {
    console.log("Sheet open", value);

    if (value === true) {
      stateCityRef?.current?.openThis();
      setOpenSheet(true);
    } else {
      stateCityRef?.current?.closeThis();
      setOpenSheet(false);
    }
  }

  function getListData() {
    if (netConnected) {
      let api = `${TRAIL_URLS.monthlyFund}?year=${selectedYear}`;
      setLoading(true);
      getRequest(api)
        .then((response) => {
          if (APP.SHOW_LOG) {
            console.log("Get Donation data2 ==>", JSON.stringify(response));
          }
          if (response?.success == true) {
            const resData = response?.data || [];
            if (resData.length != 0) {
              setAllDonateData(resData);
            }
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

  // Component for each month capsule
  const Capsule = ({ month, amount }) => {
    const isReceived = amount !== "" && amount != undefined; // Check if the month has a value
    return (
      <View
        style={[
          styles.capsule,
          isReceived ? styles.greenCapsule : styles.redCapsule,
        ]}
      >
        <Text style={styles.capsuleText}>
          {isReceived ? `${month} - ${amount}` : month}
        </Text>
      </View>
    );
  };

  const foundTotalFromRec = (months) => {
    // Calculate total amount
    const total = Object.keys(months)
      .filter(
        (key) =>
          key !== "sr_no" &&
          key !== "Name" &&
          key != "user_id" &&
          key != "isActive"
      )
      .reduce((sum, key) => sum + (Number(months[key]) || 0), 0);

    return total;
  };

  // Component for each person's data
  const PersonSection = ({ person }) => {
    const { Name, isActive, ...months } = person;

    const yearMonths = allMonths.map((month) => `${month} ${selectedYear}`);

    const totalAmount = foundTotalFromRec(person);
    const srNo = person["sr_no"];
    return (
      <View style={styles.section(isActive)}>
        <View style={styles.nameContainer}>
          {/* Person's Name */}
          <Text style={styles.name}>{`${srNo}. ${Name}`}</Text>
          {/* Total */}
          <Text style={styles.total}>
            {placeholder.total}: {totalAmount}
          </Text>
        </View>
        {/* Monthly Capsules */}
        <View style={styles.capsuleContainer}>
          {yearMonths.map((key, idx) => {
            if (key !== "sr_no" && key !== "Name") {
              return (
                <Capsule
                  key={key}
                  month={monthNames[idx]} // Map month number to month name
                  amount={months[key]}
                />
              );
            }
            return null;
          })}
        </View>
      </View>
    );
  };

  function prepareSheetData() {
    let totalThisYearFund = 0;
    allDonateData.map((record) => {
      const totalAmount = foundTotalFromRec(record);
      totalThisYearFund += parseFloat(totalAmount);
    });
    setCurrentYearFund(totalThisYearFund);

    setFilteredData(allDonateData);
  }

  const handleSearch = (text) => {
    setSearchText(text);

    if (text && text.trim() === "") {
      // If search is cleared, reset to original
      setFilteredData(allDonateData);
    } else {
      const newData = allDonateData.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  function onClickFloatingButton() {
    // Monthly donation add
    navigation.navigate(SCREEN.AddMonthlyDonationScreen);
  }

  let formateNumber = new Intl.NumberFormat().format(currentYearFund);

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.donors}
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
              handleToggleSheet(true);
            }}
            rightImage={SVGFile.svgDownArrow}
          />
        </View>
        <View style={styles.middleView}>
          <AppRegularText numberOfLines={1} style={styles.thisYearStyle}>
            {placeholder.yearTotalAmount}
          </AppRegularText>
          <View style={styles.mainContainer(COLORS.colorLightestGrayE0)}>
            <AppRegularText
              numberOfLines={2}
              style={styles.currentYearStyle}
              color={COLORS.colorGray6C}
              sizeFont={12}
            >
              {`₹${formateNumber}`}
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
            placeholder={general.search}
            viewStyle={{marginTop: scale(15), borderWidth: 0, bottomBorderWidth: 0}}
            text={txtSearch}
            onChange={handleSearch}
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
          keyExtractor={(_, index) => String(index)}
          renderItem={({ item, ind }) => (
            <PersonSection key={ind} person={item} />
          )}
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
        refFromParent={stateCityRef}
        dataFromChildToParent={handleSelectionState}
        sheetData={allYears}
        leftHeaderTitle={placeholder.selectYear}
        itemSelected={selectedYear}
      />

      {/* Floating Button */}
      {userRole === USER_ROLE_NAME.Owner && (
        <FloatingButton onPress={onClickFloatingButton} />
      )}
    </BaseContainer>
  );
}
