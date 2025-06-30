import React, {memo} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2; // 16 padding + 16 gap
const ExploreCard = ({title, location, image, avatar, users,onPress}) => {
  return (
    <TouchableOpacity onPress={()=>{
onPress && onPress()
    }}>

    <ImageBackground
      source={IMAGES.bg}
      style={styles.card}
      imageStyle={styles.image}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  title: {
    ...commonFontStyle(600, 12, colors.white),
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
});

export default memo(ExploreCard);
