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
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {Button, LinearView} from '..';
import {AppStyles} from '../../theme/appStyles';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const ActivityFeedCard: FC<{
  onPressAdd?: () => void;
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
  isShowOptions = true,
  showInfo = true,
  showRating = true,
  containerStyle,
  imageStyle,
}) => {
  return (
    <LinearView>
      <View style={[{paddingVertical: wp(20)}, containerStyle]}>
        <Image
          source={{
            uri: 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
          }}
          style={[styles.imageStyle, imageStyle]}
        />
        <Text style={styles.title}>Communal Coffee</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: wp(20),
          }}>
          <Image source={IMAGES.locationWhite} style={styles.locationIcon} />
          <Text style={styles.userName2}>Toronto, Canada</Text>
        </View>

        {showInfo && (
          <Text style={styles.decText}>
            A charming café that doubles as a florist, offering a serene
            atmosphere with a variety of craft coffee drinks and seasonal menus.
            Locations in North Park, South Park, and Oceanside.
          </Text>
        )}

        <View style={{paddingHorizontal: wp(20)}}>
          <Text style={styles.label}>When</Text>
          <View style={[styles.row, {justifyContent: 'space-between',marginTop:10}]}>
            <Text style={styles.dateText}>April 3–5, 2025</Text>
            <View style={[styles.row, {gap: wp(4)}]}>
              {/* <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Fixed</Text>
                      </TouchableOpacity> */}
              <TouchableOpacity style={[styles.tag, styles.redBorder]}>
                <Text style={styles.tagTextRed}>Dates Flexible</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Tags</Text>
          <View style={styles.rowWrap}>
            {['Full Day', 'Half Day', 'Small Group'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.disabledTag}>
                <Text style={styles.disabledText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            onPress={() =>
              navigateTo(SCREEN_NAMES.NotificationDetails, {submit: true})
            }
            title="Apply to be a Guide"
            BtnStyle={{paddingVertical: hp(8), borderRadius: 8,marginTop:10}}
            titleStyle={styles.titleStyle}
          />
        </View>
      </View>
    </LinearView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    ...commonFontStyle(600, 12, colors.white),
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
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 8,
    paddingHorizontal: wp(20),
    marginTop: hp(18),
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
  },
  decText: {
    ...commonFontStyle(400, 14, '#5A5757'),
    marginVertical: 6,
    paddingHorizontal: wp(20),
  },
  features: {
    gap: wp(4),
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: hp(10),
    paddingLeft: wp(20),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
  },
  check: {
    width: wp(20),
    height: wp(20),
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
    paddingHorizontal: wp(20),
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

  label: {
    ...commonFontStyle(600, 16, colors._444444),
    marginTop:10
  },
  dateText: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: wp(10),
    borderColor: colors._D9D9D9,
    borderWidth: 1,
    padding: wp(6),
  },
  redBorder: {
    borderWidth: 1,
    borderColor: colors._BD2332,
    backgroundColor: 'transparent',
  },
  tagText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  tagTextRed: {
    ...commonFontStyle(600, 14, colors._BD2332),
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(6),
    marginTop:10
  },

  disabledTag: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(12),
    borderRadius: wp(18),
    borderWidth: 1,
    borderColor: colors._D9D9D9,
  },
  disabledText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
});

export default memo(ActivityFeedCard);
