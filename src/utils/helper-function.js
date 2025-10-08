import {globNavigationRef} from './root-navigation';
import {CommonActions} from '@react-navigation/native';
import {SCREEN} from '../constants/screen-name';
import {FILE_MIME_TYPES, FILE_TYPE} from '../constants/constants';
import {
  setIsUserLogIn,
  setNotificationCount,
  setUserInfo,
  setUserRefreshToken,
  setUserToken,
} from '../redux/reducers/userInfo-reducer';

import {store} from '../redux/store/store';
import {NavigateTo} from './helper-navigation';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';

import RNFS from 'react-native-fs';
import {DATE_FORMAT, format_Date} from './date-helper';
import {show_log} from '@/constants';

export function getFileType(mimeType) {
  const type = mimeType.toLowerCase();
  if (type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png') {
    return FILE_TYPE.Image;
  } else if (
    type === 'video/mp4' ||
    type === 'video/mov' ||
    type === 'video/m4v' ||
    type === 'video/quicktime'
  ) {
    return FILE_TYPE.Video;
  } else {
    return FILE_TYPE.File;
  }
}

export function hasArrayAndLength(arr = [], specificLength = 0) {
  return Array.isArray(arr) && arr.length > specificLength;
}

export function isEven(number) {
  return number % 2 === 0 ? true : false;
}

export function createArray(N) {
  return [...Array(N).keys()].map(i => i + 1);
}

export function apiResMsg(url) {
  return 'API response of: ' + url + '\n';
}

export function isStringNull(string) {
  if (string == null) {
    return true;
  }
}

export function isEmptyObject(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
  // return Object.keys(obj).length === 0;
}

export function trimString(text = '') {
  if (text) {
    return text.trim();
  }
  return '';
}

export function validString(text = '', checkLength = false, length = 2) {
  if (text) {
    if (checkLength) {
      const trimmedText = trimString(text);
      return trimmedText.length > length ? true : false;
    } else {
      return trimString(text).length ? true : false;
    }
  }
  return false;
}

export function isJsonString(str = '') {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function isLastScreen(navigation) {
  const routes = navigation.getState().routes || [];
  // show_log('isLastScreen: routes', routes);
  const routesLength = routes?.length;
  return routesLength == 1 ? true : false;
}

export function capitalizeFirstLetter(str) {
  const newStr = `${str}`;
  if (!newStr) return newStr; // Check for empty string
  return newStr?.charAt(0)?.toUpperCase() + newStr.slice(1);
}

export function containsHttp(str) {
  const regex = /https?:\/\//; // Matches "http://" or "https://"
  return regex.test(str);
}

export function resetNavigationStack(screenName) {
  const screen_name = screenName ? screenName : SCREEN.landingScreen;
  globNavigationRef?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screen_name}],
    }),
  );
}

// Function to remove multiple keys and return a new object without modifying the original one
export function removeKeys(obj, keysToRemove) {
  // Use reduce to create a new object excluding the keys in keysToRemove
  return Object.keys(obj).reduce((acc, key) => {
    if (!keysToRemove.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export function logoutHelper() {
  const dispatch = store.dispatch;

  dispatch(setIsUserLogIn(false));
  dispatch(setUserInfo(null));
  dispatch(setUserToken(null));
  dispatch(setNotificationCount(null));
  dispatch(setUserRefreshToken(null));

  NavigateTo(SCREEN.landingScreen);
}

export const formatBedsBathValue = value => {
  if (!value || value == null) {
    return '0';
  } else if (typeof value === 'number') {
    return value.toString();
  } else if (
    typeof value === 'object' &&
    value.hasOwnProperty('min') &&
    value.hasOwnProperty('max') &&
    (value?.min != null || value?.max != null)
  ) {
    if (value.min === value.max) {
      return value.max.toString();
    } else {
      return `${value.min}-${value.max}`;
    }
  } else {
    return '0';
  }
};
export const priceFormat = (price, includeDecimals = true) => {
  if (isNaN(price)) {
    return '$0';
  }

  // Convert the price to a string and split it into integer and decimal parts
  let [integerPart, decimalPart] = Number(price)
    .toFixed(includeDecimals ? 2 : 0)
    .split('.');

  // Add commas as thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the integer part and the decimal part
  let formattedPrice = includeDecimals
    ? `${integerPart}.${decimalPart}`
    : integerPart;

  // Add the dollar sign
  return `$${formattedPrice}`;
};
export const formatPriceValue = (price, decimal = true) => {
  // Helper function to format individual price values
  // const priceFormat = (price, decimal) => {
  //   if (typeof price === 'number' || typeof price === 'string') {
  //     const formattedPrice = parseFloat(price);
  //     if (isNaN(formattedPrice)) {
  //       return 'Invalid value';
  //     }

  //     // Ensure two decimal places if fractional part exists or decimal flag is true
  //     const formatted =
  //       decimal || formattedPrice % 1 !== 0
  //         ? formattedPrice.toFixed(2)
  //         : formattedPrice.toFixed(0);

  //     // Add a dollar sign and handle negative values
  //     const formattedWithCommas = parseFloat(formatted).toLocaleString(); // Adds comma for thousands separator

  //     // Shift the negative sign before the price value instead of the dollar sign
  //     return formattedPrice < 0
  //       ? `-$${formattedWithCommas.slice(1)}` // Remove the negative sign from the formatted value and prepend it
  //       : `$${formattedWithCommas}`;
  //   }
  //   return 'Invalid value';
  // };

  // Return 'NA' for invalid or undefined prices
  if (!price) {
    return 'NA';
  } else if (typeof price === 'number' || typeof price === 'string') {
    return priceFormat(price, decimal);
  } else if (
    typeof price === 'object' &&
    price.min !== undefined &&
    price.max !== undefined
  ) {
    if (price.min === price.max) {
      return priceFormat(price?.max, decimal);
    } else {
      const formattedMin = priceFormat(price.min, decimal);
      const formattedMax = priceFormat(price.max, decimal);
      return `${formattedMin} - ${formattedMax}`;
    }
  } else {
    return 'Invalid value';
  }
};

export function convertJsonToFormData(jsonData) {
  const formData = new FormData();

  // Function to handle nested objects recursively
  function appendNestedData(prefix, value) {
    if (value === null || value === undefined || value == 'null') return;
    // Check if the value is a non-null object
    if (value && value instanceof Date && !isNaN(value)) {
      if ([`birthDate`].includes(prefix)) {
        formData.append(prefix, format_Date(value, DATE_FORMAT.YYYY_MM_DD));
      } else {
        formData.append(prefix, value.toISOString());
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // If it's an object, iterate over its keys

      Object.keys(value).forEach(key => {
        appendNestedData(`${prefix}[${key}]`, value[key]);
      });
    } else if (Array.isArray(value)) {
      // If it's an array, check if it's empty
      if (value.length > 0) {
        value.forEach((item, index) => {
          appendNestedData(`${prefix}[${index}]`, item);
        });
      }
    } else {
      // If it's not an object or array, append the value directly
      formData.append(prefix, value);
    }
  }

  // Loop through all the keys in the JSON object
  Object.keys(jsonData).forEach(key => {
    const value = jsonData[key];

    // Skip null or undefined fields
    if (value === null || value === undefined || value == 'null') return;

    // Handle 'profile_picture' for both array of files and string
    if (
      key === 'profile_picture' ||
      key === 'property_picture' ||
      key === 'bill'
    ) {
      if (Array.isArray(value) && value?.length > 0) {
        value.forEach(file => {
          if (typeof file === 'string') {
            return;
          } else {
            formData.append(key, {
              uri: file.uri,
              type: file.type,
              name: file.fileName,
            });
          }
        });
      } else if (typeof value === 'string') {
        return; // Append string directly
      }
    }
    // Handle current_address and any nested objects
    else if (typeof value === 'object') {
      appendNestedData(key, value);
    }
    // For primitive types (strings, numbers, etc.), directly append them
    else {
      formData.append(key, value);
    }
  });

  return formData;
}
export function convertJsonToFormDataForDeals(
  jsonData,
  documents,
  documents_key,
  buyer_Documents,
  buyer_documents_key,
) {
  const formData = new FormData();

  // Function to handle nested objects recursively
  function appendNestedData(prefix, value) {
    // Check if the value is a non-null object
    if (value && value instanceof Date && !isNaN(value)) {
      formData.append(prefix, value.toISOString());
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // If it's an object, iterate over its keys

      Object.keys(value).forEach(key => {
        appendNestedData(`${prefix}[${key}]`, value[key]);
      });
    } else if (Array.isArray(value)) {
      // If it's an array, check if it's empty
      if (value.length > 0) {
        value.forEach((item, index) => {
          appendNestedData(`${prefix}[${index}]`, item);
        });
      }
    } else {
      // If it's not an object or array, append the value directly
      formData.append(prefix, value);
    }
  }

  // Loop through all the keys in the JSON object
  Object.keys(jsonData).forEach(key => {
    const value = jsonData[key];

    // Skip null or undefined fields
    if (value === null || value === undefined) return;

    // Handle 'profile_picture' for both array of files and string
    if (key === 'profile_picture' || key === 'property_picture') {
      if (Array.isArray(value) && value?.length > 0) {
        value.forEach(file => {
          if (typeof file === 'string') {
            return;
          } else {
            formData.append(key, {
              uri: file.uri,
              type: file.type,
              name: file.fileName,
            });
          }
        });
      } else if (typeof value === 'string') {
        return; // Append string directly
      }
    }
    // Handle current_address and any nested objects
    else if (typeof value === 'object') {
      appendNestedData(key, value);
    }
    // For primitive types (strings, numbers, etc.), directly append them
    else {
      formData.append(key, value);
    }
  });

  // Handle extraData if provided
  if (documents) {
    if (documents?.length > 0) {
      documents.forEach(doc => {
        formData.append(documents_key, {
          uri: doc.uri,
          type: doc.type,
          name: doc.name,
        });
      });
    }
  }
  if (buyer_Documents) {
    if (buyer_Documents?.length > 0) {
      buyer_Documents.forEach(doc => {
        formData.append(buyer_documents_key, {
          uri: doc.uri,
          type: doc.type,
          name: doc.name,
        });
      });
    }
  }

  return formData;
}

export function cleanJson(obj) {
  // removes undefined and null values from a JSON object
  if (obj && obj instanceof Date && !isNaN(obj)) {
    return obj?.toISOString();
  } else if (Array.isArray(obj)) {
    return obj
      .map(cleanJson)
      .filter(item => item !== undefined && item !== null);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = cleanJson(value);
      if (
        cleanedValue !== undefined &&
        cleanedValue !== null &&
        cleanedValue !== ''
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
  } else {
    return obj;
  }
}

export function getInitials(fullName) {
  const nameParts = fullName.split(' ');

  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}

export const requestPermissions = async () => {
  if (Platform.OS === 'ios') return true;

  const apiLevel = Platform.Version;

  const permissionArr =
    apiLevel >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

  try {
    const result = await request(permissionArr);

    switch (result) {
      case RESULTS.GRANTED:
        return RESULTS.GRANTED;
      case RESULTS.DENIED:
        return RESULTS.DENIED;
      case RESULTS.BLOCKED:
        return RESULTS.BLOCKED;
    }
  } catch (error) {
    console.error('Permission request failed:', error);
  }
};

export const get_url_extension = url => {
  return url && url.split(/[#?]/)[0].split('.').pop().trim();
};

export function removeFileExtension(filename) {
  if (typeof filename !== 'string') return ''; // Check if filename is a string

  // Use regex to remove the extension (anything after the last dot)
  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExtension;
}

export const displayCommissionValue = (
  amt = '',
  type = '',
  calculatedAmount = '',
) => {
  if (Number(amt) == 0 || calculatedAmount == null) return '-';

  // return type === 'flat'
  //   ? formatPriceValue(amt)
  //   : `${calculatedAmount} (${amt}%)`; //removed according to client requirement
  return type === 'flat' ? formatPriceValue(amt) : `${amt}%`;
};

export const containsWord = (str, word) => str.includes(word);

export function formatPhoneNumber(input) {
  if (!input) {
    input = '';
  }
  input = input?.toString()?.replace(/\D/g, '');
  input = input.substring(0, 10);
  if (input.length === 0) {
    return input;
  }
  if (input.length < 4) {
    input = '(' + input;
  } else if (input.length < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input =
      '(' +
      input.substring(0, 3) +
      ') ' +
      input.substring(3, 6) +
      '-' +
      input.substring(6, 10);
  }
  return input;
}

export function formatPhoneNumberWithCode(input) {
  if (input == null) {
    input = '';
  }
  input = input.replace(/\D/g, '');
  input = input.substring(0, 10);
  if (input.length === 0) {
    return input;
  }
  if (input.length < 4) {
    input = '(' + input;
  } else if (input.length < 7) {
    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
  } else {
    input =
      '+' +
      input.substring(0, 1) +
      ' (' +
      input.substring(1, 4) +
      ') ' +
      input.substring(4, 7) +
      '-' +
      input.substring(7, 10);
  }
  return input;
}

export const displayValue = (value = '', type = 'text') => {
  if (value) {
    return value;
  }
  return '-';
};

export const convertTextToHtml = text => {
  // Convert plain text to HTML (wrap it with <p> tags)
  return `<p>${text.replace(/\n/g, '<br>')}</p>`; // Handling line breaks if necessary
};

export const LOG_API_RES = (url = '', res = {}) => {
  show_log('API Response \nURL = ' + url + '\n', res);
};

export const formatCompactNumber = num => {
  if (typeof num !== 'number' || isNaN(num)) return '0'; // Handle non-numeric values
  if (num < 0) return `-${formatCompactNumber(-num)}`; // Handle negative numbers

  if (num < 1000) return num.toString();
  if (num >= 1e12) return (num / 1e12).toFixed(1).replace(/\.0$/, '') + 'T'; // Trillions
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B'; // Billions
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'; // Millions
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'; // Thousands
};

export const navigateToFileViewer = async (file, ref) => {
  let finalUri = file?.uri;

  if (
    file?.type === FILE_MIME_TYPES.pdf &&
    Platform.OS === 'android' &&
    containsWord(file?.uri, 'content:')
  ) {
    finalUri =
      'data:application/pdf;base64,' +
      (await RNFS.readFile(file?.uri, 'base64'));
  }

  if (ref) ref?.current?._hideSheet();

  setTimeout(() => {
    NavigateTo(SCREEN.documentViewerScreen, {
      uri: finalUri,
      type:
        file?.type === FILE_MIME_TYPES.pdf ? FILE_TYPE.Pdf : FILE_TYPE.Image,
    });
  }, 100);
};

export const priceFormatCanadianMasking = (value = '', decimal = false) => {
  if (value === '' || value === null || value === undefined) return '';

  // Keep decimal part typed by the user (if any)
  const parts = value?.toString()?.split('.');
  const integerPart = parts[0]?.replace(/,/g, '');
  const decimalPart = parts[1] || '';

  const numericValue = parseFloat(integerPart);
  if (isNaN(numericValue)) return value;

  let formatted = numericValue.toLocaleString('en-CA');

  if (decimal && parts?.length > 1) {
    // Add decimal back (but limit to 2 digits)
    formatted += '.' + decimalPart?.slice(0, 2);
  }

  return formatted;
};

export const sumNumbers = (...args) => {
  return args
    .map(val => parseFloat(val) || 0) // Convert to number or fallback to 0
    .reduce((sum, num) => sum + num, 0);
};

export function getFullName(firstName = '', lastName = '') {
  if (firstName && lastName)
    return `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
      lastName,
    )}`;
  return (
    capitalizeFirstLetter(firstName) || capitalizeFirstLetter(lastName) || '-'
  );
}

export function keyExtractor(item, index, customKey = '') {
  if (customKey) {
    return item[customKey]?.toString();
  } else {
    if (item?.id) {
      return item?.id?.toString();
    } else {
      return index?.toString();
    }
  }
}

export function formatCommission(commissionType, calculatedAmount, value) {
  if (commissionType === 'percent') {
    return `${priceFormat(calculatedAmount)} (${value}%)`;
  } else {
    return `${priceFormat(value)}`;
  }
}

export const generateQueryParams = params => {
  return Object.entries(params)
    .filter(
      ([, value]) => value !== undefined && value !== '' && value !== null,
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
};

export const getYearList = (startYear = 2015) => {
  const currentYear = new Date().getFullYear();
  return Array.from(
    {length: currentYear - startYear + 1},
    (_, i) => currentYear - i,
  );
};

export const getFilterDateTime = date => {
  return new Date(format_Date(date, DATE_FORMAT.YYYY_MM_DD)).toString();
};
