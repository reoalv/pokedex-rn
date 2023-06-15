import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: moderateScale(8),
      borderRadius: moderateScale(12),
      marginHorizontal: moderateScale(4),
      alignItems: 'center'
  },
});