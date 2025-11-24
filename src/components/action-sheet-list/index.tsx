import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import ActionSheet, { useScrollHandlers } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

// Utils & Components
import LocalizeText from "@/utils/text-localize";
import MainHeader from "../utilities/header";
import { screenHeight } from "@/utils/dimensions";
import { PLATFORM_MOBILE } from "@/utils/app-enum";
import { SVGFile } from "@/utils/images-path";
import CheckListbox from "../check-list";

export default function ActionSheetList({
  refFromParent,
  dataFromChildToParent,
  sheetData = [],
  leftHeaderTitle = "",
  itemSelected,
}) {
  const { general } = LocalizeText;
  const sheetListStateCityRef = useRef();
  const scrollHandlers = useScrollHandlers(sheetListStateCityRef);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isListStateCityOpened, setListStateCityOpened] = useState(false);

  const [isSearchEnable, setSearchEnable] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [mainArr, setMainArray] = useState([]);

  const snapPoints = [40, 40, 40];
  const [, setRefresh] = useState();

  const data = sheetData;

  const inset = useSafeAreaInsets();

  useEffect(() => {
    refFromParent.current = {
      openThis: () => handleToggleSheet(true),
      closeThis: () => handleToggleSheet(),
    };
    return () => {};
  }, []);

  useEffect(() => {
    if (!isListStateCityOpened) {
      return;
    }
    resetSearchBar();
  }, []);

  useEffect(() => {
    if (isListStateCityOpened) {
      if (itemSelected) {
        setSelectedItem(itemSelected);
      }
      resetSearchBar();
    }
  }, [isListStateCityOpened]);

  const handleCityStateSelection = (item, index) => {
    setSelectedItem(item);
    resetSearchBar();
    dataFromChildToParent(item, index);
  };

  function resetSearchBar() {
    setSearchEnable(false);
    setSearchText("");
    resetSearchPageData();
  }

  function fetchData(text) {
    if (text && text.length != 0) {
      const newData = sheetData.filter((x) => x.includes(text));
      setMainArray(newData);
    } else {
      setMainArray(getResetArray(false));
    }
  }

  function resetSearchPageData() {
    setMainArray(sheetData);
  }

  function getResetArray(isReset = true) {
    var staticArray = [];

    staticArray = sheetData;

    var resetArray = staticArray.map((item) => {
      var finalItem = item;
      if (isReset == false && selectedItem !== null) {
        if (finalItem == selectedItem) {
          setSelectedItem(finalItem);
        }
      }
      return finalItem;
    });
    return resetArray;
  }

  function handleToggleSheet(value) {
    console.log("Toggle", selectedItem);
    if (value == true) {
      sheetListStateCityRef?.current?.show();
    } else {
      sheetListStateCityRef?.current?.hide();
    }
  }

  function handleToggleThisOpened() {
    setListStateCityOpened(!isListStateCityOpened);
  }

  function handlePressDoneButton() {
    handleToggleSheet();
  }

  return (
    <ActionSheet
      {...scrollHandlers}
      onOpen={handleToggleThisOpened}
      onClose={handleToggleThisOpened}
      defaultOverlayOpacity={0.8}
      closeOnTouchBackdrop
      closeOnPressBack
      containerStyle={styles.actionSheetContainer(inset.bottom, inset.top)}
      snapPoints={snapPoints}
      initialSnapIndex={1}
      overdrawFactor={0}
      keyboardHandlerEnabled={true}
      ref={sheetListStateCityRef}
    >
      {isListStateCityOpened && (
        <View style={{ height: screenHeight * 0.58, width: "100%" }}>
          <View style={{ marginTop: scale(-inset.top) + 20}}>
            <MainHeader
              leftTitle={leftHeaderTitle}
              secondRightIcon={SVGFile.svgSearch}
              iconSize={18}
              isSearchActive={isSearchEnable}
              searchText={searchText}
              onChangeText={txt => setSearchText(txt)}
              onPressRightSecond={() => setSearchEnable(!isSearchEnable)}
              onPressCloseSearch={() => {
                setSearchEnable(!isSearchEnable);
                setSearchText('');
                resetSearchPageData();
              }}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginHorizontal: scale(15), marginTop: scale(10) }}>
              {mainArr?.map((item, index) => {
                //console.log("item->",item);
                //console.log("selectedItem",selectedItem);
                //console.log("=========");
                let isSelected = selectedItem == item;
                return (
                  <CheckListbox
                    key={index}
                    title={item}
                    checked={isSelected}
                    onPress={() => handleCityStateSelection(item, index)}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionSheetContainer: (bottomSafe, topSafe) => ({
    borderTopLeftRadius: scale(0),
    borderTopRightRadius: scale(0),
    height: "100%",
  }),
  sheetMainContainer: (snapPoints) => ({
    height: snapPoints
      ? Platform.OS == PLATFORM_MOBILE.ANDROID
        ? screenHeight * ((snapPoints[0] - 3) / 103)
        : screenHeight * ((snapPoints[0] - 3) / 96)
      : screenHeight,
    width: "100%",
  }),
});
