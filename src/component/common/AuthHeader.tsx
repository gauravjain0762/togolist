import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo, useRef} from 'react';
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
  showBack?: any;
};

const AuthHeader: FC<header> = ({
  proggress = 0,
  height,
  onBackPress = () => {},
  showBack = true,
}) => {
  console.log('proggress', proggress);
  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity
          onPress={() => {
            onBackPress ? onBackPress() : navigationRef.goBack();
          }}>
          <Image source={IMAGES.back2} style={styles.back} />
        </TouchableOpacity>
      )}
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
    width: wp(24),
    height: wp(24),
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
    paddingLeft: wp(40),
    paddingRight: wp(64),
    // paddingHorizontal: wp(80),
  },
});
