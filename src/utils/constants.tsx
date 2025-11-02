import { Platform } from "react-native";
import {TestIds} from 'react-native-google-mobile-ads';
import { scale } from "react-native-size-matters";


export const APP = {
  SHOW_LOG: true,
  PAGE_LIMIT_TEN: 10,
  MAX_IMAGE_SIZE: 3, // 3 MB
  MAX_VIDEO_SIZE: 10, // 3 MB
  MAX_FILE_SIZE: 10, // 10 MB
  ACTIVE_OPACITY: 0.65, //
  IMAGE_QUALITY: 0.4, //
  ABOUT_US_LINK: "https://husmapp.blogspot.com/2025/01/husm-app.html",
  CONTACT_US_LINK:
    "https://husmapp.blogspot.com/2025/01/contact-hindu-utsav-samiti.html",
  IOS_URL: "https://apps.apple.com/us/app/husm/id6740768429",
  SHEET_ID: "1yHBCz3zgMiP6CWIjnyJnGL6152xl2j3ARfl7eBKD1Ho",

  PRIVACY_POLICY: "https://husmapp.blogspot.com/2025/05/privacy-policy.html",
  TERMS_CONDITION: "https://husmapp.blogspot.com/2025/05/terms-conditions.html",
  API_VERSION: 'v2',

  SQUARE_IMAGE_SIZE: 500,
  LONG_DIGIT_NOTIFICATION_COUNT: "99+",

  APP_SCREEN_HORIZONTAL_PADDING: scale(15),
  APP_SCREEN_VERTICAL_PADDING: scale(15),
  APP_SCREEN_HORIZONTAL_MARGIN: scale(5),
  APP_SCREEN_VERTICAL_MARGIN: scale(5),

  // Images or Icons Size
  DIST_BETWEEN_HEADER_CONTENT: scale(10),
  HEADER_HEIGHT: scale(44),
  BORDER_WIDTH: scale(1),
  COMMON_UNDERLINE_HEIGHT: scale(2),
  THIN_BORDER_HEIGHT: scale(0.6),

  BACK_ICON_SIZE: 16,

  TEXT_FIELD_BORDER_RADIUS: scale(5),
  TEXT_FIELD_HEIGHT: scale(35),
  TEXT_FIELD_SEARCH_HEIGHT: 44,
  TEXT_FIELD_LABEL_WITH_HEIGHT: scale(65),

  DISTANCE_BETWEEN_SEGMENT_TABS: scale(14),

  //Fonts Size
  AUTH_TITLE_FONT_SIZE: 20,
  DEFAULT_SEGMENT_FONT_SIZE: 15,
  DEFAULT_INPUT_FONT_SIZE: 12,
  MAIN_HEADER_RIGHT_FONT_SIZE: 13,
  MAIN_HEADER_LEFT_FONT_SIZE: 15,
  FONT_SIZE_10: 10,
  FONT_SIZE_11: 11,
  FONT_SIZE_12: 12,
  FONT_SIZE_13: 13,
  FONT_SIZE_14: 14,
  DEFAULT_TEXT_INPUT_LABEL_SIZE: 11,
  APP_NOTIFICATION_COUNT_FONT_SIZE: 8,
  EVENT_STATUS_FONT_SIZE: 8,
};

export const ROLES = {
  guest: 'guest',
  vendor: 'vendor',
  admin: 'admin',
};
export const CLIENT_STAGE = [
  {label: 'Lead', value: 'lead'},
  {label: 'Seller', value: 'seller'},
  {label: 'Buyer', value: 'buyer'},
  {label: 'Nurture', value: 'nurture'},
  {label: 'Referral', value: 'referral'},
  {label: 'Investor', value: 'investor'},
  {label: 'Seller & Buyer', value: 'seller_buyer'},
  {label: 'Stale Lead', value: 'stale_lead'},
];

export const STATUS_TYPE = [
  {label: 'Active', value: 'Active'},
  {label: 'Inactive', value: 'Inactive'},
];
export const HOME_TYPE = [
  {label: 'Traditional', value: 'traditional'},
  {label: 'Modern', value: 'modern'},
  {label: 'Apartment', value: 'apartment'},
  {label: 'Bungalow', value: 'bungalow'},
  {label: 'Condominium', value: 'condominium'},
  {label: 'Detached', value: 'detached'},
  {label: 'Semi-detached', value: 'semi_detached'},
  {label: 'Townhouse', value: 'townhouse'},
  {label: 'Duplex', value: 'duplex'},
  {label: 'Triplex', value: 'triplex'},
];

export const BED_BATH_TYPE = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5+', value: '5'},
];

export const YES_NO_TYPE = [
  {label: 'Yes', value: true},
  {label: 'No', value: false},
];
export const BASEMENT_TYPE = [
  {label: 'Fully Finished', value: 'fully_finished'},
  {label: 'Unfinished', value: 'unfinished'},
  // {label: 'Partial', value: 'partial'},
  // {label: 'None', value: 'none'},
];

export const YARD_TYPE = [
  {label: 'Front Yard', value: 'front_yard'},
  {label: 'Backyard', value: 'backyard'},
  {label: 'Both', value: 'both'},
  {label: 'None', value: 'none'},
];

export const GARAGE_TYPE = [
  {label: 'Single', value: 'single_garage'},
  {label: 'Double', value: 'double_garage'},
  {label: 'Triple+', value: 'triple_garage'},
  {label: 'Single Detached', value: 'single_detached'},
  {label: 'Double Detached', value: 'double_detached'},
  {label: 'Multiple Detached', value: 'multiple_detached'},
  {label: 'Shop', value: 'shop'},
  {label: 'None', value: 'none'},
];

export const RELATIONSHIP_TYPE = [
  {label: 'Spouse', value: 'spouse'},
  {label: 'Parent', value: 'parent'},
  {label: 'Child', value: 'child'},
  {label: 'Sibling', value: 'sibling'},
  {label: 'Friend', value: 'friend'},
  {label: 'Business Partner', value: 'business_partner'},
  {label: 'Agent', value: 'agent'},
  {label: 'Tenant', value: 'tenant'},
  {label: 'Landlord', value: 'landlord'},
  {label: 'Other', value: 'other'},
];

export const PLATFORM_TYPE = [
  {label: 'Facebook', value: 'facebook'},
  {label: 'Instagram', value: 'instagram'},
  {label: 'Twitter', value: 'twitter'},
  {label: 'LinkedIn', value: 'linkedin'},
  {label: 'YouTube', value: 'youtube'},
  {label: 'Pinterest', value: 'pinterest'},
  {label: 'Snapchat', value: 'snapchat'},
  {label: 'TikTok', value: 'tiktok'},
  {label: 'WhatsApp', value: 'whatsapp'},
  {label: 'Other', value: 'other'},
];

export const CAMERA_TYPE = {
  back: 'back',
  front: 'front',
};

export const FILE_TYPE = {
  Image: 'Photo',
  Video: 'Video',
  File: 'File',
  Pdf: 'Pdf',
};

export const API_OBJECTS = {
  showErrorToast: {
    showErrorToast: true,
  },
  showSuccessToast: {
    showSuccessToast: true,
  },
  showConfigLog: {
    showConfigLog: true,
  },
  showResponseLog: {
    showResponseLog: true,
  },
  showResponseErrorLog: {
    showResponseErrorLog: true,
  },
  useNormalBody: {
    useNormalBody: true,
  },
  headersForFcm: {
    headersForFcm: true,
  },
};

export const COMMON_API_CONFIG = {
  ...API_OBJECTS.showSuccessToast,
  ...API_OBJECTS.showErrorToast,
  ...API_OBJECTS.showConfigLog,
};

export const SHOW_API_TOAST = {
  ...API_OBJECTS.showSuccessToast,
  ...API_OBJECTS.showErrorToast,
};


  export const bannerAdUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Platform.OS === 'ios'
    ? 'ca-app-pub-1831898334292921/7914265602'
    : 'ca-app-pub-1831898334292921/7096546958';
