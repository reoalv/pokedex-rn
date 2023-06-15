import {ms} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: ms(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#892121',
  },
  containerLeft: {
    padding: ms(8),
    borderRadius: 99,
    marginRight: ms(8),
  },
  containerText: {
    fontSize: ms(24),
    fontWeight: '700',
    color: '#ffffff',
  },
  containerRight: {
    padding: ms(8),
    borderRadius: 99,
    position: 'absolute',
    right: ms(16),
  },
});