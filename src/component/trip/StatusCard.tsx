import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {LinearView} from '..';
import { navigateTo } from '../../utils/commonFunction';
import { SCREENS } from '../../navigation/screenNames';

const StatusCard = ({title, showBucket}: any) => {
  const tabs = [
    {
      key: 'Trips',
      value: 0,
    },
    {
      key: 'Countries',
      value: 0,
    },
    {
      key: 'Cities',
      value: 0,
    },
    {
      key: 'Days',
      value: 0,
    },
  ];

  const showBuckettabs = [
    {
      key: 'Bucket List Trips',
      value: '0/1',
    },
    {
      key: 'World Wonders',
      value: '0/7',
    },
  ];
  const data = showBucket ? showBuckettabs : tabs;
  return (
    <TouchableOpacity  onPress={() => navigateTo(SCREENS.TripsDetails)}>

    <LinearView
      linearViewStyle={{marginTop: hp(20)}}
      containerStyle={{paddingVertical: 20}}>
      <Text
        style={[
          commonFontStyle(700, 24, colors.black),
          {marginBottom: 16, textAlign: 'center'},
        ]}>
        {title}
      </Text>
      <View style={[styles.tabContainer]}>
        {data?.map((tab, index) => {
          return (
            <View style={styles.tabItem}>
              <Text style={{...commonFontStyle(600, 20, colors.primary1)}}>
                {tab?.value}
              </Text>
              <Text style={{...commonFontStyle(500, 10, '#444444')}}>
                {tab?.key}
              </Text>
            </View>
          );
        })}
      </View>
    </LinearView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 12,
    flex: 1,
  },
  tabContainer1: {
    backgroundColor: '#7878800D',
    borderRadius: 20,
    marginTop: 18,
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default memo(StatusCard);
