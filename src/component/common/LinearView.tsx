import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: any;
  containerStyle?: ViewStyle[] | {};
  colors?: string[];
  linearViewStyle?: ViewStyle[] | {};
};

const LinearView: FC<Props> = ({
  children,
  containerStyle,
  colors,
  linearViewStyle,
}) => {
  return (
    <LinearGradient
      style={[styles.linearView, linearViewStyle]}
      locations={[0, 1]}
      colors={colors || ['#F8F8F8', '#E5E5E5']}>
      <View style={containerStyle}>{children}</View>
    </LinearGradient>
  );
};

export default memo(LinearView);

const styles = StyleSheet.create({
  linearView: {
    // flex: 1,
    borderRadius: 20,
  },
});
