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
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import LinearGradient from 'react-native-linear-gradient';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 16 padding + 16 gap
const TravelCard = ({
  title = '',
  location = '',
  image = '',
  avatar = '',
  users = [],
  BGStyle,
  onPress,
  isSave,
}: any) => {
  const visibleUsers = users?.slice(0, 2);
  const extraUserCount = users.length - visibleUsers.length;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}>
      <ImageBackground
        source={IMAGES.bg}
        style={[styles.card, BGStyle]}
        imageStyle={styles.image}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}>
          <View
            style={[
              styles.container,
              {justifyContent: isSave ? 'space-between' : 'flex-end'},
            ]}>
            {isSave && (
              <View style={styles.topRow}>
                <Image
                  source={IMAGES.save_cion}
                  style={{width: 11, height: 13, tintColor: colors.white}}
                />
                <Text style={styles.date}>{'568'}</Text>
              </View>
            )}
            {/* <View style={styles.overlay}> */}
            <View>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.footer}>
                <View style={styles.locationRow}>
                  {location && (
                    <Image
                      source={IMAGES.locationWhite}
                      style={{width: 16, height: 16}}
                    />
                  )}
                  <Text style={styles.location}>{location}</Text>
                </View>
                <View style={styles.avatarStack}>
                  {visibleUsers.map((user, index) => (
                    <Image
                      key={index}
                      source={{uri: user.avatar}}
                      style={[
                        styles.avatar,
                        {marginLeft: index === 0 ? -10 : -10},
                      ]}
                    />
                  ))}
                  {extraUserCount > 0 && (
                    <View style={[styles.avatar1, styles.extraAvatar]}>
                      <Text style={styles.extraText}>+{extraUserCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          {/* </View> */}
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  date: {
    ...commonFontStyle(600, 11, 'white'),
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  card: {
    width: CARD_WIDTH,
    height: hp(180),
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
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
  container: {
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 20,
    flex: 1,
  },
  title: {
    ...commonFontStyle(600, 12, colors.white),
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
    borderWidth: 1,
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
