import React, {memo} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {LinearView} from '..';
import { AppStyles } from '../../theme/appStyles';

const DiscoverNewSpotsCard = ({title, location, image, avatar, users}) => {
  return (
    <LinearView>
      <View style={{padding: 20}}>
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
        <Text style={styles.decText}>A charming café that doubles as a florist, offering a serene atmosphere with a variety of craft coffee drinks and seasonal menus. Locations in North Park, South Park, and Oceanside.</Text>

        {/* <View style={[AppStyles.row]}>
          <Text st>4.5</Text>
          <Text>16k Google reviews</Text>
        </View> */}
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
    marginVertical:6
  },
});

export default memo(DiscoverNewSpotsCard);
