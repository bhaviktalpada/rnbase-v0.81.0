
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MainHeader from '../header';
import { BackIconSvg } from '@/assets/svg';
import { COLORS } from '@/theme';

export default function BaseContainer({
  children,
  isTopSafeArea = true,
  isBottomSafeArea = true,
  bgColor = COLORS.background_lite,
  headerBGColor = COLORS.headerColor,
  bottomSafeColor = bgColor,
}) {
  const inset = useSafeAreaInsets();

  return (
    <>
      <View
        style={styles.wrapperView(
          inset,
          isTopSafeArea,
          isBottomSafeArea,
          bgColor,
        )}
      >
        {children}
      </View>

      {isTopSafeArea ? (
        <View style={styles.headerTopView(headerBGColor, inset)}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={headerBGColor}
          />
        </View>
      ) : null}
      {isBottomSafeArea && (
        <View style={styles.bottomSafeColorStyle(bottomSafeColor, inset)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerTopView: (headerBGColor, inset) => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: inset.top,
    width: '100%',
    position: 'absolute',
    backgroundColor: headerBGColor,
  }),

  wrapperView: (inset, isTopSafeArea, isBottomSafeArea, bgColor) => ({
    flex: 1,
    backgroundColor: bgColor,
    marginTop: isTopSafeArea ? inset.top : 0,
    marginBottom: isBottomSafeArea ? inset.bottom : 0,
  }),
  bottomSafeColorStyle: (color, inset) => ({
    width: '100%',
    height: inset.bottom,
    backgroundColor: color,
    position: 'absolute',
    bottom: 0,
  }),
});
