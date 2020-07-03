import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';

import {Colors} from '../themes';

const MyButton = ({label, onPress, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          marginTop: 24,
          paddingVertical: 14,
          backgroundColor: disabled ? Colors.DARK100 : Colors.PRIMARYCOLOR,
          alignItems: 'center',
          borderRadius: 6,
          shadowColor: disabled ? Colors.DARK100 : Colors.PRIMARYCOLOR,
          opacity: disabled ? 0.2 : 1,
        },
        style.btn,
      ]}>
      <Text category="s1" style={{color: '#fff', fontWeight: '700'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const style = StyleSheet.create({
  btn: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
