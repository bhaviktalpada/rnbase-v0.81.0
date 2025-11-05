import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { scale } from 'react-native-size-matters';
import {APP} from '../../utils/constants';
import AppBoldText from '../utilities/app-bold-text';
import ImgSVG from '@/utils/image-svg';
import { SvgBack } from '@/assets/svg/svg-back';
import { COLORS } from '@/theme';

export const AuthHeader = ({
  title,
  titleCenter = true,
  numberOfLines,
  isBackOption = false,
  colorIcon = COLORS.black,
  navigation,
  isUnderBarOption = false,
  backCallBack = () => {},
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        {isBackOption && (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => {
                backCallBack();
                navigation.goBack();
              }}>
              <ImgSVG
                icon={SvgBack}
                width={APP.BACK_ICON_SIZE}
                height={APP.BACK_ICON_SIZE}
              />
            </TouchableOpacity>
          </View>
        )}
        <AppBoldText
          style={
            titleCenter == true ? styles.headerText : styles.leftHeaderText
          }
          numberOfLines={numberOfLines}>
          {title}
        </AppBoldText>
        {isUnderBarOption == true ? (
          <>
            <View style={styles.horizontalTransparentLine}></View>
            <View style={styles.horizontalLine}></View>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: scale(APP.HEADER_HEIGHT),
    width: '100%',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    height: scale(24),
    width: scale(24),
    paddingLeft: scale(15),
    width: '10%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  leftHeaderText: {
    textAlign: 'left',
    marginLeft: '5%',
    marginRight: '5%',
  },
  horizontalTransparentLine: {
    width: scale(50),
    height: scale(8),
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  horizontalLine: {
    width: scale(50),
    height: scale(3),
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
