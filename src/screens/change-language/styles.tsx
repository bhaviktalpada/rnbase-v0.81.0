import { COLORS } from '@/theme';
import { normalizeText } from '@/utils';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  list: { margin: 20 },
   option: {
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.colorC5,
    borderRadius: 6,
    marginBottom: 10
  },
optionText: {
    fontSize: 16,
    color: COLORS.black
  },
  selectedOptionText: {
    color: COLORS.caribbeanGreen,
    fontWeight: 'bold'
  },
  selectedOption: {
    backgroundColor: COLORS.colorLightGreen,
    borderColor: COLORS.colorGreen
  },
  version_view_style: {
      padding: 5,
      borderColor: COLORS.primary,
      //borderWidth: 1,
      borderRadius: 5,
      fontSize: normalizeText(12),
    },
})