import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo} from 'react';
import {hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';

type Props = {
  value?: boolean;
  onPress?: () => void;
  active?: boolean;
};

const GetCheckboxImage: FC<Props> = ({
  value,
  onPress = () => {},
  active = true,
}: Props) => {
  return active == false ? (
    <View>
      {value ? (
        <View
          style={[
            styles.checkView,
            {
              backgroundColor: colors._BD2332,
              borderColor: '#1B151599',
            },
          ]}>
          <Image source={IMAGES.check1} style={styles.checkBox} />
        </View>
      ) : (
        <View style={styles.checkView} />
      )}
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      {value ? (
        <View
          style={[
            styles.checkView,
            {
              backgroundColor: colors._BD2332,
              borderColor: colors._BD2332,
            },
          ]}>
          <Image source={IMAGES.check1} style={styles.checkBox} />
        </View>
      ) : (
        <View style={styles.checkView} />
      )}
    </TouchableOpacity>
  );
};

export default memo(GetCheckboxImage);

const styles = StyleSheet.create({
  checkView: {
    height: wp(20),
    width: wp(20),
    borderColor: '#1B151599',
    borderWidth: 2,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
