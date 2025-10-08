import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BaseContainer from '../base-container';
import { NoInternetSvgComponent } from '@/assets/svg';
import LocalizeText from '@/localization/text-localize';
import AppRegularText from '../app-regular-text';
import { COLORS } from '@/theme';

type NoInternetType = {};

const NoInternet: React.FC<NoInternetType> = ({}) => {
  const { labels, buttons } = LocalizeText;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaProvider>
      <BaseContainer>
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
              {labels.networkUnavailable}
            </AppRegularText>

            <AppRegularText
              style={styles.textSubTitle}
              color={COLORS.colorRed}
            >
              {labels.checkInternetConnection}
            </AppRegularText>
          </View>
        </View>
      </BaseContainer>
    </SafeAreaProvider>
  );
};

export { NoInternet };
