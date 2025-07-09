import {
  Image,
  ImageProps,
  ImageSize,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

type button = {
  title: string;
  onPress?: () => void;
  BtnStyle?: ViewStyle;
  titleStyle?: TextStyle;
  type?: 'fill' | 'outline';
  leftImg?: ImageProps;
  leftImgStyle?: ImageStyle;
};

const Button: FC<button> = ({
  title,
  BtnStyle,
  onPress = () => {},
  titleStyle,
  type = 'fill',
  leftImg,
  leftImgStyle,
}) => {
  return type == 'fill' ? (
    <TouchableOpacity onPress={() => onPress()} style={[styles.btn, BtnStyle]}>
      {leftImg && (
        <Image source={leftImg} style={[styles.leftimg, leftImgStyle]} />
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.outlinebtn, BtnStyle]}>
      {leftImg && (
        <Image source={leftImg} style={[styles.leftimg, leftImgStyle]} />
      )}
      <Text style={[styles.outlinetitle, titleStyle]}>{title}</Text>
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
    gap: wp(8),
    flexDirection: 'row',
  },
  title: {
    ...commonFontStyle(700, 18, colors.white),
  },
  outlinebtn: {
    borderWidth: 2,
    borderColor: colors._BD2332,
    paddingVertical: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    gap: wp(8),
    flexDirection: 'row',
  },
  outlinetitle: {
    ...commonFontStyle(600, 13, colors._BD2332),
  },
  leftimg: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
  },
});
