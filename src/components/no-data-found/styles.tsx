import {StyleSheet} from 'react-native';

import {screenWidth} from '../../utils/dimensions';
import {scale} from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { normalizeText } from '@/utils';


export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewStyle: {
    width: screenWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: normalizeText(16),
    textAlign: 'center',
    color: COLORS.primary,
    marginTop: 20,
  },
  textMessage: {
    fontSize: normalizeText(14),
    color: COLORS.colorGray6C,
    textAlign: 'center',
  },
  imgStyle: {
    height: scale(100),
    width: scale(100),
  },
});
