import { COLORS, GLOBAL_PADDING } from '@/theme';
import { normalizeText } from '@/utils';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  version_container: {
    width: '100%',
    backgroundColor: COLORS.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(5),
  },
  version_view_style: {
    padding: 5,
    borderColor: COLORS.primary,
    //borderWidth: 1,
    borderRadius: 5,
    fontSize: normalizeText(12),
  },
});

export default styles;
