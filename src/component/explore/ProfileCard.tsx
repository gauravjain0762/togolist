import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {LinearView} from '..';
import {IMAGES} from '../../assets/Images';

type card = {
  followButton?: boolean;
  cardStyle?: ViewStyle;
  ishire?: boolean;
  followStyle?: ViewStyle;
  followText?: TextStyle;
};

const ProfileCard: FC<card> = ({
  followButton = true,
  cardStyle,
  ishire = true,
  followStyle,
  followText,
}) => {
  return (
    <LinearView containerStyle={[styles.card, cardStyle]}>
      <Image source={IMAGES.profile} style={styles.avatar} />
      <View style={styles.row}>
        <Text style={styles.username}>@Emily </Text>
        <Image style={styles.badge} source={IMAGES.profile_badge} />
      </View>
      <View style={styles.stats}>
        <Image source={IMAGES.favorite} style={styles.fav} />
        <Text style={styles.statsText}> 96K</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.statsText}>58 Lists</Text>
      </View>

      {ishire && <Text style={styles.hireText}>Available For Hire</Text>}
      <Text style={styles.bio}>
        Avid traveler, sharing hidden gems all across the globe.
      </Text>

      {followButton && (
        <TouchableOpacity style={[styles.followBtn, followStyle]}>
          <Text style={[styles.followText, followText]}>Follow</Text>
        </TouchableOpacity>
      )}
    </LinearView>
  );
};

export default memo(ProfileCard);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: hp(24),
    paddingHorizontal: wp(10),
    gap: hp(8),
    flex: 1,
    maxWidth: (SCREEN_WIDTH / 2) * 0.9,
  },
  avatar: {
    width: wp(58),
    height: wp(58),
    borderRadius: wp(40),
  },
  username: {
    ...commonFontStyle(500, 14, colors.black),
  },
  statsText: {
    ...commonFontStyle(500, 14, colors._99999),
    marginHorizontal: wp(4),
  },
  divider: {
    ...commonFontStyle(400, 14, '#ccc'),
    marginHorizontal: wp(2),
  },
  hireText: {
    ...commonFontStyle(400, 12, colors._BD2332),
  },
  bio: {
    ...commonFontStyle(400, 12, colors.black),
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  followBtn: {
    backgroundColor: colors._BD2332,
    paddingVertical: hp(12),
    paddingHorizontal: wp(18),
    borderRadius: wp(8),
  },
  followText: {
    ...commonFontStyle(500, 12, '#fff'),
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fav: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
    tintColor: colors._787878,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
  },
});
