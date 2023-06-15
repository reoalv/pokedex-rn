import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#333333',
    },
    flatlistContainer: {
        paddingVertical: moderateScale(12),
        flexGrow: 1,
    },
    columnFlatlist: {
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(12),
    },
    img: {
      height: moderateScale(100),
      width: moderateScale(100),
    }
})