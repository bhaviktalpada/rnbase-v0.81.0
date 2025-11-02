import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';

const ImgSVG = props => {
  return (
    <View style={props.viewStyle}>
      {/* <props.icon
        height={scale(props.height)}
        width={scale(props.width)}
        fill={props.fill}
      /> */}
    </View>
  );
};

export default ImgSVG;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
});
