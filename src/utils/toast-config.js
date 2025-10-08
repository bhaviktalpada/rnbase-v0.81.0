import React from 'react';
import { StyleSheet } from 'react-native';
import * as RnToast from 'react-native-toast-message';
import { getModerateScaleValue } from '@/theme/global-styles';
import { normalizeText } from './responsive-text';
import { COLORS, FONTS } from '@/theme';

// return null
export const toastConfig = {
  success: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container(
        COLORS.primary,
        COLORS.white,
      )}
      text1NumberOfLines={0}
      text1Style={styles.text1Style(COLORS.primary)}
    />
  ),
  error: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container(
        COLORS.colorRed,
        COLORS.white,
      )}
      text1NumberOfLines={0}
      text1Style={styles.text1Style(COLORS.primary)}
    />
  ),
  info: props => (
    <RnToast.BaseToast
      {...props}
      style={styles.container()}
      text1NumberOfLines={0}
      text1Style={styles.text1Style()}
    />
  ),
};

const styles = StyleSheet.create({
  container: (color = COLORS.primary, color2 = COLORS.white) => ({
    height: 'auto',
    width: '85%',
    borderLeftColor: color,
    paddingVertical: getModerateScaleValue(10),
    backgroundColor: color2,
  }),
  text1Style: color => ({
    fontFamily: FONTS.Medium,
    fontSize: normalizeText(11),
    color: color,
    letterSpacing: 0.5,
    marginVertical: getModerateScaleValue(0.5),
  }),
});
