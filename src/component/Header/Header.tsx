import {View, Text} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './Header.styles';

type Props = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: string;
};

const Header = ({leftIcon, rightIcon, title}: Props) => {
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.containerLeft}>{leftIcon}</View>}
      <Text style={styles.containerText}>{title}</Text>
      {rightIcon && <View style={styles.containerRight}>{rightIcon}</View>}
    </View>
  );
};

export default Header;