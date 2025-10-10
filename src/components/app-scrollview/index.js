import React from 'react';
import {ScrollView, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function AppScrollView({
  children,
  viewStyle,
  refreshControl,
  scrollEventThrottle=16,
  onScroll,
  horizontal = false,
  keyboardShouldPersistTaps = 'handled',
  alwaysBounceHorizontal = false,
  contentContainerStyle,
}) {
  if (Platform.OS == 'android') {
    return (
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        refreshControl={refreshControl}
        style={viewStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={alwaysBounceHorizontal}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
        {children}
      </ScrollView>
    );
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle}
        horizontal={horizontal}
        onScroll={onScroll}
        alwaysBounceHorizontal={alwaysBounceHorizontal}
        scrollEventThrottle={scrollEventThrottle}
        refreshControl={refreshControl}
        style={viewStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        extraHeight={200}>
        {children}
      </KeyboardAwareScrollView>
    );
  }
}

export default AppScrollView;
