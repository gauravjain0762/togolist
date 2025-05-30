import React, {memo} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 16 padding + 16 gap
const TravelCard = ({title, location, image, avatar, users}) => {
  const visibleUsers = users?.slice(0, 2);
  const extraUserCount = users.length - visibleUsers.length;
  return (
    <ImageBackground
      source={IMAGES.bg}
      style={styles.card}
      imageStyle={styles.image}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}>
        {/* <View style={styles.overlay}> */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.footer}>
          <View style={styles.locationRow}>
            <Image
              source={IMAGES.locationWhite}
              style={{width: 16, height: 16}}
            />
            <Text style={styles.location}>{location}</Text>
          </View>
          <View style={styles.avatarStack}>
            {visibleUsers.map((user, index) => (
              <Image
                key={index}
                source={{uri: user.avatar}}
                style={[styles.avatar, {marginLeft: index === 0 ? -10 : -10}]}
              />
            ))}
            {extraUserCount > 0 && (
              <View style={[styles.avatar1, styles.extraAvatar]}>
                <Text style={styles.extraText}>+{extraUserCount}</Text>
              </View>
            )}
          </View>
        </View>
        {/* </View> */}
      </LinearGradient>
    </ImageBackground>
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
  // overlay: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   padding: 12,
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  // },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
    borderRadius: 20,
  },
  title: {
    ...commonFontStyle(600, 16, colors.white),
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    ...commonFontStyle(600, 11, colors.white),
  },

  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    // right:-2
  },
  avatar: {
    height: 18,
    width: 18,
    borderRadius: 14,
  },
  avatar1: {
    height: 18,
    width: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#ccc',
  },
  extraAvatar: {
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    left: -10,
  },
  extraText: {
    ...commonFontStyle(700, 8, 'white'),
  },
});

export default memo(TravelCard);
