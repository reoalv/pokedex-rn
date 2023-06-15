import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './Card.styles';

type Props = {
  cardColor?: string;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const Card = ({
  cardColor,
  children,
  containerStyle,
}: Props) => {
  return (
    <View
      style={[
        {
          ...styles.container,
          backgroundColor: cardColor || '#ffffff',
        },
        containerStyle,
      ]}>
      {children}
    </View>
  );
};

export default Card;