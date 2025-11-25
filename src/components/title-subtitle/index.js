import {StyleSheet, View} from 'react-native';
import { scale } from 'react-native-size-matters';
import AppBoldText from '@utilities/app-bold-text';
import AppRegularText from '@utilities/app-regular-text';
import { normalizeText } from '@/utils';
import { COLORS } from '@/theme';

const TitleContent = ({Title, subTitle, titleStyle, subtitleStyle}) => {
  return (
    <View style={styles.viewContainer}>
      <AppBoldText style={[styles.titleStyle, titleStyle]}>{Title}</AppBoldText>
      <AppRegularText style={[styles.subTextStyle, subtitleStyle]}>
        {subTitle}
      </AppRegularText>
    </View>
  );
};

export default TitleContent;

const styles = StyleSheet.create({
  viewContainer: {marginBottom: scale(10)},
  titleStyle: {
    fontSize: normalizeText(24),
    textAlign: 'center',
    color: COLORS.colorOrange,
  },
  subTextStyle: {
    fontWeight: '400',
    fontSize: normalizeText(14),
    fontStyle: 'normal',
    textAlign: 'center',
    color: COLORS.colorGray6C,
    marginVertical: scale(5),
  },
});
