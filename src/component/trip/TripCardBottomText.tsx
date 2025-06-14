import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, sharedTransition, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import Animated from 'react-native-reanimated';

const TripCardBottomText: FC<any> = ({
  title,
  location,
  showDay,
  dayValue,
  BGImg,
  containerStyle,
  onPress,
  showDayTime,
  activeOpacity,
}: any) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <ImageBackground
        source={IMAGES.bg1}
        style={[styles.container, containerStyle]}
        imageStyle={[styles.image, BGImg]}>
        {location && (
          <View style={styles.row}>
            <Image source={IMAGES.locationWhite} style={styles.iconStyle} />
            <Text style={styles.headerText}>{location}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          {showDay && (
            <Text style={styles.valueText}>
              {dayValue} <Text style={styles.dayText}>Days</Text>
            </Text>
          )}
          {showDayTime && <Text style={styles.valueText1}>{showDayTime}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(TripCardBottomText);

const styles = StyleSheet.create({
  container: {
    height: 116,
    borderRadius: 18,
    overflow: 'hidden',
    // justifyContent: 'space-between',
    // marginTop: 12,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  image: {
    borderRadius: 25,
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
    flex: 1,
  },
  headerText: {
    ...commonFontStyle(500, 12, '#CFCFCF'),
  },
  valueText: {
    ...commonFontStyle(700, 24, colors.white),
    marginRight: 2,
  },
  valueText1: {
    ...commonFontStyle(500, 13, '#CFCFCF'),
    marginRight: 2,
  },
  dayText: {
    ...commonFontStyle(500, 12, '#CFCFCF'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  iconStyle: {
    width: 15,
    height: 20,
    tintColor: '#CFCFCF',
    resizeMode: 'contain',
  },
});
