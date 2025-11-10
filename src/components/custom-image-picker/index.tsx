import React, {useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import ActionSheet from 'react-native-action-sheet-modal';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
  Permission,
  Rationale,
} from 'react-native-permissions';
import {
  ImagePickerResponse,
  PhotoQuality,
  Asset,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DeviceInfo from 'react-native-device-info';
// import DocumentPicker, {
//   isCancel,
//   isInProgress,
//   types,
// } from 'react-native-document-picker';

//Hooks
import {useSelector} from 'react-redux';

//Constants
import {
  CAMERA_TYPE,
  FILE_TYPE,
  PLATFORM_MOBILE,
  toastTypes,
} from '../../utils/app-enum';
import {APP} from '../../utils/constants';
import {getFileType} from '../../utils/helper-function';
import LocalizeText from "@/utils/text-localize";
import {normalizeText} from '../../utils/text-normalize';
import {FONTS} from '../../theme/typography';
import {COLORS} from '../../theme/colors';
import ShowToast from '../toast/app-toast';
import CustomModel from '../custom-model';

// Add interfaces for props
interface CustomImagePickerProps {
  asVisible: boolean;
  onVisibleChange: (visible: boolean) => void;
  onFilePathSelect: (files: ImagePickerResponse[]) => void;
}

export default function CustomImagePicker({
  asVisible,
  onVisibleChange,
  onFilePathSelect,
  selectionLimit = 1,
  canCrop = false,
  cameraType = CAMERA_TYPE.back,
  imageQuality = APP.IMAGE_QUALITY,
  EnableDeleteOption = false,
  EnableCameraOption = true,
  EnableDocumentOption = false,
  galleryPhotoType = 'photo', // mixed, photo, video
  //documentTypes = [types.pdf, types.images, types.video, types.doc, types.docx],
  //onDeleteCallback = () => {},
}) {
  const allOptions = fetchSheetOptions();
  const [cameraAlert, setCameraAlert] = useState(false);

  const inset = useSafeAreaInsets();

  const {alerts} = LocalizeText;

  const cameraPermission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  const galleryPermission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
  });

  // Permission
  function checkCameraPermissions() {
    if (Platform.OS === PLATFORM_MOBILE.IOS) {
      check(PERMISSIONS.IOS.CAMERA)
        .then(res => {
          console.log('iOS camera', res);
          if (res === RESULTS.BLOCKED) {
            toggleModal();
          }
        })
        .catch(e => console.log('handle permission iOS camera', e));
    } else {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(res => {
          console.log('android camera', res);
          if (res === RESULTS.DENIED) {
            toggleModal();
          }
        })
        .catch(e => console.log('handle permission android camera', e));
    }
  }

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {}
      return false;
    }
    return true;
  };

  // On choose option
  function onChange(value, extraData) {
    // console.log('Val', value);
    onVisibleChange(!asVisible);

    setTimeout(() => {
      console.log('value', value);
      if (value === LocalizeText.general.camera) {
        captureImage(galleryPhotoType);
      } else if (value === LocalizeText.general.photoLibrary) {
        chooseFile(galleryPhotoType);
      } else if (value === LocalizeText.general.document) {
        openDocumentPickerOption();
      } else if (value === LocalizeText.general.remove) {
        var data = new FormData();
        //data.append('name', loggedInUserInfo?.name);
        //data.append('email', loggedInUserInfo?.email);
        //data.append('profilePhotoRemove', 'Y');
      }
    }, 600);
  }

  const chooseFile = async type => {
    if (canCrop === true) {
      console.log("Can crop true");
      
      const permission = await isAllowPermission(galleryPermission);
      console.log("Permission", permission);
      ImagePicker.openPicker({
        width: APP.SQUARE_IMAGE_SIZE,
        height: APP.SQUARE_IMAGE_SIZE,
        cropping: true,
      })
        .then(image => {
          storeCroppedImage(image);
        })
        .catch(e => {
          console.log('Error', e);
          if (permission) {
            toggleModal();
          }
        });
      return;
    }
    let deviceVersion = DeviceInfo.getSystemVersion();
    let options = {
      mediaType: type,
      quality: imageQuality,
      selectionLimit: selectionLimit,
    };

    let isStoragePermitted = false;
    if (deviceVersion >= 13) {
      isStoragePermitted = true;
    } else {
      isStoragePermitted = await requestExternalWritePermission();
    }

    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('Camera cancel');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          console.log(response.errorMessage);
          return;
        }
        const asset = response.assets;
        if (selectionLimit > 1) {
          if (selectionLimit < asset.length) {
            // For Android Because this library not supporting Selection limit in Android
            finalizeAssetArray(response, true);
          } else {
            finalizeAssetArray(response, false);
          }
        } else {
          finalizeAssetArray(response, false);
        }
      });
    } else {
      checkLibraryPermissions();
    }
  };

  function openDocumentPickerOption() {
    /*DocumentPicker.pick({
      allowMultiSelection: false,
      type: [types.pdf, types.images, types.doc, types.docx],
    })
      .then(resp => {
        console.log('response file', resp);

        const firstAsset = resp[0];
        const fileObj = {
          fileName: firstAsset.name,
          fileSize: firstAsset.size,
          type: firstAsset.type, // image.mime
          uri: firstAsset.uri, // image.path
        };
        const fileSizeInMb = getFileSizeInMegaByte(fileObj);
        const fileMaxVal = getMaxValue(fileObj.type);
        if (fileSizeInMb < fileMaxVal) {
          onFilePathSelect(fileObj);
        } else {
          onFilePathSelect(null);
          ShowToast(toastTypes.error, alerts.fileSizeBigger);
        }
      })
      .catch(handleError);
      */
  }
  /*const handleError = err => {
    console.log('**** err', err);
    if (isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      ShowToast(toastTypes.error, 'Cancelled');

      onFilePathSelect(null);
    } else if (isInProgress(err)) {
      onFilePathSelect(null);
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      onFilePathSelect(null);

      throw err;
    }
  };*/

  function storeCroppedImage(image) {
    console.log('Cropped image', image);
    if (image) {
      var fileName = image.filename;
      if (image.filename == null) {
        fileName = image.path.substring(image.path.lastIndexOf('/') + 1);
      }
      const imageObj = {
        fileName: fileName,
        fileSize: image.fileSize ? image.fileSize : image.size,
        height: image.height,
        width: image.width,
        type: image.mime,
        uri: image.path,
      };
      onFilePathSelect(imageObj);
    }
  }

  const captureImage = async type => {
    let deviceVersion = DeviceInfo.getSystemVersion();
    if (canCrop === true) {
      const permission = await isAllowPermission(cameraPermission);
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      })
        .then(image => {
          storeCroppedImage(image);
        })
        .catch(e => {
          console.log('Error', e, permission);
          if (permission) {
            toggleModal();
          }
        });
      return;
    }

    let options = {
      mediaType: type,
      quality: APP.IMAGE_QUALITY,
      cameraType: cameraType,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = false;
    if (deviceVersion >= 13) {
      isStoragePermitted = true;
    } else {
      isStoragePermitted = await requestExternalWritePermission();
    }

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('Camera cancel');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          console.log('Other error', response.errorMessage);
          return;
        }
        finalizeAssetArray(response);
      });
    } else {
      checkCameraPermissions();
    }
  };

  async function isAllowPermission(permission) {
    const result = await request(permission);
    return result === RESULTS.BLOCKED;
  }

  function checkLibraryPermissions() {
    if (Platform.OS === PLATFORM_MOBILE.IOS) {
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(res => {
          if (res === RESULTS.BLOCKED) {
            toggleModal();
          }
        })
        .catch(e => console.log('handle permission iOS photo library', e));
    } else {
      check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then(res => {
          if (res === RESULTS.DENIED) {
            toggleModal();
          }
        })
        .catch(e => console.log('handle permission android photo library', e));
    }
  }

  const getMaxValue = type => {
    console.log('mime type', type);
    const fileType = getFileType(type);
    if (fileType === FILE_TYPE.Image) {
      return APP.MAX_IMAGE_SIZE;
    } else if (fileType === FILE_TYPE.Video) {
      return APP.MAX_VIDEO_SIZE;
    } else {
      return APP.MAX_FILE_SIZE;
    }
  };

  function finalizeAssetArray(response, isSlice) {
    console.log('response?.assets', response?.assets);

    if (response?.assets) {
      var validImages = [];
      response?.assets.map(asset => {
        const fileMaxVal = getMaxValue(asset.type);
        const fileSizeInMb = getFileSizeInMegaByte(asset);
        console.log('fileSizeInMb:', fileSizeInMb);
        if (fileSizeInMb < fileMaxVal) {
          validImages.push(asset);
        } else {
          ShowToast(toastTypes.error, LocalizeText.alerts.imageFileSizeBigger);
        }
      });
      var validFiles = validImages;
      if (isSlice) {
        validFiles = validImages.slice(0, selectionLimit);
      }
      if (validFiles.length === 0) {
        onFilePathSelect(null);
      } else {
        onFilePathSelect(validFiles[0]);
      }
    } else {
      const fileSizeInMb = getFileSizeInMegaByte(response);
      const fileMaxVal = getMaxValue(response.type);
      if (fileSizeInMb < fileMaxVal) {
        onFilePathSelect(response);
      }
    }
  }

  function getFileSizeInMegaByte(asset) {
    let fileSizeInMb = asset.fileSize / 1000000;
    return fileSizeInMb;
  }

  const toggleModal = () => {
    setCameraAlert(!cameraAlert);
  };

  const onClickCancel = () => {
    setCameraAlert(!cameraAlert);
  };

  function fetchSheetOptions() {
    let baseOptions = [
      {
        name: LocalizeText.general.photoLibrary,
        value: LocalizeText.general.photoLibrary,
        extraData: {type: 'gallery'},
      },
    ];
    if (EnableCameraOption) {
      baseOptions.push({
        name: LocalizeText.general.camera,
        value: LocalizeText.general.camera,
        extraData: {type: 'camera'},
      });
    }
    if (EnableDocumentOption) {
      baseOptions.push({
        name: LocalizeText.general.document,
        value: LocalizeText.general.document,
        extraData: {type: 'document'},
      });
    }

    if (EnableDeleteOption) {
      baseOptions.push({
        name: LocalizeText.general.remove,
        value: LocalizeText.general.remove,
        extraData: {type: 'remove'},
      });
    }
    return baseOptions;
  }

  return (
    <View>
      <ActionSheet
        options={allOptions}
        isVisible={asVisible}
        onClose={() => {
          onVisibleChange(!asVisible);
        }}
        onChange={onChange}
        hideCancel={false}
        cancelText="Cancel"
        cancelTextStyle={{
          fontFamily: FONTS.Medium,
          fontSize: normalizeText(APP.FONT_SIZE_13),
        }}
        cancelContainerStyle={{backgroundColor: COLORS.white}}
        optionsTextStyle={{
          fontFamily: FONTS.Medium,
          fontSize: normalizeText(APP.FONT_SIZE_13),
        }}
        optionsContainerStyle={{backgroundColor: COLORS.white}}
        modalProps={{
          animationInTiming: 500,
          marginBottom: inset.bottom,
        }}
      />
      <CustomModel
        isVisible={cameraAlert}
        handleBackDropPress={() => setCameraAlert(false)}
        title={LocalizeText.alerts.permission}
        subTitle={LocalizeText.alerts.allowCamera}
        firstButtonTitle={LocalizeText.general.openSetting}
        secondButtonTitle={LocalizeText.general.cancel}
        firstButtonBGColor={COLORS.black}
        secondButtonBGColor={COLORS.white}
        onPressFirstButton={() => {
          setCameraAlert(false);
          openSettings().catch(() => {});
        }}
        onPressSecondButton={onClickCancel}
      />
    </View>
  );
}
