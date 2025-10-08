import { moderateScale } from 'react-native-size-matters';
import { normalizeText } from '../utils/responsive-text';
import { FONTS } from './typography';
import { COLORS } from './colors';

const ACTIVE_OPACITY = 0.85;

const SPACING = {
  SPACE_5: getModerateScaleValue(5),
  SPACE_10: getModerateScaleValue(10),
  SPACE_15: getModerateScaleValue(15), // Using this as app vertical app
  SPACE_20: getModerateScaleValue(20),
  customSpace: (v = 0) => getModerateScaleValue(v),
  SPACE_5_PCT: '5%', // Using this as app horizontal app
};

const RADIUS = {
  RADIUS_1: getModerateScaleValue(1),
  RADIUS_5: getModerateScaleValue(5),
  RADIUS_10: getModerateScaleValue(10),
  RADIUS_15: getModerateScaleValue(15),
  RADIUS_20: getModerateScaleValue(20),
};
const GLOBAL_PADDING = getModerateScaleValue(15);
const TEXT_FIELD_HEIGHT = getModerateScaleValue(40);
const BORDER_STYLE =
  () =>
  (
    borderWidth = getModerateScaleValue(1),
    borderColor = COLORS.gray_lite,
    borderRadius = RADIUS.RADIUS_10,
  ) => ({
    borderWidth,
    borderColor,
    borderRadius,
  });

const MARGIN_LEFT = (v = 0) => ({
  marginLeft: getModerateScaleValue(v),
});

const MARGIN_RIGHT = (v = 0) => ({
  marginRight: getModerateScaleValue(v),
});

function getModerateScaleValue(value = 0) {
  return moderateScale(value);
}

const GLOBAL_STYLES = () => ({
  SPACING_5: { height: SPACING.SPACE_5 },
  SPACING_10: { height: SPACING.SPACE_10 },
  SPACING_15: { height: SPACING.SPACE_15 },
  SPACING_20: { height: SPACING.SPACE_20 },
  HEADER_HEIGHT: getModerateScaleValue(50),
  SHEET_HEADER_STYLE: {
    height: getModerateScaleValue(50),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getModerateScaleValue(15),
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    elevation: 4,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: -5,
      height: 5,
    },

    shadowOpacity: 0.152,
    shadowRadius: 2.5,
  },
});

export const AWESOME_CANCEL_BTN_STYLE = () => ({
  borderColor: COLORS.primary,
  borderWidth: getModerateScaleValue(1),
  height: getModerateScaleValue(40),
  width: '48%',
  paddingHorizontal: getModerateScaleValue(20),
  alignItem: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.white,
  borderRadius: getModerateScaleValue(25),
});
export const AWESOME_CONFIRM_BTN_STYLE = () => ({
  height: getModerateScaleValue(40),
  width: '48%',
  paddingHorizontal: getModerateScaleValue(20),
  alignItem: 'center',
  justifyContent: 'center',
  borderRadius: getModerateScaleValue(25),
});
export const AWESOME_TITLE_STYLE = () => ({
  fontFamily: FONTS.Medium,
  textAlign: 'center',
  fontSize: normalizeText(18),
  color: COLORS.primary,
});
export const AWESOME_MESSAGE_STYLE = () => ({
  fontFamily: FONTS.Medium,
  textAlign: 'center',
  fontSize: normalizeText(14),
  paddingTop: 0,
});
export const AWESOME_CONTENT_CONTAINER_STYLE = (
  
) => ({
  paddingBottom: getModerateScaleValue(10),
  paddingHorizontal: getModerateScaleValue(10),
  borderRadius: SPACING.SPACE_10,
});
export const AWESOME_CONFIRM_BUTTON_TEXT_STYLE = () => ({
  fontFamily: FONTS.Medium,
  textAlign: 'center',
  fontSize: normalizeText(12),
});
export const AWESOME_CANCEL_BUTTON_TEXT_STYLE = () => ({
  fontFamily: FONTS.Medium,
  color: COLORS.black,
  textAlign: 'center',
  fontSize: normalizeText(12),
});

export const ACTIVE_STYLE_ACTION_FIELD = () => ({
  marginHorizontal: SPACING.SPACE_15,
  color: COLORS.black,
});
export const INACTIVE_STYLE_ACTION_FIELD = {
  marginHorizontal: SPACING.SPACE_15,
  color: COLORS.textColorGray768188,
};

interface RgbToRgbaWithOpacity {
  (rgbString: string, opacity?: number): string;
}

const rgbToRgbaWithOpacity: RgbToRgbaWithOpacity = (
  rgbString,
  opacity = 0.1,
) => {
  // Split the input string into an array of RGB values
  const [r, g, b] = rgbString
    .split(',')
    .map((val: string) => parseInt(val.trim(), 10));

  // Return the RGBA string with the specified opacity
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

interface PercentageToDecimal {
  (percentage: string): number;
}

const percentageToDecimal: PercentageToDecimal = percentage => {
  return parseInt(percentage.replace('%', '')) / 100;
};

interface hexToRgbaWihOpacity {
  (hex: string, opacity?: string): string;
}
const hexToRgbaWihOpacity: hexToRgbaWihOpacity = (hex, opacity = '100%') => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${percentageToDecimal(opacity)})`;
};

const TRANSPARENT_LOADER = () => ({
  flex: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: hexToRgbaWihOpacity(COLORS.sheetBackground, '50%'),
});

/**
 * Export variables
 */
export {
  SPACING,
  RADIUS,
  ACTIVE_OPACITY,
  GLOBAL_PADDING,
  TEXT_FIELD_HEIGHT,
  GLOBAL_STYLES,
  TRANSPARENT_LOADER,
};

/**
 * Export function
 */

export {
  getModerateScaleValue,
  BORDER_STYLE,
  MARGIN_RIGHT,
  MARGIN_LEFT,
  rgbToRgbaWithOpacity,
  hexToRgbaWihOpacity,
};
