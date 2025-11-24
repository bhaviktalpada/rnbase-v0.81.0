import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import { COLORS, FONTS } from '@/theme';
import { APP } from '@/utils/constants';
import ImgSVG from '@/utils/image-svg';
import { SVGFile } from '@/utils/images-path';
import AppCustomText from '../app-custom-text';

export default function CheckListbox({
  index,
  title = '',
  checkboxColor = COLORS.colorGreen,
  checked,
  viewStyle,
  textStyle,
  onPress,
  height = 15,
  width = 15,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, viewStyle]}
      activeOpacity={1}>
      <ImgSVG
        src={checked ? SVGFile.svgFillCheckBox : SVGFile.svgEmptyCheckBox}
        width={width}
        height={height}
        viewStyle={styles.iconStyle}
        fill={checked ? checkboxColor : COLORS.white}
      />
      <AppCustomText
        numberOfLines={0}
        style={[styles.regularText, textStyle]}
        sizeFont={APP.DEFAULT_TEXT_INPUT_LABEL_SIZE}
        fontFamily={FONTS.Regular}>
        {title}
      </AppCustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(12),
    alignItems: 'center',
  },
  regularText: {
    maxWidth: '95%',
  },
  iconStyle: {
    marginRight: scale(5),
    marginTop: scale(1),
  },
});