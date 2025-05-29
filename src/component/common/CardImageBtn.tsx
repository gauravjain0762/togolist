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

const CardImageBtn: FC<button> = ({
  text1,
  text2,
  text3,
  btnText,
}: any) => {
  return (
    <ImageBackground
      source={IMAGES.collocation_bg}
      resizeMode="cover"
      imageStyle={{borderRadius: 20, flex: 1}}
      style={styles.collocation_bg}>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>{text1}</Text>
        <Text style={styles.title1}>{text2}</Text>
        <Text style={styles.subtitle}>{text3}</Text>

        <TouchableOpacity
          onPress={() => {
            onBtnPress;
          }}
          style={styles.button1}>
          <Text style={styles.buttonText1}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default memo(CardImageBtn);

const styles = StyleSheet.create({
  collocation_bg: {
    // width: wp(370),
    height: wp(600),
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  comingSoon: {
    ...commonFontStyle(700, 36, colors.white),
    marginBottom: 10,
  },
  title1: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button1: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    width: 88,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    ...commonFontStyle(600, 12, colors.black),
  },
});
