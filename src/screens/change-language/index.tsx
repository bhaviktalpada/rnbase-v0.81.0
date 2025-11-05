import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import LocalizeText from "@/utils/text-localize";
import { styles } from "./styles";
import { BaseContainer } from "@/components/utilities";
import MainHeader from "@/components/utilities/header";
import AppCustomButton from "@/components/app-custom-button";
import { SCREEN } from "@/utils/screen-name";
import LanguageHelper from "@/utils/LanguageHelper";

export default function ChangeLanguageScreen({ navigation, route }) {
  const { screenTitle, auth } = LocalizeText;
  const [selectedLang, setSelectedLang] = useState("");
  const [currentLang, setCurrentLang] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const LANGUAGE_OPTIONS = [
    { label: "ગુજરાતી", value: "gu" },
    { label: "English", value: "en" },
    // Add more if needed
  ];

  useEffect(() => {
    LanguageHelper.getCurrentLanguage().then((lang) => {
      setSelectedLang(lang);
      setCurrentLang(lang);
      LocalizeText.setLanguage(lang);
    });
  }, []);

  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    setHasChanged(langCode !== currentLang);
  };

  const handleSubmit = async () => {
    console.log("selectedLang", selectedLang);

    await LanguageHelper.setLanguage(selectedLang);

    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN.LandingScreen }],
    });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item.value)}
      style={[
        styles.option,
        selectedLang === item.value && styles.selectedOption,
      ]}
    >
      <Text
        style={[
          styles.optionText,
          selectedLang === item.value && styles.selectedOptionText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.languages}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        navigation={navigation}
      />

      <FlatList
        data={LANGUAGE_OPTIONS}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
        style={styles.list}
      />

      <AppCustomButton
        onPress={handleSubmit}
        title={auth.submit}
        disabled={!hasChanged}
        mainContainerStyle={{
          marginHorizontal: 10,
          opacity: hasChanged ? 1.0 : 0.5,
        }}
      />
    </BaseContainer>
  );
}
