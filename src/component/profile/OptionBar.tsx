import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

type bar = {container?: ViewStyle};

const OptionBar: FC<bar> = ({
  container,
  tripsTab,
  onSharePress,
  onBucketListPress,
  onBuildItineraryPress,
  onArchivePress,
  onAddListPress,
  onBeentherePress,
  onRemovePress,
}: any) => {
  if (tripsTab) {
    return (
      <View style={[styles.container, container]}>
        <TouchableOpacity
          onPress={onSharePress}
          style={[styles.row, {paddingLeft: 20}]}>
          <Image source={IMAGES.send} style={styles.icon} />
          <Text style={styles.label}>{'Share'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBucketListPress} style={styles.row}>
          <Image source={IMAGES.BucketList} style={styles.icon} />
          <Text style={styles.label}>{'Bucket List'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBuildItineraryPress} style={styles.row}>
          <Image source={IMAGES.BuildItinerary} style={styles.icon} />
          <Text style={styles.label}>{'Build Itinerary'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onArchivePress} style={styles.row}>
          <Image
            source={IMAGES.Archive}
            style={[styles.icon, {width: wp(26), height: wp(26)}]}
          />
          <Text style={styles.label}>{'Archive'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.container, container]}>
      <TouchableOpacity
        onPress={onSharePress}
        style={[styles.row, {paddingLeft: 20}]}>
        <Image source={IMAGES.send} style={styles.icon} />
        <Text style={styles.label}>{'Share'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onAddListPress} style={styles.row}>
        <Image source={IMAGES.newList} style={styles.icon} />
        <Text style={styles.label}>{'Add to list'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBeentherePress} style={styles.row}>
        <Image source={IMAGES.checkbox} style={styles.icon} />
        <Text style={styles.label}>{'Been there'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRemovePress} style={styles.row}>
        <Image
          source={IMAGES.remove}
          style={[styles.icon, {width: wp(26), height: wp(26)}]}
        />
        <Text style={styles.label}>{'Remove'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(OptionBar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors._BD2332,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(36),
    paddingBottom: hp(22),
    paddingHorizontal: wp(33),
  },
  icon: {
    width: wp(30),
    height: wp(30),
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  row: {
    alignItems: 'center',
  },
  label: {
    ...commonFontStyle(500, 10, colors.white),
    lineHeight: hp(24),
  },
});
