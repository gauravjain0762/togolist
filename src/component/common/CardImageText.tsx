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
}: any) => {
  return (
    <ImageBackground
      source={IMAGES.collocation_bg}
      resizeMode="contain"
      imageStyle={{borderRadius: 20}}
      style={styles.collocation_bg}>
      <Text style={styles.chipText1}>{title}</Text>
      <Text style={styles.chipText2}>{subText}</Text>
    </ImageBackground>
  );
};

export default memo(CardImageText);

const styles = StyleSheet.create({
  collocation_bg: {
    width: wp(370),
    height: wp(370),
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
