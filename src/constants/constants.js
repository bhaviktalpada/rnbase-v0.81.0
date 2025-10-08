import { scale } from "react-native-size-matters";

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

export const APP = {
  MAX_IMAGE_SIZE: 25, // 25 MB
  MAX_VIDEO_SIZE: 10, // 3 MB
  MAX_FILE_SIZE: 25, // 25 MB
  MAX_EMAIL_FILE_SIZE: 25, // 25 MB
  IMAGE_QUALITY: 0.4,
  BACK_ICON_SIZE: 16,
  SQUARE_IMAGE_SIZE: 500,
  BORDER_WIDTH: scale(1),
  TEXT_FIELD_BORDER_RADIUS: scale(5),
  TEXT_FIELD_HEIGHT: scale(35),
  TEXT_FIELD_SEARCH_HEIGHT: 44,
  APP_NOTIFICATION_COUNT_FONT_SIZE: 8,
  LONG_DIGIT_NOTIFICATION_COUNT: "99+",
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
