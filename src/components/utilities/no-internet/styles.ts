import { SPACING } from '@/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.SPACE_15,
  },
  subContainer: {
    flex: 1,
    padding: SPACING.SPACE_15,
    borderRadius: SPACING.SPACE_15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    marginTop: SPACING.SPACE_10,
  },
  textSubTitle: {
    marginTop: SPACING.SPACE_10,
    textAlign: 'center',
  },
  btn: {
    marginTop: SPACING.SPACE_20,
  },
});

export default styles;
