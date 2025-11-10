import { Keyboard, Text, TouchableOpacity, View, Button } from "react-native";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";
import { scale } from "react-native-size-matters";

import MainHeader from "@/components/utilities/header";
import { BaseContainer } from "@/components/utilities";
import { isStringNull } from "@/utils/helper-function";
import { postRequest, TRAIL_URLS } from "@/api-services";
import ActionTextField from "@/components/action-text-field";
import AppScrollView from "@/components/app-scrollview";
import CustomTextField from "@/components/text-input/textfield";
import ActionSheetList from "@/components/action-sheet-list";
import AppCustomButton from "@/components/app-custom-button";
import { format_Date } from "@/utils/date-helper";
import LocalizeText from "@/utils/text-localize";
import { SVGFile } from "@/utils/images-path";
import { ShowToast } from "@/components/toast";
import { toastTypes } from "@/utils/app-enum";
import { APP } from "@/utils/constants";
import styles from "./styles";

export default function AddGeneralExpensesVC({ navigation, route }) {
  const { placeholder, general, personalInfo, alerts, auth } = LocalizeText;
  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const optionSelectRef = useRef();
  const [headerTitle, setHeaderTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [updating, setUpdating] = useState(false);
  const [detailName, setDetailName] = useState("");
  const [occupationName, setOccupationName] = useState("");
  const [fundReceiptNo, setFundReceiptNo] = useState("");
  const [amount, setAmount] = useState("");
  const [allOptions, setAllOptions] = useState([]);

  const fundType = route.params.type;
  const fundSubType = route.params.subType;
  const isUpdate = route.params.isUpdate;

  useEffect(() => {
    if (fundSubType == "monthly_expenses") {
      setHeaderTitle(general.addMonthlyExpenses);
    } else if (fundSubType == "gausala_funds") {
      setHeaderTitle(
        isUpdate ? general.updateGausalaDonation : general.addGausalaDonation
      );
    } else if (fundSubType == "gausala_expenses") {
      setHeaderTitle(
        isUpdate ? general.updateGausalaExpenses : general.addGausalaExpenses
      );
    } else if (fundSubType == "smashan_funds") {
      setHeaderTitle(
        isUpdate ? general.updateSmashanDonation : general.addSmashanDonation
      );
    } else if (fundSubType == "smashan_expenses") {
      setHeaderTitle(
        isUpdate ? general.updateSmashanExpenses : general.addSmashanExpenses
      );
    } else if (fundSubType == "gausala_fodder_donation") {
      setHeaderTitle(
        isUpdate
          ? general.updateGausalaCharaDonation
          : general.addGausalaCharaDonation
      );
    }

    if (isUpdate == 1) {
      const donationObject = route.params.donation;
      console.log("donationObject", donationObject);

      const {
        Name = "",
        Amount = "",
        ReceiptNo = "",
        Occasion = "",
      } = donationObject;

      setDetailName(Name);
      setAmount(`${Amount}`);
      setFundReceiptNo(`${ReceiptNo}`);
      setSelectedDate(new Date(donationObject?.Date));
      setOccupationName(Occasion);
      //setHeaderTitle(general.updateGausalaDonation);
    }
    if (fundSubType.includes("expenses")) {
      // Expenses
      setAllOptions([
      "લીલી જાર",
      "ખોળ",
      "ઘાસચારો",
      "મકાઈ ની ખરીદી",
      "લીલા ની ખરીદી",
      "ભુકા ની ખરીદી",
    ]);
    } else {
      // Funds
      setAllOptions([
      "જન્મદિવસ",
      "પુણ્યતિથિ",
      "શ્રાદ્ધંજલી",
      "શ્રાદ્વ નિમિતે",
      "લગ્ન વર્ષગાંઠ",
      "અનુદાન",
    ]);
    }
    
  }, []);

  const canShowDropDown = () => {
    // "monthly_expenses"
    // "gausala_funds"
    // "gausala_expenses"
    // "smashan_funds"
    //"smashan_expenses"
    //"gausala_fodder_donation"

    switch (fundSubType) {
      case "smashan_funds":
      case "gausala_funds":
      case "gausala_expenses":
      case "smashan_expenses":
      case "gausala_fodder_donation":
        return true;
        break;

      default:
        break;
    }
    return false;
  };

  function handleToggleSheet(value) {
    //console.log("Sheet open", value);
    setOpen(!open);
  }

  const fetchApiURL = () => {
    if (fundSubType == "monthly_expenses") {
      return `${TRAIL_URLS.addMonthlyExpenses}`;
    } else if (
      fundSubType == "smashan_funds" ||
      fundSubType == "smashan_expenses" ||
      fundSubType == "gausala_expenses" ||
      fundSubType == "gausala_funds" ||
      fundSubType == "gausala_fodder_donation"
    ) {
      return isUpdate
        ? `${TRAIL_URLS.genericUpdate}`
        : `${TRAIL_URLS.genericAdd}`;
    } else if (fundSubType == "gausala_funds") {
      return `${TRAIL_URLS.addGaushalaFund}`;
    } else if (fundSubType == "gausala_expenses") {
      return `${TRAIL_URLS.addGaushalaExpenses}`;
    } else if (fundSubType == "GaushalaUpdate") {
      return `${TRAIL_URLS.updateGaushalaFund}`;
    }
  };

  const fetchOccasionPlaceholder = () => {
    if (fundSubType == "monthly_expenses") {
      return `${placeholder.monthlyExpOccasionPlaceholder}`;
    } else if (fundSubType == "gausala_funds") {
      return `${placeholder.occasionPlaceholder}`;
    } else if (
      fundSubType == "gausala_expenses" ||
      fundSubType == "smashan_expenses" ||
      fundSubType == "gausala_fodder_donation"
    ) {
      return `${placeholder.gaushalaExpOccasionPlaceholder}`;
    } else if (fundSubType == "smashan_funds") {
      return `${placeholder.smashanFundPlaceholder}`;
    }
  };

  function onSubmitHandler() {
    Keyboard.dismiss();
    if (isStringNull(fundReceiptNo)) {
      ShowToast(toastTypes.error, alerts.receiptNoRequired);
    } else if (isStringNull(detailName)) {
      ShowToast(toastTypes.error, alerts.enterDetails);
    } else if (isStringNull(occupationName)) {
      ShowToast(toastTypes.error, alerts.enterOccasionDetails);
    } else if (isStringNull(amount)) {
      ShowToast(toastTypes.error, alerts.enterAmountDetails);
    } else {
      if (netConnected) {
        const param = {
          Date: selectedDate,
          ReceiptNo: fundReceiptNo,
          Name: detailName,
          Occasion: occupationName,
          Amount: parseInt(amount),
          table: fundSubType,
        };

        if (isUpdate == 1) {
          const donationObject = route.params.donation;
          param["_id"] = donationObject._id;
        }

        let api = fetchApiURL();
        setUpdating(true);
        postRequest(api, param)
          .then((response) => {
            if (APP.SHOW_LOG) {
              console.log(
                "General entry add response ==>",
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
                if (fundSubType == "GaushalaUpdate") {
                  ShowToast(toastTypes.success, alerts.entryRecUpdatedSuccess);
                } else {
                  ShowToast(toastTypes.success, alerts.entryRecAddedSuccess);
                }
              }
              navigation.goBack();
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

  function handleSelectionYear(item, index) {
    setOccupationName(item);

    handleOptionSheet(false);
  }

  function handleOptionSheet(value) {
    if (value === true) {
      optionSelectRef?.current?.openThis();
    } else {
      optionSelectRef?.current?.closeThis();
    }
  }

  function onPressOccasionDropDown() {
    handleOptionSheet(true);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        showLeftIcon
        leftTitle={headerTitle}
        navigation={navigation}
      />
      <AppScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.chartTopSecContainer}>
            <View style={styles.yearContainer}>
              <ActionTextField
                bottomSpacing={0}
                label={placeholder.selectDate}
                selectedItem={
                  selectedDate === null
                    ? "Date"
                    : format_Date(selectedDate, "DD-MM-YYYY")
                }
                placeholderItem={"Date"}
                isActive={open}
                value={
                  selectedDate === null
                    ? "Date"
                    : format_Date(selectedDate, "DD-MM-YYYY")
                }
                onPress={() => {
                  handleToggleSheet(true);
                }}
                rightImage={SVGFile.svgDownArrow}
              />
            </View>
          </View>

          <CustomTextField
            label={placeholder.receiptNo}
            text={fundReceiptNo}
            onChange={(v) => setFundReceiptNo(v)}
            keyboardType={"number-pad"}
          />

          <CustomTextField
            label={placeholder.details}
            text={detailName}
            onChange={(v) => setDetailName(v)}
          />

          <CustomTextField
            label={placeholder.occasion}
            placeholder={fetchOccasionPlaceholder()}
            text={occupationName}
            onChange={(v) => setOccupationName(v)}
            showEye={canShowDropDown()}
            eyeIcon={SVGFile.svgDownArrow}
            onPressEye={onPressOccasionDropDown}
          />

          <CustomTextField
            label={personalInfo.amount}
            text={amount}
            onChange={(v) => setAmount(v)}
            keyboardType={"number-pad"}
          />

          <AppCustomButton
            isLoading={updating}
            onPress={onSubmitHandler}
            title={auth.submit}
            disabled={updating}
            mainContainerStyle={{ marginTop: scale(30) }}
          />
        </View>
      </AppScrollView>

      <DatePicker
        modal
        open={open}
        date={selectedDate}
        mode={"date"}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <ActionSheetList
        refFromParent={optionSelectRef}
        dataFromChildToParent={handleSelectionYear}
        sheetData={allOptions}
        leftHeaderTitle={fetchOccasionPlaceholder()}
        itemSelected={""}
      />
    </BaseContainer>
  );
}
