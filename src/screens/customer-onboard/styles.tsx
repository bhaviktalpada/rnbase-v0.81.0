import { COLORS } from '@/theme';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';


export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: scale(15),
    marginVertical: scale(15),
  },
  swiperContainer: {
    height: 214,
    //width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.colorTransparent,
    //borderRadius: 20,
    //marginTop: scale(10),
  },
  imageSwiper: {
    height: '100%',
    width: '100%',
    //borderRadius: 20,
  },
});
