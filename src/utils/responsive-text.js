import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// show_log('SCREEN_WIDTH:',SCREEN_WIDTH);

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalizeText(size) {
  const newSize = size * scale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
