import { SvgLocal } from "@/assets/svg/svg-local";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";

const ImgSVG = (props) => {
  return (
    <View style={props.viewStyle}>
      <SvgLocal
          src={props.src}
          height={props.height}
          width={props.width}
          fill={props.fill}
        />
      
    </View>

    // {props.src ? (
        
    //   ) : (
    //     <props.icon
    //       height={scale(props.height)}
    //       width={scale(props.width)}
    //       fill={props.fill}
    //     />
    //   )}
  );
};

export default ImgSVG;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
});
