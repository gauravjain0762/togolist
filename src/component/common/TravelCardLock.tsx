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
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 16 padding + 16 gap
const TravelCardLock = ({
  title,
  location,
  image,
  avatar,
  users,
  isPrivate,
  date,
  attendees,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}>
      <ImageBackground
        source={IMAGES.bg}
        style={styles.card}
        imageStyle={styles.image}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.topRow}>
              <Text style={styles.date}>{date}</Text>
              {isPrivate && (
                <Image
                  source={IMAGES.loca_icon}
                  style={{width: 16, height: 16}}
                />
              )}
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.footer}>
                {location && (
                  <View style={styles.locationRow}>
                    <Image
                      source={IMAGES.locationWhite}
                      style={{width: 16, height: 16}}
                    />
                    <Text style={styles.location}>{location}</Text>
                  </View>
                )}
                {attendees && (
                  <View style={styles.avatarStack}>
                    <Image source={IMAGES.user_icon} style={[styles.avatar]} />
                    <Text style={styles.metaText}>{attendees}</Text>
                  </View>
                )}
              </View>
            </View>
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
  // overlay: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   padding: 12,
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  // },
  overlay: {
    flex: 1,
  },
  title: {
    ...commonFontStyle(600, 12, colors.white),
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
    marginTop: 8,
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
    height: 13,
    width: 13,
    borderRadius: 13,
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
  metaText: {
    ...commonFontStyle(600, 11, 'white'),
    marginLeft: 4,
  },
  date: {
    ...commonFontStyle(600, 11, 'white'),
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 20,
    flex: 1,
  },
});

export default memo(TravelCardLock);
