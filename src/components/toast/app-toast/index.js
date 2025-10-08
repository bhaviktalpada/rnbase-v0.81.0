import { getModerateScaleValue } from '@/theme';
import Toast from 'react-native-toast-message';


export function ToastError(text, position, bottomOffset, visibilityTime) {
  return Toast.show({
    type: 'error',
    text1: text ? text : 'Default Text',
    position: position ? position : 'top',
    visibilityTime: visibilityTime ? visibilityTime : 2500,
    autoHide: true,
    bottomOffset: bottomOffset ? bottomOffset : 60,
    topOffset: getModerateScaleValue(70),
    swipeable: false,
  });
}

export function ToastInfo(text, position, bottomOffset, visibilityTime) {
  return Toast.show({
    type: 'info',
    text1: text ? text : 'Default Text',
    position: position ? position : 'top',
    visibilityTime: visibilityTime ? visibilityTime : 2500,
    autoHide: true,
    bottomOffset: bottomOffset ? bottomOffset : 60,
    topOffset: getModerateScaleValue(70),
    swipeable: false,
  });
}
export function ToastSuccess(text, position, bottomOffset, visibilityTime) {
  return Toast.show({
    type: 'success',
    text1: text ? text : 'Default Text',
    position: position ? position : 'top',
    visibilityTime: visibilityTime ? visibilityTime : 2500,
    autoHide: true,
    bottomOffset: bottomOffset ? bottomOffset : 60,
    topOffset: getModerateScaleValue(70),
    swipeable: false,
  });
}
