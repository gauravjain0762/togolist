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
  ViewStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {Button, LinearView} from '..';
import {AppStyles} from '../../theme/appStyles';
import Swiper from 'react-native-swiper';

const DiscoverNewSpotsCard: FC<{
  onPressAdd?: () => void;
  onPressBeenThere?: () => void;
  onPressFavs?: () => void;
  title?: string;
  location?: string;
  image?: ImageProps;
  avatar?: any;
  users?: any;
  isShowOptions?: boolean;
  showInfo?: boolean;
  showRating?: boolean;
  containerStyle?: ViewStyle;
}> = ({
  title,
  location,
  image,
  avatar,
  users,
  onPressAdd = () => {},
  onPressBeenThere = () => {},
  onPressFavs = () => {},
  isShowOptions = true,
  showInfo = true,
  showRating = true,
  containerStyle,
  imageStyle,
  showAddToList,
  followEvent,
  onEventPress
}) => {
  if (showAddToList) {
    return (
      <LinearView>
        <View style={[{paddingVertical: wp(20)}, containerStyle]}>
          <Image
            source={{
              uri: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
            }}
            style={[styles.imageStyle, imageStyle]}
          />
          <Text
            style={[styles.title, {paddingHorizontal: wp(20), marginTop: 18}]}>
            Communal Coffee
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp(20),
              gap:4
            }}>
            <Image source={IMAGES.locationWhite} style={styles.locationIcon} />
            <Text style={styles.userName2}>Toronto, Canada</Text>
          </View>
        </View>
      </LinearView>
    );
  }

  return (
    <LinearView>
      <View style={[{paddingVertical: wp(20)}, containerStyle]}>
        {/* <Image
          source={{
            uri: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
          }}
          style={[styles.imageStyle, imageStyle]}
        /> */}

        <View
          style={{
            paddingHorizontal: wp(20),
            marginBottom: hp(8),
            flexDirection: 'row',
          }}>
          <View style={{flex: 1,gap:2}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.title, {flex: 1}]}>Communal Coffee</Text>
              {showRating && (
                <View style={styles.footer}>
                  <View style={AppStyles.row}>
                    <Image
                      source={IMAGES.star}
                      style={styles.star}
                      resizeMode="contain"
                    />
                    <Text style={styles.review}>{'4.5'}</Text>
                  </View>
                  <Text style={styles.googlereview}>{'(16k)'}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap:4
              }}>
              <Image
                source={IMAGES.locationWhite}
                style={styles.locationIcon}
              />
              <Text style={styles.userName2}>Toronto, Canada</Text>
            </View>
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Swiper
            paginationStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.dotStyle}
            dotColor={colors._BD2332_0_3}
            activeDotColor={colors._BD2332}
            style={[styles.wrapper, {height: hp(244)}]}>
            {[1, 2, 3].map(() => {
              return (
                <Image
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/02/10/13/35/hotel-1191718_1280.jpg',
                  }}
                  style={[styles.imageStyle, imageStyle]}
                />
              );
            })}
          </Swiper>
        </View>
       {followEvent && <Button title='Follow Event' titleStyle={styles.titleStyle} BtnStyle={styles.btnStyle} onPress={onEventPress} />}

        {isShowOptions && (
          <View style={[AppStyles.row, styles.features]}>
            <TouchableOpacity
              onPress={() => onPressAdd()}
              style={[styles.optionItem]}>
              <Image style={styles.add} source={IMAGES.newList} />
              <Text style={[styles.optionText]}>{'Add to list'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressBeenThere()}
              style={[styles.optionItem]}>
              <Image style={styles.check} source={IMAGES.been} />
              <Text style={[styles.optionText]}>{'Been There'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressFavs()}
              style={[styles.optionItem]}>
              <Image style={styles.fav} source={IMAGES.favorite} />
              <Text style={[styles.optionText]}>{'Favs'}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showInfo && (
          <Text style={styles.decText}>
            {'Cozy cafe serving up artisan bites and baked goods.'}
          </Text>
        )}
      </View>
    </LinearView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    borderRadius: wp(20),
    overflow: 'hidden',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(16),
  },

  dotStyle: {
    width: 5,
    height: 5,
  },
  paginationStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    left: wp(SCREEN_WIDTH / 2 - 34),
    right: wp(SCREEN_WIDTH / 2 - 35),
    borderRadius: 100,
    bottom: hp(10),
    alignSelf: 'center',
  },
  wrapper: {
    height: hp(500),
  },
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
    ...commonFontStyle(700, 18, colors.black),
  },

  imageStyle: {
    height: hp(121),
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: wp(20),
  },
  locationIcon: {
    width: wp(14),
    height: wp(20),
    tintColor: '#A6A6A6',
    resizeMode: 'contain',
  },
  userName2: {
    ...commonFontStyle(500, 12, '#A6A6A6'),
    // marginTop: 2,
  },
  decText: {
    ...commonFontStyle(400, 14, '#5A5757'),
    // marginVertical: 6,
    paddingHorizontal: wp(20),
  },
  features: {
    gap: wp(4),
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: hp(8),
    paddingLeft: wp(20),
  },
  add: {
    width: wp(14),
    height: hp(20),
    resizeMode: 'contain',
    tintColor:"#BD2332"
  },
  check: {
    width: wp(22),
    height: wp(20),
    resizeMode: 'contain',
  },
  fav: {
    width: wp(21),
    height: wp(20),
    resizeMode: 'contain',
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: hp(7),
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
    alignSelf: 'flex-start',
    // marginTop: hp(10),
    // paddingHorizontal: wp(20),
  },
  googlereview: {
    ...commonFontStyle(500, 14, '#787878'),
  },
  review: {
    ...commonFontStyle(500, 14, '#787878'),
  },
  star: {
    width: wp(16),
    height: wp(15),
    tintColor: '#787878',
  },
  btnStyle:{
    paddingVertical:8,
    marginHorizontal:wp(20),
    marginTop:hp(8),
    borderRadius:10
  },
    titleStyle: {
    ...commonFontStyle(600, 16, colors.white),
  },
});

export default memo(DiscoverNewSpotsCard);
