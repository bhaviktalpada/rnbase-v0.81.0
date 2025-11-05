import { COLORS } from '@/theme';
import {StyleSheet, Alert, Keyboard} from 'react-native';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  profileView: {},
  mainContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emailStyle: {
    backgroundColor: COLORS.colorLightGray99,
    marginBottom: scale(10),
  },
  profileContainer: {
    height: scale(80),
    width: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: scale(80),
    width: scale(80),
    alignItems: 'center',
    borderRadius: scale(40),
    borderWidth: scale(1),
    borderColor: COLORS.colorLightestGrayE0,
  },
  editIconStyle: {
    position: 'absolute',
    bottom: scale(5),
    right: scale(5),
  },
  activityViewStyle: {position: 'absolute', alignSelf: 'center', zIndex: 1},
  profileTouchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
  },
  imageIndicator: {position: 'absolute', alignSelf: 'center'},
  textLeadsInfoStyle: {
    height: scale(100),
    borderWidth: 1,
  },
  commentTextStyle: {
    textAlignVertical: 'top',
    paddingTop: scale(5),
    paddingBottom: scale(5),
  },
});
