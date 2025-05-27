import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {commonFontStyle} from '../../theme/fonts';

const CustomBtn = ({onPress,title,style,buttonText}: any) => {
  return (
    <TouchableOpacity
      style={[styles.button,style]}
      onPress={onPress} // Update with your actual next screen
    >
      <Text style={[styles.buttonText,buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   button: {
    backgroundColor: '#d62828',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    ...commonFontStyle(700, 15, colors.white),
  },
 
});

export default CustomBtn;
