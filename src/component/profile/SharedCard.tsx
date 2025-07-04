import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo} from 'react';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type card = {
  title: string;
  onCardPress: () => void;
  likeCount?: number;
  BgImgStyle?: ImageStyle;
  BGStyle?: ImageStyle;
  location?: string;
  account?: boolean;
  address?: boolean;
  place?: boolean;
  listCount?: boolean;
};

const SharedCard: FC<card> = ({
  onCardPress = () => {},
  title,
  BGStyle,
  BgImgStyle,
  likeCount,
  location,
  account,
  address,
  place,
  listCount,
}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onCardPress}>
      <ImageBackground
        source={IMAGES.bg1} // Replace with actual pyramid image URL
        style={[styles.container, BGStyle]}
        imageStyle={[styles.image, BgImgStyle]}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {location && <Text style={styles.location}>{location}</Text>}
        </View>
        <View style={[AppStyles.row, styles.footer]}>
          <View style={styles.bottomRow}>
            {account && (
              <ImageBackground
                source={IMAGES.bg5}
                resizeMode="cover"
                imageStyle={styles.image1}
                style={styles.chip}>
                <Image source={IMAGES.avatar} style={styles.forIcon} />
                <Text style={styles.chipText}>jessica123</Text>
              </ImageBackground>
            )}

            {address && (
              <ImageBackground
                source={IMAGES.bg5}
                resizeMode="cover"
                imageStyle={styles.image1}
                style={styles.chip}>
                <Image source={IMAGES.wordWide} style={styles.forIcon1} />
                <Text style={styles.chipText}>San Diego</Text>
              </ImageBackground>
            )}
            {place && (
              <ImageBackground
                source={IMAGES.bg5}
                resizeMode="cover"
                imageStyle={styles.image1}
                style={styles.chip}>
                <Text style={styles.chipText}>{listCount} Places</Text>
              </ImageBackground>
            )}
          </View>
          {/* <View style={[AppStyles.row, {gap: wp(4)}]}>
            <Image source={IMAGES.favorite} style={styles.fav} />
            <Text style={styles.likeCount}>{likeCount}</Text>
          </View> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(SharedCard);

const styles = StyleSheet.create({
  container: {
    height: hp(116),
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: wp(8),
  },
  image: {
    borderRadius: 18,
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
  },
  location: {
    ...commonFontStyle(500, 12, colors._E4E4E4),
    marginTop: hp(4),
  },
  fav: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
    tintColor: colors._99999,
  },
  likeCount: {
    ...commonFontStyle(600, 16, '#FFFFFFBF'),
  },
  food: {width: wp(32), height: wp(32), resizeMode: 'contain'},
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  chipText: {
    marginLeft: 6,
    ...commonFontStyle(500, 13, '#FAE8D1'),
  },

  forIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  forIcon1: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  image1: {
    borderRadius: 8,
  },
});
