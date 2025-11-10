import { COLORS } from '@/theme';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: scale(80),
    width: scale(80),
    alignItems: 'center',
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
    justifyContent: 'center',
    marginTop: scale(10),
  },
  imageIndicator: {position: 'absolute', alignSelf: 'center'},
  imageSwiper: {
    height: '100%',
    width: '100%',
    
  },
  swiperContainer: {
    height: 214,
    alignSelf: 'center',
    backgroundColor: COLORS.colorTransparent,
  },
  deleteView: {
    height: scale(24),
    width: scale(24),
    backgroundColor: COLORS.colorOrange,
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseFileView: {
    marginHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
});
