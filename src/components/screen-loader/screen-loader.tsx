import {StyleSheet, ActivityIndicator, View} from 'react-native';

const AppScreenLoader = ({type = 'large'}) => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={type} />
    </View>
  );
};

export default AppScreenLoader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
