import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import LinearView from '../common/LinearView';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {AppStyles} from '../../theme/appStyles';

type card = {
  onBookPress?: () => void;
  onAddPress?: () => void;
  onFavsPress?: (e: any) => void;
  TourImg?: any;
  onPressCard?: () => void;
};

const ExploreProfileCard: FC<card> = ({
  onBookPress,
  onAddPress,
  onFavsPress = () => {},
  TourImg,
  onPressCard = () => {},
}) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <LinearView containerStyle={styles.card}>
      <TouchableOpacity
        onPress={() => onPressCard()}
        style={[AppStyles.flex1, {gap: hp(10)}]}>
        <View style={styles.headerrow}>
          <View style={styles.stats}>
            <Image source={IMAGES.profile} style={styles.avatar} />
            <View style={{gap: hp(6)}}>
              <View style={styles.row}>
                <Text style={styles.username}>@Emily </Text>
                <Image style={styles.badge} source={IMAGES.profile_badge} />
              </View>
              <View style={styles.row}>
                <Text style={styles.statsText}> 58 Lists</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.statsText}> 96K Saves</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.statsText}>10 Listsgs</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            hitSlop={10}
            onPress={() => (setIsFav(prev => !prev), onFavsPress(isFav))}>
            <Image
              source={IMAGES.favorite}
              style={[
                styles.fav,
                {tintColor: isFav ? colors._BD2332 : colors._787878},
              ]}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.lising}>Featured Listing</Text>
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
                  <Image
                    source={TourImg || IMAGES.tour}
                    style={{width: 20, height: 16}}
                  />
                )}
                <Text style={styles.chipText}>{item}</Text>
              </ImageBackground>
            ))}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </LinearView>
  );
};

export default ExploreProfileCard;

const styles = StyleSheet.create({
  card: {
    padding: wp(10),
  },
  image: {
    height: hp(97),
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
  bg: {
    borderRadius: 10,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fav: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    ...commonFontStyle(500, 14, colors._99999),
  },
  divider: {
    ...commonFontStyle(400, 14, '#ccc'),
    marginHorizontal: wp(2),
  },
  username: {
    ...commonFontStyle(500, 14, colors.black),
  },
  badge: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
  },
  avatar: {
    width: wp(58),
    height: wp(58),
    borderRadius: wp(40),
    marginRight: wp(4),
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  lising: {
    ...commonFontStyle(600, 12, colors.black),
  },
});
