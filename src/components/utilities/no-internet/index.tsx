import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BaseContainer from '../base-container';
import { NoInternetSvgComponent } from '@/assets/svg';
import LocalizeText from "@/utils/text-localize";
import AppRegularText from '../app-regular-text';
import styles from './styles';
import { COLORS } from '@/theme';

type NoInternetType = {};

const NoInternet: React.FC<NoInternetType> = ({}) => {
  const { alerts } = LocalizeText;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaProvider>
      <BaseContainer isBottomSafeArea={false}>
        <View
          style={{
            ...styles.container,
            backgroundColor: COLORS.primary,
          }}
        >
          <View
            style={{
              ...styles.subContainer,
              backgroundColor: COLORS.white,
            }}
          >
            <NoInternetSvgComponent />

            <AppRegularText
              color={COLORS.primary}
              style={styles.textTitle}
            >
              {alerts.networkUnavailable}
            </AppRegularText>

            <AppRegularText
              style={styles.textSubTitle}
              color={COLORS.colorRed}
            >
              {alerts.internetConnection}
            </AppRegularText>
          </View>
        </View>
      </BaseContainer>
    </SafeAreaProvider>
  );
};

export { NoInternet };
