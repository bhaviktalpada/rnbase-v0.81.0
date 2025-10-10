import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import { COLORS } from "@/theme";

const WhiteCard = ({children, style}) => {
  return <View style={[styles.containerStyle, style]}>{children}</View>;
};

export default WhiteCard;

const styles = StyleSheet.create({
  containerStyle: {
  
    padding: scale(15),
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
    elevation: 3,
    borderRadius: scale(5),
  },
});
