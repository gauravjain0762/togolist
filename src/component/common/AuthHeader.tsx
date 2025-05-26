import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets/Images';
import {hp, wp} from '../../theme/fonts';
import ProgressBar from 'react-native-animated-progress';

const AuthHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Image source={IMAGES.back} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.bar}>
        <ProgressBar
          progress={1}
          height={4}
          backgroundColor="#1B1515"
          trackColor="#78788033"
        />
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  back: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  header: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    flexGrow: 1,
    // paddingHorizontal: wp(80),
  },
});
