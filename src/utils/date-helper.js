import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import moment from 'moment';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

export const DATE_FORMAT = {
  DD_MMM_YYY_HHmm_A: 'DD MMM YYYY, hh:mm A',
  YYYY_MM_DD_HHmm_24: 'YYYY-MM-DD HH:mm',
  DD_MMM_YYYY: 'DD MMM YYYY',
  DD_MMM: 'DD MMM',
  DD_MMMM: 'DD MMMM',
  DD_MMMM_YYYY: 'DD MMMM YYYY',
  YYYY_MM_DD: 'YYYY-MM-DD',
  MMM_YYYY: 'MMM YYYY',
  DD: 'DD',
  HHmm: 'HH:mm',
  HHmm_A: 'hh:mm A',
  HHmm_a: 'hh:mm a',
  hhmmss: 'hh:mm:ss',
  HHmmss: 'HH:mm:ss',
  UTC: 'YYYY-MM-DDTHH:mm',
  FULL_DATE: 'YYYY-MM-DD HH:mm:ss',
  HHmm_24: 'HH:mm',
};

export const current_Date = () => {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '/' + month + '/' + year + ' ' + hours + ':' + min);
  }, []);
  return currentDate;
};

// ++++++++++++++++++++++++++++++++passing CurrentDate++++++++++++++
export const current_Date_DayJs = () => {
  return dayjs().format(DATE_FORMAT.DD_MMM_YYY_HHmm_A);
};

export const current_Date_DayJs_For_Calender = () => {
  return dayjs().format(DATE_FORMAT.YYYY_MM_DD);
};

// ++++++++++++++++++++++++++Formated Date++++++++++++++++++++++++++++++++++++++++

export const format_Date = (date, format) => {
  const f_Date = dayjs(date).format(format);
  return f_Date == 'Invalid Date' ? '' : f_Date;
  // const f_Date = moment(date, format);
  // show_log('date, format', date, format);
  // show_log('f_Date', f_Date.toDate());
  // return;
  // return f_Date == 'Invalid Date' ? '' : f_Date.toISOString();
};
export const format_Date_utc_to_utc = (date, format) => {
  const f_Date = moment(date).utc().format(format);
  return f_Date == 'Invalid Date' ? '' : f_Date;
};

export const format_string_date_toDate = date => {
  // Parse the string date into a moment object
  const momentObject = moment(date, 'DD MMMM YYYY');

  // Convert moment object to Date object
  return momentObject.toDate();
};

export const DATE_TODAY = dateFormat => {
  const dF = dateFormat ? dateFormat : DATE_FORMAT.YYYY_MM_DD;
  return dayjs().format(dF);
};

/**
 *
 * @param_javascript_date_object_or_formatted_date_string
 */

export const GET_DATE_RANGE = periodKey => {
  const currentDate = dayjs();

  let startDate;
  let endDate;

  const currentYear = currentDate.year();

  switch (periodKey) {
    case 'Q1':
      startDate = dayjs(`${currentYear}-01-01`).startOf('day').add(1, 'day');
      endDate = dayjs(`${currentYear}-03-31`).endOf('day');
      break;
    case 'Q2':
      startDate = dayjs(`${currentYear}-04-01`).startOf('day').add(1, 'day');
      endDate = dayjs(`${currentYear}-06-30`).endOf('day');
      break;
    case 'Q3':
      startDate = dayjs(`${currentYear}-07-01`).startOf('day').add(1, 'day');
      endDate = dayjs(`${currentYear}-09-30`).endOf('day');
      break;
    case 'Q4':
      startDate = dayjs(`${currentYear}-10-01`).startOf('day').add(1, 'day');
      endDate = dayjs(`${currentYear}-12-31`).endOf('day');
      break;
    case 'WEEK':
      startDate = currentDate
        .startOf('week')
        .add(2, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0);
      endDate = currentDate
        .endOf('week')
        .add(2, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0);
      break;
    case 'MONTH':
    case 'YEAR':
      startDate = currentDate
        .startOf(periodKey.toLowerCase())
        .add(1, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0);
      endDate = currentDate
        .endOf(periodKey.toLowerCase())
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59);
      break;

    default:
      if (/^\d{4}$/.test(periodKey)) {
        // If periodKey is a year string like "2025"
        startDate = dayjs(`${periodKey}-01-01`).startOf('day').add(1, 'day');
        endDate = dayjs(`${periodKey}-12-31`).endOf('day');
      } else {
        // fallback to current year
        startDate = dayjs().startOf('year').add(1, 'day');
        endDate = dayjs().endOf('year');
      }
      break;
  }

  return {
    startDate: startDate.toDate().toUTCString(),
    endDate: endDate.toDate().toUTCString(),
  };
};

export const formatEmailDate = dateString => {
  if (!dateString) return '';

  const date = dayjs(dateString);

  if (date.isToday()) return date.format('hh:mm A');
  if (date.isYesterday()) return 'Yesterday';
  if (date.isSame(dayjs(), 'week')) return date.format('dddd'); // e.g., Monday
  if (date.isSame(dayjs(), 'year')) return date.format('MMM D'); // e.g., Mar 6

  return date.format('DD MMM YYYY').toUpperCase(); // e.g., 06 MAR 2024
};

export const formatBirthdayDate = (birthdate, keepOriginalYear = false) => {
  try {
    if (!birthdate) return ''; // Default fallback

    const datePart = birthdate.split('T')[0]; // Extract only date part
    const [year, month, day] = datePart.split('-').map(Number);

    if (!year || !month || !day) return new Date(); // Invalid date fallback

    const finalYear = keepOriginalYear ? year : new Date().getFullYear();
    return new Date(finalYear, month - 1, day); // JS months are 0-indexed
  } catch (error) {
    return new Date(); // Always safe fallback
  }
};

export const isPlanExpired = date => {
  if (!date) return true;
  const today = new Date();
  const end = new Date(date);
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) {
    return true;
  } else {
    return false;
  }
};
