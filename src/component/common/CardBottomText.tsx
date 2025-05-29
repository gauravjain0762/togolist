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


const CardBottomText: FC<button> = ({title}:any) => {
  return (
    <ImageBackground
      source={IMAGES.bg1} // Replace with actual pyramid image URL
      style={styles.container}
      imageStyle={styles.image}>
      <Text style={styles.title}>{title}</Text>
    </ImageBackground>
  );
};

export default memo(CardBottomText);

const styles = StyleSheet.create({
  container: {
    height: 116,
    borderRadius: 18,
    overflow: 'hidden',
    // justifyContent: 'space-between',
    marginTop: 12,
    justifyContent:'flex-end',
    paddingHorizontal:16,
    paddingBottom:12
  },
  image: {
    borderRadius: 25,
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
  },
 
});
