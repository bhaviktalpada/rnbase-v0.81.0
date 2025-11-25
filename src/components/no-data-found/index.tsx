import {Image, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import LottieView from 'lottie-react-native';


import { screenHeight } from '@/utils/dimensions';
import LocalizeText from '@/utils/text-localize';
import React from 'react';

import styles from './styles';
import AppRegularText from '@utilities/app-regular-text';

export default function NodataFound({
  title,
  message,
  lottie,
  image,
  parentHeight,
}) {
  const finalTitle = title ? title : LocalizeText.noData.ndNoDataFound;
  const finalParentHeight = parentHeight ? parentHeight : screenHeight * 0.5;
  return (
    <View style={[styles.container, {height: scale(finalParentHeight)}]}>
      {lottie && (
        <View style={styles.imageViewStyle}>
          <LottieView source={lottie} autoPlay style={styles.imgStyle} />
        </View>
      )}
      {image && (
        <View style={styles.imageViewStyle}>
          <Image source={image} style={styles.imgStyle} resizeMode="contain" />
        </View>
      )}
      <AppRegularText style={styles.textTitle}>{finalTitle}</AppRegularText>
      {message && <AppRegularText style={styles.textMessage}>{message}</AppRegularText>}
    </View>
  );
}
