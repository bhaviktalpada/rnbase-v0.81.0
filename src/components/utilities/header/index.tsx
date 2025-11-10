import React from "react";
import { normalizeText } from "@/utils";
import {
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppRegularText from "../app-regular-text";
import { COLORS, FONT_SIZE } from "@/theme";
import { APP } from "@/utils/constants";
import AppMediumText from "../app-medium-text";
import FastImage from "react-native-fast-image";
import { IMAGES, SVGFile } from "@/utils/images-path";
import ImgSVG from "@/utils/image-svg";
import { SvgBack } from "@/assets/svg/svg-back";
import { SvgLocal } from "@/assets/svg/svg-local";

type MainHeaderProps = {
  showLeftIcon?: boolean;
  LeftSVGIcon?: any;
  iconColor?: string;
  leftTitle?: string;
  firstRightIcon?: any;
  secondRightIcon?: any;
  rightButtonTitle?: string;
  rightButtonIcon?: any;
  rightButtonColor?: string;
  borderBottomColor?: string;
  showBottomBorder?: boolean;
  profileSource?: any;
  iconSize?: number;
  leftIconSize?: number;
  filterIconSize?: number;
  totalNotifications?: number | string | any[];
  navigation?: any;
  onPressRightFirst?: () => void;
  onPressRightSecond?: () => void;
  onPressRightButton?: () => void;
  onPressCloseSearch?: () => void;
  onPressProfile?: () => void;
  isSearchActive?: boolean;
  searchText?: string;
  onChangeText?: (t: string) => void;
  onPressReturn?: () => void;
  filterOptions?: any;
  isActiveFilter?: boolean;
  backCallBack?: () => void;
};

type Style = {
  mainContainer: StyleSheetProperties;
  mainSubContainer: StyleSheetProperties;
  innerViewLeft: object;
  leftIconContainer: object;
  innerViewRight: object;
  rightIconContainer: object;
  profileContainer: object;
  imgStyle: object;
  searchCloseIcon: object;
  rightBtnTouchableView: object;
  activeView: object;
  menuOption: object;
  // function styles
  badgeContainer: (notiCount: any) => object;
  borderBottomStyle: (bgcolor: any) => object;
  labelStyle: (Color?: string, size?: number) => object;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  showLeftIcon = false,
  LeftSVGIcon = SVGFile.svgBack,
  iconColor = COLORS.black,
  leftTitle,
  firstRightIcon,
  secondRightIcon,
  rightButtonTitle,
  rightButtonIcon,
  rightButtonColor = COLORS.colorRed,
  borderBottomColor = COLORS.colorLightestGrayE0,
  showBottomBorder = false,
  profileSource,
  iconSize,
  leftIconSize = 20,
  filterIconSize = 14,
  totalNotifications,
  navigation,
  onPressRightFirst,
  onPressRightSecond,
  onPressRightButton,
  onPressCloseSearch,
  onPressProfile,
  isSearchActive = false,
  searchText,
  onChangeText,
  onPressReturn,
  filterOptions,
  isActiveFilter = false,
  backCallBack = () => {},
}) => {
  // const { general } = LocalizeText; // not used in this component
  const inset = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  console.log("isLandscape:", isLandscape);

  return (
    <>
      <View style={styles.mainContainer(inset)}>
        <View style={styles.mainSubContainer(inset)}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.innerViewLeft}>
              {showLeftIcon && (
                <TouchableOpacity
                  onPress={() => {
                    backCallBack();
                    navigation?.goBack?.();
                  }}
                  style={styles.leftIconContainer}
                >
                  <ImgSVG
                    src={LeftSVGIcon}
                    height={leftIconSize}
                    width={leftIconSize}
                  />
                </TouchableOpacity>
              )}
              {!isSearchActive && (
                <AppMediumText
                  size={FONT_SIZE[20]}
                  color={COLORS.black}
                >
                  {leftTitle}
                </AppMediumText>
              )}
            </View>

            <View style={styles.innerViewRight}>
              {!isSearchActive && firstRightIcon && (
                <>
                  <TouchableOpacity
                    onPress={onPressRightFirst}
                    style={styles.rightIconContainer}
                  >
                    {(() => {
                      // normalize totalNotifications to a number
                      let numericCount = 0;
                      if (Array.isArray(totalNotifications)) {
                        numericCount = totalNotifications.length;
                      } else if (typeof totalNotifications === "string") {
                        numericCount = Number(totalNotifications) || 0;
                      } else if (typeof totalNotifications === "number") {
                        numericCount = totalNotifications;
                      }

                      if (numericCount > 0) {
                        const display =
                          numericCount > 99
                            ? APP.LONG_DIGIT_NOTIFICATION_COUNT
                            : String(numericCount);
                        return (
                          <View style={styles.badgeContainer(numericCount)}>
                            <AppRegularText
                              size={APP.APP_NOTIFICATION_COUNT_FONT_SIZE}
                              numberOfLines={1}
                              fontFamily={"Bold"}
                              color={COLORS.white}
                            >
                              {display}
                            </AppRegularText>
                          </View>
                        );
                      }
                      return null;
                    })()}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          {profileSource && (
            <TouchableOpacity
              onPress={onPressProfile}
              style={styles.profileContainer}
            >
              <FastImage
                defaultSource={IMAGES.ic_user_avatar}
                style={styles.imgStyle}
                source={profileSource}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showBottomBorder && (
        <View style={styles.borderBottomStyle(borderBottomColor)} />
      )}
    </>
  );
};

export default MainHeader;

const styles = StyleSheet.create<Style>({
  mainContainer: (inset): any => ({
    width: "100%",
    height: scale(44) + inset.top,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerColor,
  }),
  mainSubContainer: (inset): any => ({
    height: scale(44),
    marginLeft: inset.left,
    marginRight: inset.right,
    flex: 1,
    marginTop: inset.top,
    paddingHorizontal: scale(15),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.headerColor,
  }),
  innerViewLeft: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  leftIconContainer: {
    marginRight: scale(3),
    paddingRight: scale(10),
    paddingVertical: scale(10),
  },
  innerViewRight: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "red",
  },
  rightIconContainer: {
    marginRight: scale(10),
    padding: scale(8),
  },
  // badgeContainer and borderBottomStyle are functions returning styles
  badgeContainer: (notiCount: any): any => ({
    height: scale(18),
    width: scale(notiCount > 2 ? 22 : 18),
    position: "absolute",
    zIndex: 1,
    right: scale(2),
    marginTop: scale(3),
    backgroundColor: COLORS.black,
    borderRadius: scale(18),
    borderWidth: scale(1),
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  }),
  profileContainer: {
    height: scale(25),
    width: scale(25),
    borderRadius: scale(15),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: scale(1),
    //borderColor: COLORS.colorLightestGrayE0,
  },
  imgStyle: {
    height: scale(25),
    width: scale(25),
    alignItems: "center",
    //borderRadius: scale(15),
  },
  searchCloseIcon: {
    marginRight: scale(3),
    padding: scale(8),
    flex: 1,
  },
  borderBottomStyle: (bgcolor: any): any => ({
    width: "100%",
    height: scale(1),
    backgroundColor: bgcolor,
  }),
  rightBtnTouchableView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeView: {
    backgroundColor: COLORS.colorGreen,
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: -6,
    top: -5,
  },
  labelStyle: (Color = COLORS.black, size = 12) => ({
    fontSize: normalizeText(size),
    color: Color,
  }),
  menuOption: {
    width: "auto",
    padding: scale(5),
    borderRadius: scale(5),
    paddingHorizontal: scale(10),
  },
});
