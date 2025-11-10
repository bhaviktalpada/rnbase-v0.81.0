import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import CustomImagePicker from '@/components/custom-image-picker';
import AppCustomButton from '@/components/app-custom-button';
import ImgSVG from '@/utils/image-svg';
import { SvgClose } from '@/assets/svg/svg-close';
import { APP } from '@/utils/constants';
import AppMediumText from '@/components/utilities/app-medium-text';
import { IMAGES, SVGFile } from '@/utils/images-path';
import { ShowToast } from '@/components/toast';
import { CAMERA_TYPE, toastTypes } from '@/utils/app-enum';
import { createNewBannerRequest, firebaseDeleteBanner, getAllBanners, removeFileFromStorage, storeFilePath } from '@/utils/firebase-db-helper';
import { BaseContainer } from '@/components/utilities';
import MainHeader from '@/components/utilities/header';
import { styles } from './styles';
import { COLORS } from '@/theme';
import LogoutCustomModel from '@/components/logout-dialog';
import LocalizeText from '@/utils/text-localize';
import { SvgEditRounded } from '@/assets/svg/svg-edit-rounded';


// import {ICON_NAME} from '../../../components/custom-vector-icon';


export default function AddBannerView({navigation, route}) {
  const {screenTitle, alerts, auth, general} = LocalizeText;
  const netConnected = useSelector(v => v.netInfoReducer.isConnected);
  const [imagePickerShow, setImagePickerShow] = useState(false);
  const [previousFile, setPreviousFile] = useState(null);
  const [imageUri, setImageUri] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deleteBanner, setDeleteBanner] = useState(null);

  //Delete banner
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    configureOnboarding();
  }, []);

  function configureOnboarding() {
    getAllBanners(onResponse);
  }

  function onResponse(banners) {
    console.log('on all Banner', banners);
    if (banners) {
      setPhotos(banners);
    }
  }

  function onVisibleChange(child) {
    setImagePickerShow(child);
  }

  function onFilePathSelect(child) {
    console.log('**** File Select', child);
    setImageUri(child.uri);

    if (netConnected) {
      if (previousFile) {
        removeFileFromStorage(previousFile, onFileDeleted);
        setPreviousFile(null);
      }

      setUpdating(true);
      const newTime = new Date().getTime();
      const prepFileName = `banner/${newTime}_${child.fileName}`;
      setPreviousFile(prepFileName);
      storeFilePath(child.uri, prepFileName, onFileUpload);
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  const onFileUpload = (fullPath, downloadUrl) => {
    console.log('**** F Path', fullPath);
    console.log('**** downloadUrl', downloadUrl);
    setFilePath(fullPath);
    setImageUri(downloadUrl);
    setUpdating(false);
  };

  // Edit Image action sheet
  function onPressEditImage() {
    if (!updating) {
      setImagePickerShow(!imagePickerShow);
    }
  }

  const onClickDelete = routeName => {
    console.log('deleteBanner', deleteBanner.filePath);
    if (deleteBanner) {
      removeFileFromStorage(deleteBanner.filePath, onFileDeleted);
      setDeleteBanner(null);
      getAllBanners(onResponse);
      setIsModalVisible(false);
      firebaseDeleteBanner(deleteBanner.bannerId, onDeleteDbRecord);
    }
  };

  const onChooseFileDelete = () => {
    if (filePath) {
      removeFileFromStorage(filePath, onFileDeleted);
      setFilePath(null);
    }
  };

  const onFileDeleted = () => {
    console.log('File deleted callback');
  };

  const onDeleteDbRecord = () => {
    console.log('Firebase db banner deleted');
  };

  function onPressSubmitHandler() {
    if (netConnected) {
      if (filePath == null) {
        ShowToast(toastTypes.error, alerts.pleaseSelectFile);
      } else {
        const bannerInfo = {
          bannerUrl: imageUri,
          filePath: filePath,
          redirect: 'webView',
          type: 'normal',
        };
        createNewBannerRequest(bannerInfo, onRecordUpdate);
        ShowToast(toastTypes.success, alerts.bannerAddedSuccess);
        navigation.goBack();
      }
    } else {
      ShowToast(toastTypes.error, alerts.internetConnection);
    }
  }

  function onRecordUpdate(snap) {
    console.log('on all Banner', snap);
  }

  return (
    <BaseContainer isTopSafeArea={false} isBottomSafeArea={true}>
      <MainHeader
        leftTitle={screenTitle.addBanner}
        showLeftIcon
        leftIconSize={14}
        iconSize={18}
        navigation={navigation}
      />
      <View style={styles.profileTouchContainer}>
        {photos?.length > 0 && (
          <View style={styles.swiperContainer}>
            <Swiper showsButtons={false}>
              {photos?.map((item, index) => {
                const source = {uri: item?.bannerUrl};
                return (
                  <View key={index} style={styles.imageSwiper}>
                    <FastImage
                      defaultSource={IMAGES.ic_user_avatar}
                      key={index}
                      style={{flex: 1}}
                      source={source}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setDeleteBanner(item);
                        setIsModalVisible(true);
                      }}>
                      <ImgSVG
                        icon={SvgEditRounded}
                        height={20}
                        width={20}
                        viewStyle={styles.editIconStyle}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Swiper>
          </View>
        )}
        <View style={styles.chooseFileView}>
          <TouchableOpacity
            onPress={onPressEditImage}
            style={styles.bannerContainer}>
            <View>
              <FastImage
                defaultSource={IMAGES.ic_avtar_image}
                style={styles.imgStyle}
                source={{uri: imageUri}}
                resizeMode="cover"
              />
              <ImgSVG
                icon={SvgEditRounded}
                height={16}
                width={16}
                viewStyle={styles.editIconStyle}
              />
            </View>

            {updating && (
              <ActivityIndicator size={'small'} style={styles.imageIndicator} />
            )}
          </TouchableOpacity>
          <AppMediumText
            style={{marginLeft: 10}}
            sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
            color={COLORS.colorGray6C}>
            {general.chooseBanner}
          </AppMediumText>
          {filePath && (
            <TouchableOpacity
              activeOpacity={APP.ACTIVE_OPACITY}
              style={styles.deleteView}
              onPress={onChooseFileDelete}>
              <ImgSVG icon={SvgClose} width={13} height={13} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginHorizontal: scale(20), marginTop: scale(10)}}>
          <AppCustomButton
            isLoading={updating}
            onPress={onPressSubmitHandler}
            title={auth.submit}
            disabled={updating}
          />
        </View>
      </View>

      <CustomImagePicker
        asVisible={imagePickerShow}
        onVisibleChange={onVisibleChange}
        onFilePathSelect={onFilePathSelect}
        cameraType={CAMERA_TYPE.front}
        EnableDeleteOption={false}
      />
      <LogoutCustomModel
        isVisible={isModalVisible}
        handleBackDropPress={() => setIsModalVisible(false)}
        handleBackButtonPress={() => setIsModalVisible(false)}
        iconName={SVGFile.svgLogout}
        title={general.delete}
        subTitle={general.confirmDeleteBanner}
        firstButtonTitle={general.delete}
        secondButtonTitle={general.cancel}
        firstButtonBGColor={COLORS.colorRed}
        secondButtonBGColor={COLORS.white}
        onPressFirstButton={onClickDelete}
        onPressSecondButton={() => {
          setIsModalVisible(!isModalVisible);
        }}
      />
    </BaseContainer>
  );
}
