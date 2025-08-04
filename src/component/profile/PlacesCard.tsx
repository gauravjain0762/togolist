import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, forwardRef, memo, useState} from 'react';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {AppStyles} from '../../theme/appStyles';
import {SharedElement} from 'react-native-shared-element';
import {MotiPressable} from 'moti/interactions';

type card = {
  title: string;
  onCardPress: () => void;
  likeCount?: number;
  BgImgStyle?: ImageStyle;
  BGStyle?: ImageStyle;
  location?: string;
  locationIcon?: boolean;
  locationStyle?: TextStyle;
  id: any;
};

const PlacesCard = forwardRef<unknown, card>((props, ref) => {
  const {
    onCardPress = () => {},
    title,
    BGStyle,
    BgImgStyle,
    likeCount,
    location,
    locationIcon = false,
    locationStyle,
    id,
    onLongPress,
  } = props;
  const [likeUser, setLikeUser] = useState(false);
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      activeOpacity={1}
      ref={ref}
      onPress={onCardPress}>
      <ImageBackground
        source={IMAGES.bg1} // Replace with actual pyramid image URL
        style={[styles.container, BGStyle]}
        imageStyle={[styles.image, BgImgStyle]}>
        <View style={[{gap: wp(4)}]}>
          <Text style={styles.title}>{title}</Text>
          <View style={[AppStyles.row, {gap: wp(4)}]}>
            {locationIcon && (
              <Image source={IMAGES.wordWide} style={styles.pin} />
            )}
            <Text style={[styles.location, locationStyle]}>{location}</Text>
          </View>
        </View>
        <View style={[AppStyles.row, styles.footer]}>
          <Image source={IMAGES.food} style={styles.food} />
          <TouchableOpacity
            onPress={() => {
              setLikeUser(!likeUser);
            }}
            style={[AppStyles.row, {gap: wp(4)}]}>
            <Image
              source={IMAGES.favorite}
              style={[
                styles.fav,
                {tintColor: likeUser ? '#BD2332' : colors._99999},
              ]}
            />
            <Text style={styles.likeCount}>{likeCount}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

export default memo(PlacesCard);

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
  pin: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
