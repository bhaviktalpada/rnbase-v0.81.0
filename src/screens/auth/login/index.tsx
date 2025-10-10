
import { View } from 'react-native';
import React from 'react';
import { BaseContainer } from '@/components/utilities';
import styles from './styles';

import AppRegularText from '@/components/utilities/app-regular-text';
import { COLORS } from '@/theme';
import MainHeader from '@/components/utilities/header';
import { BackIconSvg } from '@/assets/svg';

export default function LoginScreen() {

  console.log("Show Home");
  
  return (
    <BaseContainer  isTopSafeArea={false}>
      <MainHeader />
      <View style={styles.container}>
        <AppRegularText fontFamily="Light" size={20} color={COLORS.red_dark}>
          Login
        </AppRegularText>
      </View>
    </BaseContainer>
  );
}
