import {Dimensions, Platform, PixelRatio} from 'react-native';
import {PLATFORM_MOBILE} from './app-enum';

//Constant

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalizeText(size) {
  const newSize = size * scale;
  if (Platform.OS === PLATFORM_MOBILE.IOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
