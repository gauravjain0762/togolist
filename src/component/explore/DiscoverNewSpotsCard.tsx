import React, {FC, memo} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageProps,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {LinearView} from '..';
import {AppStyles} from '../../theme/appStyles';

const DiscoverNewSpotsCard: FC<{
  onPressAdd?: () => void;
  title?: string;
  location?: string;
  image?: ImageProps;
  avatar?: any;
  users?: any;
  isShowOptions?: boolean;
  showInfo?: boolean;
  showRating?: boolean;
}> = ({
  title,
  location,
  image,
  avatar,
  users,
  onPressAdd = () => {},
  isShowOptions = true,
  showInfo = true,
  showRating = true,
}) => {
  return (
    <LinearView>
      <View style={{padding: wp(20)}}>
        <Image
          source={{
            uri: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
          }}
          style={styles.imageStyle}
        />
        <Text style={styles.title}>Communal Coffee</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={IMAGES.locationWhite} style={styles.locationIcon} />
          <Text style={styles.userName2}>Toronto, Canada</Text>
        </View>
        {isShowOptions && (
          <View style={[AppStyles.row, styles.features]}>
            <TouchableOpacity
              onPress={() => onPressAdd()}
              style={[styles.optionItem]}>
              <Image style={styles.add} source={IMAGES.newList} />
              <Text style={[styles.optionText]}>{'Add to list'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.check} source={IMAGES.been} />
              <Text style={[styles.optionText]}>{'Been There'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.fav} source={IMAGES.favorite} />
              <Text style={[styles.optionText]}>{'Favs'}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showInfo && (
          <Text style={styles.decText}>
            A charming café that doubles as a florist, offering a serene
            atmosphere with a variety of craft coffee drinks and seasonal menus.
            Locations in North Park, South Park, and Oceanside.
          </Text>
        )}

        {showRating && (
          <View style={styles.footer}>
            <Text style={styles.review}>{'4.5'}</Text>
            <View style={AppStyles.row}>
              <Image
                source={IMAGES.star}
                style={styles.star}
                resizeMode="contain"
              />
              <Image
                source={IMAGES.star}
                style={styles.star}
                resizeMode="contain"
              />
              <Image
                source={IMAGES.star}
                style={styles.star}
                resizeMode="contain"
              />
              <Image
                source={IMAGES.star}
                style={styles.star}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.googlereview}>{'16k Google reviews'}</Text>
          </View>
        )}
      </View>
    </LinearView>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: CARD_WIDTH,
    // height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  title: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 8,
    marginTop: 18,
  },

  imageStyle: {
    height: hp(121),
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 10,
  },
  locationIcon: {
    width: wp(14),
    height: wp(20),
    tintColor: '#A6A6A6',
    resizeMode: 'contain',
  },
  userName2: {
    ...commonFontStyle(500, 12, '#A6A6A6'),
  },
  decText: {
    ...commonFontStyle(400, 14, '#5A5757'),
    marginVertical: 6,
  },
  features: {
    gap: wp(4),
    flex: 1,
    // flexWrap: 'wrap',
    marginVertical: hp(10),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
  },
  check: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
  },
  fav: {
    width: wp(21),
    height: wp(18),
    resizeMode: 'contain',
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(4),
    backgroundColor: colors.white,
  },
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(10),
  },
  googlereview: {
    ...commonFontStyle(500, 14, colors._787878),
  },
  review: {
    ...commonFontStyle(500, 16, colors.black),
  },
  star: {
    width: wp(24),
    height: wp(24),
  },
});

export default memo(DiscoverNewSpotsCard);
