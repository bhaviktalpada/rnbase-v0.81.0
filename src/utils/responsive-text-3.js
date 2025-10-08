import {Dimensions, Platform, PixelRatio, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const BASE_SCREEN_WIDTH = 320;
const BASE_SCREEN_HEIGHT = 568;

const scale = SCREEN_WIDTH / BASE_SCREEN_WIDTH;
const scaleVertical = SCREEN_HEIGHT / BASE_SCREEN_HEIGHT;

export function accurateNormalize(size) {
  const newSize = size * scale;
  let finalNewSize = 0;
  if (Platform.OS === 'ios') {
    finalNewSize = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  } else {
    finalNewSize = Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
  // show_log(
  //   "accurateNormalize",
  //   getDeviceNameSync(),
  //   "Font size = ",
  //   finalNewSize
  // );
  return finalNewSize;
}

export function accurateNormalizeVertical(size) {
  const newSize = size * scaleVertical;
  let finalNewSize = 0;
  if (Platform.OS === 'ios') {
    finalNewSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    finalNewSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  // show_log(
  //   "accurateNormalizeVertical",
  //   getDeviceNameSync(),
  //   "Font size = ",
  //   finalNewSize
  // );
  return finalNewSize;
}

export function isTab() {
  if (SCREEN_WIDTH > 550) {
    return true;
  } else {
    return false;
  }
}

export function isScreenHeight770() {
  if (SCREEN_HEIGHT > 740 && SCREEN_HEIGHT < 760) {
    return true;
  } else {
    return false;
  }
}

export function getFontSize(fontSize) {
  return isTab()
    ? accurateNormalizeVertical(fontSize)
    : accurateNormalize(fontSize);
}

const styles = StyleSheet.create({
  // Without PixelScaling
  normal: {
    marginTop: 17,
    marginBottom: 17,
    paddingTop: 17,
    paddingBottom: 17,
    marginLeft: 17,
    marginRight: 17,
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 17,
    width: 17,
    height: 17,
  },

  // using PixelScaling

  ForTopBottom: {
    marginTop: accurateNormalizeVertical(17),
    marginBottom: accurateNormalizeVertical(17),
    paddingTop: accurateNormalizeVertical(17),
    paddingBottom: accurateNormalizeVertical(17),
  },
  ForLeftRight: {
    marginLeft: accurateNormalize(17),
    marginRight: accurateNormalize(17),
    paddingLeft: accurateNormalize(17),
    paddingRight: accurateNormalize(17),
  },
  ForFonts: {
    fontSize: accurateNormalize(17),
  },
  ForImage: {
    width: accurateNormalize(17),
    height: accurateNormalizeVertical(17),
  },
  ForTab: {
    marginTop: isTab()
      ? accurateNormalizeVertical(29)
      : accurateNormalizeVertical(17),
    marginBottom: isTab()
      ? accurateNormalizeVertical(29)
      : accurateNormalizeVertical(17),
    marginLeft: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    marginRight: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    paddingTop: isTab()
      ? accurateNormalizeVertical(29)
      : accurateNormalizeVertical(17),
    paddingBottom: isTab()
      ? accurateNormalizeVertical(29)
      : accurateNormalizeVertical(17),
    paddingLeft: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    paddingRight: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    fontSize: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    width: isTab() ? accurateNormalize(29) : accurateNormalize(17),
    height: isTab() ? accurateNormalize(29) : accurateNormalize(17),
  },
});
