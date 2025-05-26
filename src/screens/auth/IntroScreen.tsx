import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../theme/colors';
import {AuthHeader} from '../../component';
import {AppStyles} from '../../theme/appStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={AppStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <AuthHeader />
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({});
