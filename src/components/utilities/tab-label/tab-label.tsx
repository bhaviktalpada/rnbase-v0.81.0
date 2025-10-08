import {StyleSheet, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import AppRegularText from '../app-regular-text';
import { COLORS } from '@/theme';

type TabLabelProps = {
  value: string;
  focused: boolean;
};

const TabLabel = ({value, focused}: TabLabelProps) => {
  return (
    <View style={styles.mainContainer}>
      <AppRegularText
        fontFamily="Medium"
        size={14}
        color={COLORS.white}
        numberOfLines={1}
        style={styles.labelStyle}>
        {value}
      </AppRegularText>
    </View>
  );
};

export default TabLabel;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: scale(5),
  },
  labelStyle: {
    textAlign: 'center',
    width: '100%',
  },
});
