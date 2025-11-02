import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notification_raw_data } from './constants';
import { IMAGES } from './image-path';

/**
 *
 * @param {*} from This methods called from Foreground state || Background state.
 * @param {*} message Messages is data payload from firebase FCM.
 */

export async function handleAppNotifications(from, message) {
  // console.log('******Foreground******:', message);
  const {sound = '', data = {}, notification = {}} = message;
  const {title = '', body = ''} = notification;
  //const screenJsonData = JSON.parse(data?.screen_data);

  const final_title = title ? title : notification_raw_data.title;
  const final_body = body ? body : notification_raw_data.message;
  const final_sound = sound ? sound : notification_raw_data.soundName;
  const final_data_payload = data ? data : {};

  // Android/iOS
  const common_payload = {
    title: final_title,
    message: final_body,
    playSound: notification_raw_data.playSound,
    soundName: final_sound,
    userInfo: final_data_payload,
    largeIcon: IMAGES.app_logo,
    smallIcon: 'ic_notification',
    bigLargeIcon: IMAGES.app_logo,
  };

  const android_payload = {
    ...common_payload,
    // Android only
    channelId: notification_raw_data.channelId,
    importance: 'max',
    visibility: 'public',
    vibrate: true,
  };

  const ios_payload = {
    ...common_payload,
  };

  const final_notification_payload =
    Platform.OS === 'android' ? android_payload : ios_payload;

  /*const RoomCode = await AsyncStorage.getItem('chatroom');
  if (RoomCode === screenJsonData?.room_id) {
    console.log('RoomCode',RoomCode);
  } else {*/
    PushNotification.localNotification(final_notification_payload);
  //}
}
