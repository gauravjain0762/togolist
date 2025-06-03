import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

type bar = {container?: ViewStyle};

const OptionBar: FC<bar> = ({container}) => {
  return (
    <View style={[styles.container, container]}>
      <View style={styles.row}>
        <Image source={IMAGES.send} style={styles.icon} />
        <Text style={styles.label}>{'Share'}</Text>
      </View>
      <View style={styles.row}>
        <Image source={IMAGES.newList} style={styles.icon} />
        <Text style={styles.label}>{'Add to list'}</Text>
      </View>
      <View style={styles.row}>
        <Image source={IMAGES.checkbox} style={styles.icon} />
        <Text style={styles.label}>{'Been there'}</Text>
      </View>
      <View style={styles.row}>
        <Image
          source={IMAGES.remove}
          style={[styles.icon, {width: wp(26), height: wp(26)}]}
        />
        <Text style={styles.label}>{'Remove'}</Text>
      </View>
    </View>
  );
};

export default OptionBar;

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
