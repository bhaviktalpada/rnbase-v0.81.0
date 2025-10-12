import {StyleSheet, Text} from 'react-native';
//Constant
import { COLORS } from '../../theme/colors';
import { FONTS } from '../../theme/typography';
import { normalizeText } from '../../utils/text-normalize';


const AppCustomText = ({
  children,
  style,
  onPress,
  numberOfLines = 1,
  fontFamily = FONTS.Bold,
  fontWeight = '600',
  sizeFont = 20,
  color = COLORS.black,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        styles.textStyle(fontFamily, fontWeight, sizeFont, color),
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppCustomText;

const styles = StyleSheet.create({
  textStyle: (familyFont, weightFont, fontSize, color) => ({
    fontFamily: familyFont,
    color: color,
    // fontWeight: weightFont,
    fontSize: normalizeText(fontSize),
  }),
});
