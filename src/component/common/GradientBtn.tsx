import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';

type button = {
  title: string;
  onPress?: () => void;
  BtnStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const GradientBtn: FC<button> = ({
  title,
  BtnStyle,
  onPress = () => {},
  titleStyle,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <LinearGradient
        style={[styles.gredientStyle, BtnStyle]}
        locations={[0, 1]}
        colors={['#FFFFFF46', '#00000081']}>
        <View style={[styles.btn]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientBtn;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  title: {
    ...commonFontStyle(700, 18, colors.white),
  },
  gredientStyle: {
    backgroundColor: colors._BD2332,
    borderRadius: 100,
  },
});
