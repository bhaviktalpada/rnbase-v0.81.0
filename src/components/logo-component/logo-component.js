import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';

const LogoContainer = ({style,source}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center',}}>
      <Image
        source={source}
        style={[styles.logoStyle, style]}
        resizeMode="contain"
      />
    </View>
  );
};

export default LogoContainer;

const styles = StyleSheet.create({
  logoStyle: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(7),
  },
});
