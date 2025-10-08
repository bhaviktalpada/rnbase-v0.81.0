import validator from 'validator';
import * as Yup from 'yup';
// options is an optional object that can be supplied with the following
// key(s): ignore which can either be a String or RegExp of characters to be ignored
// e.g. " " will ignore spaces.
// Docs: https://github.com/validatorjs/validator.js

export const validateEmailString = email => {
  return validator.isEmail(email) == true ? true : false;
};

export const validateAlphanumericString = v => {
  return validator.isAlphanumeric(v, undefined, {ignore: ' '}) == true
    ? true
    : false;
};

export const validateAlphaString = v => {
  return validator.isAlpha(v, undefined, {ignore: ' '}) == true ? true : false;
};

export const validateNumericString = v => {
  return validator.isNumeric(v) == true ? true : false;
};

export const validatePassword = Value => {
  const getPassword = Value || '';
  const re =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!?<>()@#$%^&*])[A-Za-z0-9!?<>()@#$%^&*]{8,20}$/;
  return re.test(getPassword);
};
export const validate_GST = Value => {
  const re = /^\d{9}[A-Za-z]{2}\d{4}$/;

  return re.test(Value);
};

export const VALIDATE_FILTER_TYPE = {
  ONLY_ALPHABETICAL: 'ONLY_ALPHABETICAL',
  ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES:
    'ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES',
  ALLOW_ONLY_NUMERIC_VALUES: 'ALLOW_ONLY_NUMERIC_VALUES',
  ALLOW_ALPHANUMERIC_AND_SPACE_VALUES: 'ALLOW_ALPHANUMERIC_AND_SPACE_VALUES',
  ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE:
    'ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE',
  ALLOW_ONLY_ONE_DECIMAL: 'ALLOW_ONLY_ONE_DECIMAL',
  ALLOW_ONLY_NUMERIC: 'ALLOW_ONLY_NUMERIC',
};

export function textInputFilterFunction(filterType, value) {
  switch (filterType) {
    case VALIDATE_FILTER_TYPE.ONLY_ALPHABETICAL: {
      return value.replace(/[^a-z]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES: {
      return value.replace(/[^a-z ]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC_VALUES: {
      return value.replace(/[^0-9]/g, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ALPHANUMERIC_AND_SPACE_VALUES: {
      return value.replace(/[^a-z 0-9]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE: {
      return value.replace(/[^a-z 0-9\n]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_ONE_DECIMAL: {
      const regex = /^\d+(\.\d{0,2})?$/;

      if (regex.test(value) || value === '') {
        return true;
      } else {
        return false;
      }
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC: {
      const regex = /^\d+$/;

      if (regex.test(value) || value === '') {
        return true;
      } else {
        return false;
      }
    }

    default: {
      return value;
    }
  }
}

export const VALIDATE_KEY = {
  firstName: 'keyFirstName',
  lastName: 'keyLastName',
  additionalCost: 'keyAdditionalCost',
};

// FORM VALIDATIONS
export const UN_REQUIRED_FIELD = Yup.string();
export const REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required('This field is required!');
export const ALPHABETIC_REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required('This field is required!')
  .matches(/^[a-zA-Z\s]+$/, 'Allow only alphabetic characters');
export const ALPHANUMERIC_REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required('This field is required!')
  .matches(/^[a-zA-Z0-9]+$/, 'Allow only alphanumeric characters');

export const EMAIL_FIELD = Yup.string()
  .trim()
  .required('This field is required!')
  .email('Invalid email address!')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email address!',
  );
export const PHONE_FIELD = Yup.string()
  .transform((value, originalValue) =>
    originalValue ? originalValue.trim() : null,
  )
  .required('This field is required!')
  .matches(/^\d{10}$/, {
    message: 'Invalid phone number',
    excludeEmptyString: true,
  });
export const PHOTO_FIELD = Yup.mixed()
  .test('fileType', 'Only image file are allowed', function (value) {
    if (!value) return true; // Skip validation if no file is provided
    const supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = value?.name?.split('.').pop().toLowerCase(); // Safe access
    return supportedFormats.includes(fileExtension);
  })
  .test('fileSize', 'File size must be less than 2MB', function (value) {
    if (!value) return true; // Skip validation if no file is provided
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    return value?.size <= maxSizeInBytes; // Safe access
  });
export const PASSWORD = Yup.string()
  .trim()
  .required('This field is required!')
  .min(8, 'Password must contain 8 characters!')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/\\])/,
    'Password must contain uppercase, lowercase, special characters, and a numeric value',
  );
export const CONFIRM_PASSWORD = Yup.string()
  .trim()
  .required('This field is required!')
  .min(8, 'Password must contain 8 characters!')
  .oneOf([Yup.ref('password'), null], 'Passwords must match');
export const REQUIRED_SELECT_BOX = Yup.object()
  .shape({
    label: Yup.string().trim().required('This field is required!'),
    value: Yup.string().trim().required('This field is required!'),
  })
  .nullable()
  .required('This field is required!');
export const REQUIRED_PRICE_FIELD = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === '' ? undefined : value,
  )
  .required('This field is required!')
  .typeError('Invalid price!')
  .positive('Price must be positive!')
  .moreThan(0, 'Price must be greater than 0!');
export const REQUIRED_CHECKBOX_FIELD = Yup.boolean()
  .oneOf([true], 'This field is required!') // Ensures the value is `true`
  .required('This field is required!');

export const REQUIRED_NUMBER_FIELD = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === '' ? undefined : value,
  )
  .required('This field is required!')
  .typeError('Invalid value!')
  .positive('Value must be positive!');

export const NUMBER_FIELD_OPTIONAL = Yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue === '' ? undefined : value,
  )
  .typeError('Invalid value!')
  .min(0, 'Value must be greater than or equal to 0!');

export const ALPHABETIC_FIELD_OPTIONAL = Yup.string()
  .trim()
  .nullable()
  .optional()
  .test('is-alphabetic', 'Allow only alphabetic characters', value => {
    if (!value) return true; // If the field is empty, it is valid.
    return /^[a-zA-Z\s]+$/.test(value); // Only run the regex if there is a value.
  });
export const EMAIL_FIELD_OPTIONAL = Yup.string()
  .trim()
  .optional()
  .nullable()
  .email('Invalid email address!');
export const PHONE_FIELD_OPTIONAL = Yup.string()
  .transform((value, originalValue) =>
    originalValue ? originalValue.trim() : null,
  )
  .nullable()
  .optional()
  .matches(/^\d{10}$/, {
    message: 'Invalid phone number',
    excludeEmptyString: true,
  });
export const URL_REQUIRED_FIELD = Yup.string()
  .trim()
  .nullable()
  .required('This field is required!')
  .url('Invalid URL format');
export const DATE_OF_BIRTH_FIELD = Yup.date().required(
  'Date of birth is required',
);
export const DATE_REQUIRED = Yup.date().required('This field is required!');
export const REQUIRED_FIELD_NOT_NULL = Yup.string()
  .trim()
  .nonNullable()
  .required('This field is required!');
export const REQUIRED_OBJECT_FIELD = Yup.object()
  .shape({
    id: Yup.string().trim().nullable().required('This field is required!'),
    // You can define additional fields here as needed
  })
  .required('This field is required!');
export const ALPHANUMERIC_BETWEEN_SPACE = Yup.string()
  .trim()
  .nullable()
  .required('This field is required!')
  .matches(/^[a-zA-Z0-9\s]*$/, 'Allow only alphanumeric characters');

export const DATE_OF_BIRTH_FIELD_OPTIONAL = Yup.date().nullable().optional();
