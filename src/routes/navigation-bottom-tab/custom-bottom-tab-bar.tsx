import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/theme';
import { TabLabel } from '@/components/utilities';
import { moderateScale } from 'react-native-size-matters';

let dotSize = moderateScale(6);

interface TabButtonProps {
  item: {
    label: string;
    icon: any;
  };
  onPress: () => void;
  accessibilityState: { selected: boolean };
}

interface CustomBottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabButton: React.FC<TabButtonProps> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState.selected;
  const TabIcon = item?.icon;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[
        styles.touchableView,
        { backgroundColor: COLORS.primary },
      ]}
    >
      {TabIcon && <TabIcon focused={focused} />}
      <TabLabel value={item?.label} focused={focused} />
    </TouchableOpacity>
  );
};

const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const tabWidth = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const offset = tabWidth / 2 - dotSize / 2;

    Animated.spring(translateX, {
      toValue: state.index * tabWidth + offset,
      useNativeDriver: true,
    }).start();
  }, [state.index, tabWidth]);

  return (
    <>
      <View
        style={[
          styles.tabBarWrapper,
          { height: isLandscape ? moderateScale(50) : moderateScale(54) },
        ]}
      >
        {/* Sliding Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX }],
              backgroundColor: COLORS.white,
            },
          ]}
        />

        {state.routes.map(
          (route: { key: string; name: string }, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const icon = options.tabBarIcon;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabButton
                key={index}
                item={{ label, icon }}
                onPress={onPress}
                accessibilityState={{ selected: isFocused }}
              />
            );
          },
        )}
      </View>

      <View
        style={[
          styles.bottomWhiteView,
          {
            height:
              insets.bottom,
            backgroundColor: COLORS.primary,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    flexDirection: 'row',
  },
  indicator: {
    position: 'absolute',
    top: SPACING.customSpace(28),
    borderRadius: dotSize,
    height: dotSize,
    width: dotSize,
    zIndex: 1,
  },
  touchableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomWhiteView: {
    width: '100%',
  },
});

export default CustomBottomTabBar;
