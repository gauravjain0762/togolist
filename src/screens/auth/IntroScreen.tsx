import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../theme/colors';
import {AuthHeader} from '../../component';
import {AppStyles} from '../../theme/appStyles';

const IntroScreen = () => {
  return (
    <View style={AppStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <AuthHeader />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({});
