import { View } from 'react-native';
import React from 'react';
import { BaseContainer } from '@/components/utilities';
import styles from './account-screen-styles';

import AppRegularText from '@/components/utilities/app-regular-text';
import { COLORS } from '@/theme';

export function AccountScreen() {
  
  return (
    <BaseContainer isBottomSafeArea={false}>
      <View style={styles.container}>
        <AppRegularText fontFamily="Regular" size={14} color={COLORS.black}>
          Text-Regular-14
        </AppRegularText>
      </View>
    </BaseContainer>
  );
}
