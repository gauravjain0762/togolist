import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo} from 'react';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {LinearView} from '..';

type card = {};

const ExperienceCard: FC<card> = ({onBookPress,onAddPress,onFavsPress,onlyCard}) => {

  if(onlyCard){
    return       <ImageBackground
        source={IMAGES.event_bg} // replace with real image or local asset
        style={styles.image}
        imageStyle={styles.bg}>
        <Text style={styles.title}>Beer Lovers Toronto</Text>
        <View style={styles.chipsContainer}>
          {['Tour', '5-10 People', '2 Hours'].map((item, idx) => (
            <ImageBackground
              source={IMAGES.bg6}
              key={idx}
              imageStyle={{borderRadius: 8}}
              style={styles.chip}>
              {item == 'Tour' && (
                <Image source={IMAGES.tour} style={{width: 20, height: 16}} />
              )}
              <Text style={styles.chipText}>{item}</Text>
            </ImageBackground>
          ))}
        </View>
      </ImageBackground>
  }
  return (
    <LinearView containerStyle={styles.card}>
      {/* Header Image with Title */}
      <ImageBackground
        source={IMAGES.event_bg} // replace with real image or local asset
        style={styles.image}
        imageStyle={styles.bg}>
        <Text style={styles.title}>Beer Lovers Toronto</Text>
        <View style={styles.chipsContainer}>
          {['Tour', '5-10 People', '2 Hours'].map((item, idx) => (
            <ImageBackground
              source={IMAGES.bg6}
              key={idx}
              imageStyle={{borderRadius: 8}}
              style={styles.chip}>
              {item == 'Tour' && (
                <Image source={IMAGES.tour} style={{width: 20, height: 16}} />
              )}
              <Text style={styles.chipText}>{item}</Text>
            </ImageBackground>
          ))}
        </View>
      </ImageBackground>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onBookPress} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Book Tour</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onAddPress} style={styles.outlineBtn}>
          <Image source={IMAGES.newList} style={styles.addlist} />
          <Text style={styles.outlineText}> Add to list</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onFavsPress} style={styles.outlineBtn}>
          <Image source={IMAGES.favorite} style={styles.fav} />
          <Text style={styles.outlineText}> Favs</Text>
        </TouchableOpacity>
      </View>

      {/* Guide Info */}
      <View style={styles.guideRow}>
        <Text style={styles.guideLabel}>Guide:</Text>
        <Image source={IMAGES.avatar} style={styles.avatar} />
        <Text style={styles.guideName}>@emily</Text>
        <Image source={IMAGES.profile_badge} style={styles.badge} />
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Explore the best brews in Toronto with this walking tour of the city.
      </Text>

      {/* Reviews */}
      <View style={styles.reviewRow}>
        <View style={styles.row}>
          <Text style={styles.reviews}>Reviews (13)</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4].map((_, i) => (
              <Image source={IMAGES.ratingfill} style={styles.rating} />
            ))}
            <Image source={IMAGES.rating} style={styles.rating} />
          </View>
        </View>
        <Text style={styles.viewAll}>View All</Text>
      </View>
    </LinearView>
  );
};

export default memo(ExperienceCard);

const styles = StyleSheet.create({
  card: {
    padding: wp(20),
    gap: hp(10),
  },
  image: {
    height: hp(116),
    justifyContent: 'space-between',
    padding: wp(12),
  },
  title: {
    ...commonFontStyle(700, 18, colors.white),
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: wp(8),
  },
  chip: {
    // backgroundColor: 'rgba(27, 21, 21, 0.7)',
    borderRadius: wp(8),
    paddingHorizontal: wp(10),
    // paddingVertical: hp(4),
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    flexDirection: 'row',
    gap: 4,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    ...commonFontStyle(500, 13, colors._FAE8D1),
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: wp(8),
  },
  primaryBtn: {
    backgroundColor: colors._BD2332,
    paddingHorizontal: wp(16),
    paddingVertical: hp(11),
    borderRadius: wp(8),
    alignItems: 'center',
  },
  primaryText: {
    top: 3,
    ...commonFontStyle(500, 14, colors.white),
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors._BD2332,
    borderWidth: 1,
    borderRadius: wp(12),
    paddingHorizontal: wp(12),
    paddingVertical: hp(11),
    backgroundColor: colors.white,
  },
  outlineText: {
    ...commonFontStyle(500, 14, colors._BD2332),
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(6),
  },
  guideLabel: {
    ...commonFontStyle(500, 14, colors.black),
  },
  avatar: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9),
  },
  guideName: {
    ...commonFontStyle(500, 13, colors._444444),
  },
  description: {
    ...commonFontStyle(400, 14, colors._5A5757),
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(8),
  },
  reviews: {
    ...commonFontStyle(500, 16, colors._444444),
  },
  stars: {
    flexDirection: 'row',
    gap: wp(2),
  },
  viewAll: {
    ...commonFontStyle(500, 16, colors._444444),
  },
  bg: {
    borderRadius: 10,
  },
  addlist: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
    tintColor: '#BD2332',
  },
  fav: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
  },
  badge: {
    width: wp(11),
    height: hp(15),
    resizeMode: 'contain',
  },
  rating: {
    width: wp(19),
    height: wp(19),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
});
