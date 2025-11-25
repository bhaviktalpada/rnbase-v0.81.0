import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { scale } from "react-native-size-matters";

// Components
import DashboardStatistics from "@/components/dashboard-statistics";
import ActionTextField from "@/components/action-text-field";
import CustomTextField from "@/components/text-input/textfield";
import AppScreenLoader from "@/components/screen-loader/screen-loader";
import AppCustomButton from "@/components/app-custom-button";
import ActionSheetList from "@/components/action-sheet-list";
import { BaseContainer } from "@utilities";
import MainHeader from "@utilities/header";
import AppScrollView from "@/components/app-scrollview";
import { ShowToast } from "@/components/toast";

// Utils
import { isStringNull } from "@/utils/helper-function";
import LocalizeText from "@/utils/text-localize";
import { format_Date } from "@/utils/date-helper";
import { toastTypes } from "@/utils/app-enum";
import { SVGFile } from "@/utils/images-path";
import { SCREEN } from "@/utils/screen-name";
import { APP } from "@/utils/constants";
import { COLORS } from "@/theme";
import styles from "./styles";
import { getRequest, TRAIL_URLS } from "@/api-services";
import AppRegularText from "@utilities/app-regular-text";
import AppBoldText from "@utilities/app-bold-text";

export default function AddMonthlyController({ navigation, route }) {
  const { placeholder, general, personalInfo, alerts, screenTitle, auth } =
    LocalizeText;
  const countrySelectRef = useRef();
  const currentYear = format_Date(new Date(), "YYYY");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const [amount, setAmount] = useState("");
  const [allYears, setAllYears] = useState([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState({});
  const [updating, setUpdating] = useState(false);
  const monthsList = [
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

  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  useEffect(() => {
    console.log("useEffect Call1");

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear + 1; year++) {
      years.push(year);
    }
    setAllYears(years);
  }, []);

  useEffect(() => {
    console.log("**** useEffect Call2",selectedYear);
    if (selectedUser != null && selectedYear != null) {
      setSelectedMonths({});
      fetchUserData();
    }
  }, [selectedYear]);

  function fetchUserData() {
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
              
              setUserList(resData);

              if (selectedUser != null) {
                const filteredUsers = resData.filter(
                  (user) => user.user_id === selectedUser.user_id
                );
                if (filteredUsers.length != 0) {
                  setSelectedUser(filteredUsers[0]);
                }
              }
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

  function handleSelectionYear(item, index) {
    setSelectedYear(allYears[index]);
    handleToggleSheet(false);
  }

  function handleToggleSheet(value) {
    console.log("Sheet open", value);

    if (value === true) {
      countrySelectRef?.current?.openThis();
      setOpenSheet(true);
    } else {
      countrySelectRef?.current?.closeThis();
      setOpenSheet(false);
    }
  }

  const toggleMonthSelection = (month) => {
    if (!selectedUser) return;

    const monthKey = `${month} ${selectedYear}`;
    const paidMonths = isMonthDisabled(month);

    if (paidMonths) return; // already paid, disabled

    if (amount.length == 0) {
      ShowToast(toastTypes.error, alerts.enterAmount);
      return;
    }

    setSelectedMonths((prev) => {
      const isSelected = prev[monthKey];
      const updated = { ...prev };
      if (isSelected) {
        delete updated[monthKey];
      } else {
        updated[monthKey] = amount;
      }
      return updated;
    });
  };

  const isMonthDisabled = (month) => {
    //console.log("selectedUser", selectedUser);
    //console.log(`Month ${month}, Year: ${selectedYear}`);
    const key = `${month} ${selectedYear}`;

    // return false;
    return selectedUser && selectedUser[key];
  };

  const renderMonth = (month) => {
    if (!selectedUser) return null;

    const monthKey = `${month} ${selectedYear}`;

    let isPaid = isMonthDisabled(month);
    if (isPaid == undefined) {
      isPaid = false;
    } else {
      isPaid = true;
    }
    const isSelected = !!selectedMonths[monthKey];

    console.log("isPaid: ", isPaid);

    return (
      <TouchableOpacity
        key={monthKey}
        onPress={() => toggleMonthSelection(month)}
        disabled={isPaid}
        style={[
          styles.monthCapsule,
          isPaid && styles.paid,
          isSelected && styles.selected,
        ]}
      >
        <AppRegularText style={styles.monthText}>
          {month} {isSelected ? `₹${selectedMonths[monthKey]}` : ""}
        </AppRegularText>
      </TouchableOpacity>
    );
  };

  function onSelectUser(selectedDonor) {
    console.log("**** SELECTED USER", selectedDonor);

    setSelectedUser(selectedDonor);

    setSelectedMonths({});
    //fetchUserData();
  }

  function onSubmitHandler() {
    Keyboard.dismiss();
    if (selectedUser == null) {
      ShowToast(toastTypes.error, alerts.selectDonorFirst);
    } else if (isStringNull(amount)) {
      ShowToast(toastTypes.error, alerts.enterAmount);
    } else {
      console.log("selectedMonths", selectedMonths);

      const finalMonths = {};
      Object.keys(selectedMonths).forEach((key) => {
        const [monthName, year] = key.split(" ");
        const monthNumber = monthMap[monthName];
        if (monthNumber) {
          finalMonths[monthNumber] = true;
        }
      });

      const param = {
        user_id: selectedUser.user_id,
        year: parseInt(selectedYear),
        months: finalMonths, // example: { "1": true, "3": true, "9": true }
        amount: parseInt(amount),
      };

      console.log("param:", param);

      if (netConnected) {
        let api = `${TRAIL_URLS.addMonthlyFund}`;
        setUpdating(true);
        postRequest(api, param)
          .then((response) => {
            if (APP.SHOW_LOG) {
              console.log(
                "Add Donation response ==>",
                JSON.stringify(response)
              );
            }
            if (response?.success == true) {
              if (response?.message != null) {
                ShowToast(
                  toastTypes.success,
                  LocalizeText.getLanguage() == "gu"
                    ? response?.message_gu
                    : response?.message
                );
              } else {
                ShowToast(
                  toastTypes.success,
                  "Monthly entries added successfully"
                );
              }
            }
            setUpdating(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log("Error", e);
          });
      } else {
        ShowToast(toastTypes.error, alerts.internetConnection);
      }
    }
  }

  const totalAmount =
    parseInt(amount || "0") * Object.keys(selectedMonths).length;

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={general.addMonthlyDonation}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        navigation={navigation}
      />
      <AppScrollView>
        <View style={styles.mainContainer}>
          <View style={{ marginTop: 10 }}>
            <DashboardStatistics
              key={1}
              icon={SVGFile.svgUser}
              iconSize={30}
              titleFontSize={15}
              iconBGColor={COLORS.colorGreen}
              totalInfo={
                selectedUser ? selectedUser.Name : screenTitle.selectDonors
              }
              info={""}
              onPressHandler={() => {
                navigation.navigate(SCREEN.SelectUserController, {
                  year: selectedYear,
                  onSelect: onSelectUser,
                });
              }}
            />
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
                  console.log("allYears", allYears);
                  handleToggleSheet(true);
                }}
                rightImage={SVGFile.svgDownArrow}
              />
            </View>
          </View>
          <CustomTextField
            label={personalInfo.amount}
            text={amount}
            onChange={(v) => {
              setAmount(v);
              setSelectedMonths({});
            }}
            keyboardType={"number-pad"}
            isOptional={true}
          />

          {isLoading ? (
            <AppScreenLoader />
          ) : (
            selectedUser && (
              <View>
                <View style={styles.monthsContainer}>
                  {monthsList.map(renderMonth)}
                </View>
                <View style={{ marginTop: 20 }}>
                  <AppBoldText style={{ fontSize: 16}}>
                    Total Amount: ₹{totalAmount}
                  </AppBoldText>
                </View>
              </View>
            )
          )}
          <AppCustomButton
            isLoading={updating}
            onPress={onSubmitHandler}
            title={auth.submit}
            disabled={updating}
            mainContainerStyle={{ marginTop: scale(30) }}
          />
        </View>
      </AppScrollView>

      <ActionSheetList
        refFromParent={countrySelectRef}
        dataFromChildToParent={handleSelectionYear}
        sheetData={allYears}
        leftHeaderTitle={placeholder.selectYear}
        itemSelected={selectedYear}
      />
    </BaseContainer>
  );
}
