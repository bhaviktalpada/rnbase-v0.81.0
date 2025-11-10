import NodataFound from "@/components/no-data-found";
import AppScreenLoader from "@/components/screen-loader/screen-loader";
import CustomTextField from "@/components/text-input/textfield";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import { IMAGES, SVGFile } from "@/utils/images-path";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
const { scale } = require("react-native-size-matters");
import { useSelector } from "react-redux";
import styles from "./styles";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import { getRequest, TRAIL_URLS } from "@/api-services";
import { APP } from "@/utils/constants";
import LocalizeText from "@/utils/text-localize";
import { COLORS } from "@/theme";
import ImgSVG from "@/utils/image-svg";

//Hooks
// import VectorIcon, { ICON_NAME, VICON_TYPE } from "../../../components/custom-vector-icon";
// import InputField from "../../../components/general-input-field";

export default function SelectUserController({ navigation, route }) {
  const { screenTitle, noData, general, alerts, placeholder } = LocalizeText;
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const [currentYearFund, setCurrentYearFund] = useState(0);
  const [allDonateData, setAllDonateData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [txtSearch, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedYear, setSelectedState] = useState(route.params.year);
  const usercallBack = route.params.onSelect;

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
    getListData();
  }, [selectedYear]);

  useEffect(() => {
    prepareSheetData();
  }, [allDonateData]);

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
              //let filterArray = resData.slice(0, -4);

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
      <TouchableOpacity
        onPress={() => {
          //console.log("Person select", person);
          usercallBack(person);
          navigation.goBack();
        }}
        style={styles.section(isActive)}
      >
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
      </TouchableOpacity>
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

    if (text.trim() === "") {
      // If search is cleared, reset to original
      setFilteredData(allDonateData);
    } else {
      const newData = allDonateData.filter((item) =>
        item.Name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    }
  };

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.selectDonors}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        navigation={navigation}
      />

      <View style={styles.searchViewMain}>
        <View style={styles.searchViewSub}>
          <ImgSVG
            src={SVGFile.svgSearch}
            size={scale(24)}
            color={COLORS.gray_Dark}
          />
          <CustomTextField
            viewStyle={{
              marginTop: scale(15),
              borderWidth: 0,
              bottomBorderWidth: 0,
            }}
            placeholder={general.search}
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
                netConnected ? noData.noDataFound : alerts.internetConnection
              }
              image={IMAGES.no_data}
              parentHeight={300}
            />
          )}
        />
      )}
    </BaseContainer>
  );
}
