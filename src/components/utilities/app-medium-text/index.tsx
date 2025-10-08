
import {  COLORS, FONT_SIZE, FONTS } from '@/theme';
import { normalizeText } from '@/utils';
import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';

type FontWeight = keyof typeof FONTS;
type FontSize = keyof typeof FONT_SIZE;

interface AppTextProps extends TextProps {
  fontFamily?: FontWeight;
  size?: FontSize;
  color?: string;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
}

export default function AppMediumText({
  size = 14,
  color = COLORS.black, // fallback to default text color
  style,
  children,
  numberOfLines,
  ...rest
}: AppTextProps) {
  return (
    <Text
    numberOfLines={numberOfLines}
      style={[
        styles.base,
        {
          fontSize: FONT_SIZE[size],
          color,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: FONTS.Medium,
    color: COLORS.black,
    fontSize: normalizeText(14),
  },
});
