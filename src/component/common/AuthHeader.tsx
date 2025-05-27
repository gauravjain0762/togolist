import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import {IMAGES} from '../../assets/Images';
import {hp, wp} from '../../theme/fonts';
import ProgressBar from 'react-native-animated-progress';
import {navigateTo} from '../../utils/commonFunction';
import {navigationRef} from '../../navigation/RootContainer';
import {colors} from '../../theme/colors';

type header = {
  proggress?: number;
  height?: number;
  onBackPress?: () => void;
};

const AuthHeader: FC<header> = ({
  proggress = 0,
  height,
  onBackPress = () => {},
}) => {
  console.log('proggress', proggress);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          navigationRef.goBack();
        }}>
        <Image source={IMAGES.back} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.bar}>
        <ProgressBar
          progress={proggress}
          height={height || 4}
          animated
          backgroundColor="#1B1515"
          onCompletion={() => {}}
          trackColor="#78788033"
        />
      </View>
    </View>
  );
};

export default memo(AuthHeader);

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
    backgroundColor: colors.white,
  },
  bar: {
    flexGrow: 1,
    paddingLeft: wp(64),
    paddingRight: wp(80),
    // paddingHorizontal: wp(80),
  },
});
