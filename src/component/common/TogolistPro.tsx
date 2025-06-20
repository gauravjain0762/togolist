import {
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
import {commonFontStyle, hp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

type button = {
  cardStyle?: ViewStyle;
};

const TogolistPro: FC<button> = ({cardStyle,onClosePress}:any) => {
  return (
    <ImageBackground source={IMAGES.bg2} style={[styles.card, cardStyle]}>
      <TouchableOpacity onPress={()=>{
        onClosePress && onClosePress()
      }} style={styles.closeIcon}>
        <Text style={{fontSize: 16, color: '#f9a8b7'}}>✕</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title1}>Togolist Pro</Text>
        <Text style={styles.subtitle}>
          Use AI to help you plan your next adventure.
        </Text>
        <TouchableOpacity style={styles.tryProButton}>
          <Text style={styles.tryProText}>Try Pro</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default memo(TogolistPro);

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: hp(20),
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 30,
    zIndex: 1,
  },
  content: {
    paddingRight: 80, // space for button
  },
  title1: {
    ...commonFontStyle(700, 18, colors.white),
  },
  subtitle: {
    marginVertical: 8,
    ...commonFontStyle(400, 16, colors.white),
  },
  tryProButton: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  tryProText: {
    ...commonFontStyle(600, 12, '#444444'),
  },
});
