import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

//Hooks
// import * as types from "../../../redux/actions/action-list";
import { useDispatch, useSelector } from "react-redux";
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import AppCustomButton from "@/components/app-custom-button";
import CustomTextField from "@/components/text-input/textfield";
import MainHeader from "@/components/utilities/header";
import { BaseContainer } from "@/components/utilities";
import { ShowToast } from "@/components/toast";
import { CAMERA_TYPE, toastTypes } from "@/utils/app-enum";
import {
  removeFileFromStorage,
  saveUserDetail,
  storeFilePath,
} from "@/utils/firebase-db-helper";
import * as types from "@redux/actions/action-list";
import { isStringNull } from "@/utils/helper-function";
import LocalizeText from "@/utils/text-localize";
import AppScrollView from "@/components/app-scrollview";
import { COLORS } from "@/theme";
import globalStyles from "@/utils/global-styles";
import { styles } from "./styles";
import { textInputFilterFunction, VALIDATE_FILTER_TYPE } from "@/utils";
import { IMAGES } from "@/utils/images-path";
import ImgSVG from "@/utils/image-svg";
import { SvgEditRounded } from "@/assets/svg/svg-edit-rounded";
import { useKeyboard } from "@/utils/helper-keyboard";
import CustomImagePicker from "@/components/custom-image-picker";
import { setMasterData, setUserInfo } from "@/redux/reducers/userInfo-reducer";

export default function UserProfileScreen({ navigation, route }) {
  const { personalInfo, screenTitle, auth, alerts } = LocalizeText;

  const netConnected = useSelector((v) => v.netInfoReducer.isConnected);
  const profileInfo = useSelector((v) => v.userInfoReducer.userInfo);
  const [countryCode, setCountryCode] = useState(`+91`);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loadCP, setLoadCP] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [imagePickerShow, setImagePickerShow] = useState(false);
  const [previousFile, setPreviousFile] = useState(null);

  const dispatch = useDispatch();
  const keyboardHeight = useKeyboard();

  const [displayNm, setDisplayNm] = useState(profileInfo?.displayName ?? "");
  const [email, setEmail] = useState(profileInfo?.email ?? "");
  const [imageUri, setImageUri] = useState(profileInfo?.profilePhoto);
  const [phone, setPhone] = useState(profileInfo?.phoneNumber ?? "");
  const [txtAddress, setTxtAddress] = useState(profileInfo?.address ?? "");

  useEffect(() => {
    console.log("profileInfo55", profileInfo);
  }, []);

  function cleanUp() {
    if (previousFile) {
      removeFileFromStorage(previousFile, onFileDeleted);
    }
  }

  // Edit Image action sheet
  function onPressEditImage() {
    if (!uploadingProfile) {
      setImagePickerShow(!imagePickerShow);
    }
  }

  function onVisibleChange(child) {
    setImagePickerShow(child);
  }

  function onFilePathSelect(child) {
    console.log("**** File Select", child);
    //setFilePath(child);
    setImageUri(child.uri);

    if (netConnected) {
      if (previousFile) {
        removeFileFromStorage(previousFile, onFileDeleted);
        setPreviousFile(null);
      }

      setUploadingProfile(true);
      const newTime = new Date().getTime();
      const prepFileName = `profile/${newTime}_${profileInfo.uid}_${child.fileName}`;
      setPreviousFile(prepFileName);
      storeFilePath(child.uri, prepFileName, onFileUpload);
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  // Firebase call back
  const onFileUpload = (fullPath, downloadUrl) => {
    console.log("**** F Path", fullPath);
    console.log("**** downloadUrl", downloadUrl);
    setImageUri(downloadUrl);
    setUploadingProfile(false);
  };

  const onFileDeleted = () => {
    console.log("File deleted callback");
  };

  function onSubmitHandler() {
    Keyboard.dismiss();
    if (isStringNull(displayNm)) {
      ShowToast(toastTypes.error, alerts.displayNameRequired);
    } else if (isStringNull(phone)) {
      ShowToast(toastTypes.error, alerts.phoneNumberRequired);
    } else {
      setUpdating(true);
      const userInfo = {
        displayName: displayNm ?? "",
        phoneNumber: phone ?? "",
        email: profileInfo.email,
        uid: profileInfo.uid,
        emailVerified: profileInfo.emailVerified,
        role: profileInfo.role,
        signupType: profileInfo.signupType,
        profilePhoto: imageUri ?? "",
        filePath: previousFile == null ? profileInfo.filePath : previousFile,
        address: txtAddress,
      };

      console.log("userInfo", userInfo);
      saveProfileData(userInfo);
    }
  }

  function saveProfileData(userInfo) {
    if (netConnected) {
      saveUserDetail(userInfo, profileInfo.uid);

      dispatch(setUserInfo(userInfo));
      if (previousFile && profileInfo.filePath) {
        removeFileFromStorage(profileInfo.filePath, onFileDeleted);
      }

      setPreviousFile(null);
      setUpdating(false);
      navigation.goBack();
      ShowToast(toastTypes.success, alerts.profileUpdated);
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  function dismissCountryPicker() {
    setShowCountryPicker(false);
    setTimeout(() => {
      setLoadCP(false);
    }, 1000);
  }

  var fileUrl = imageUri;

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={false}>
      <MainHeader
        leftTitle={screenTitle.profileTitle}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        backCallBack={cleanUp}
        navigation={navigation}
      />

      <AppScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.profileTouchContainer}>
            <TouchableOpacity
              onPress={onPressEditImage}
              style={styles.profileContainer}
            >
              <FastImage
                defaultSource={IMAGES.ic_user_avatar}
                style={styles.imgStyle}
                source={{ uri: fileUrl }}
                resizeMode="cover"
              />
              {updating && (
                <ActivityIndicator
                  size="small"
                  color={COLORS.black}
                  style={styles.activityViewStyle}
                />
              )}
              <ImgSVG
                icon={SvgEditRounded}
                height={16}
                width={16}
                viewStyle={styles.editIconStyle}
              />
              {uploadingProfile && (
                <ActivityIndicator
                  size={"small"}
                  style={styles.imageIndicator}
                />
              )}
            </TouchableOpacity>
          </View>
          <CustomTextField
            label={personalInfo.displayName}
            text={displayNm}
            onChange={(v) => setDisplayNm(v)}
            isOptional={true}
          />

          <CustomTextField
            countryCodePicker={true}
            countryCode={countryCode}
            onPressCountryCode={() => {
              Keyboard.dismiss();
              setLoadCP(true);
              setShowCountryPicker(true);
            }}
            label={personalInfo.phone + ` (${personalInfo.optional})`}
            text={phone}
            maxLength={10}
            keyboardType={"phone-pad"}
            returnKeyType={"done"}
            onChange={(v) => {
              if (phone.length > v.length) {
                setPhone(v);
              } else if (
                textInputFilterFunction(
                  VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC,
                  v
                )
              ) {
                setPhone(v);
              }
            }}
            isOptional={true}
          />
          <CustomTextField
            label={personalInfo.email}
            text={email}
            onChange={(v) => setEmail(v)}
            isOptional={true}
            keyboardType={"email-address"}
            editable={false}
            viewStyle={styles.emailStyle}
          />

          <CustomTextField
            placeholder={personalInfo.address}
            label={personalInfo.address}
            multiline={true}
            numberOfLines={4}
            isOptional={true}
            viewStyle={styles.textLeadsInfoStyle}
            textInputStyle={styles.commentTextStyle}
            hideClearButton={true}
            text={txtAddress}
            maxLength={100}
            onChange={(v) => setTxtAddress(v)}
          />

          <AppCustomButton
            isLoading={updating}
            onPress={onSubmitHandler}
            title={auth.submit}
            disabled={updating}
            mainContainerStyle={{ marginTop: scale(10) }}
          />
        </View>
      </AppScrollView>
      <CustomImagePicker
        asVisible={imagePickerShow}
        onVisibleChange={onVisibleChange}
        onFilePathSelect={onFilePathSelect}
        cameraType={CAMERA_TYPE.front}
        canCrop={true}
        EnableDeleteOption={false}
      />
      {loadCP ? (
        <CountryPicker
          show={showCountryPicker}
          enableModalAvoiding={true}
          placeholderTextColor={COLORS.colorGray99}
          style={globalStyles.countryPickerStyle(keyboardHeight)}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            dismissCountryPicker();
          }}
          onBackdropPress={() => {
            dismissCountryPicker();
          }}
        />
      ) : null}
    </BaseContainer>
  );
}
