import React from 'react';
import {Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native';

type PressableWrapperType = PressableProps & {
  customStyle?: StyleProp<ViewStyle> | undefined;
};

function PressableWrapper(props: PressableWrapperType) {
  return (
    <Pressable
      style={({pressed}) => [
        props.customStyle,
        {opacity: pressed ? 0.85 : 1.0},
      ]}
      {...props}>
      {props.children}
    </Pressable>
  );
}

export default React.memo(PressableWrapper);
