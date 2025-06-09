import {
  Image,
  ImageBackground,
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
import {IMAGES} from '../../assets/Images';

const CardImageText: FC<button> = ({
  Togolist,
  title,
  Worldwide,
  Lists,
  subText,
  collocation_bg
}: any) => {
  return (
    <ImageBackground
      source={IMAGES.collocation_bg}
      resizeMode="cover"
      imageStyle={{borderRadius: 20}}
      style={[styles.collocation_bg,collocation_bg]}>
      <Text style={styles.chipText1}>{title}</Text>
      <Text style={styles.chipText2}>{subText}</Text>
    </ImageBackground>
  );
};

export default memo(CardImageText);

const styles = StyleSheet.create({
  collocation_bg: {
    height: wp(370),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  chipText1: {
    ...commonFontStyle(700, 20, colors.white),
    marginBottom: 4,
  },
  chipText2: {
    ...commonFontStyle(700, 20, colors.white),
    textAlign: 'center',
  },
});
