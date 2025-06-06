import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type Props = {
  isFilled?: boolean;
  title: any;
  onPress?: () => void;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  img: ImageProps;
  imgStyle?: ImageProps;
};

const SocialBtn: FC<Props> = ({
  img,
  title,
  btnStyle,
  isFilled,
  onPress = () => {},
  textStyle,
  imgStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.container, btnStyle]}>
      <Image source={img} style={[styles.img, imgStyle]} />
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default memo(SocialBtn);

const styles = StyleSheet.create({
  img: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 13,
    paddingVertical: hp(16),
    paddingLeft: wp(27),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
    gap: wp(8),
  },
  title: {
    ...commonFontStyle(700, 18, colors.black),
    // alignSelf: 'center',
  },
});
