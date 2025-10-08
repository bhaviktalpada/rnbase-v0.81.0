import { View } from 'react-native';
import React from 'react';
import { BaseContainer } from '@/components/utilities';
import styles from './home-screen-styles';

import AppRegularText from '@/components/utilities/app-regular-text';
import { COLORS } from '@/theme';

export default function HomeScreen() {

  return (
    <BaseContainer  isBottomSafeArea={false}>
      <View style={styles.container}>
        <AppRegularText fontFamily="Light" size={20} color={COLORS.red_dark}>
          Coming Soon
        </AppRegularText>
      </View>
    </BaseContainer>
  );
}
