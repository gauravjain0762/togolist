import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp} from '../../theme/fonts';

type button = {
  title: string;
  onPress?: () => void;
  BtnStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const Button: FC<button> = ({
  title,
  BtnStyle,
  onPress = () => {},
  titleStyle,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.btn, BtnStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(Button);

const styles = StyleSheet.create({
  btn: {
    borderRadius: 14,
    backgroundColor: colors._BD2332,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(18),
  },
  title: {
    ...commonFontStyle(700, 18, colors.white),
  },
});
