import {
  Image,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';

type Props = {};

const categories = [
  {emoji: '🛍️', label: 'Shopping'},
  {emoji: '🏆', label: 'Top Rated Nearby'},
  {emoji: '🍔', label: 'Food'},
  {emoji: '🎡', label: 'Entertainment'},
  {emoji: '🌲', label: 'Outdoors'},
  {emoji: '📚', label: 'Culture'},
  {emoji: '🧘', label: 'Wellness'},
  {emoji: '🎉', label: 'Fun'},
  {emoji: '👨‍👩‍👧‍👦', label: 'Family/Friends'},
  {emoji: '💛', label: 'Date'},
  {emoji: '🎟️', label: 'Events'},
];

const ShapeScreen = (props: Props) => {
  return (
    <SafeAreaView
      style={[AppStyles.mainWhiteContainer, {paddingHorizontal: 20}]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, Ray!</Text>
        <TouchableOpacity
          onPress={() => navigateTo(SCREENS.NotificationScreen)}
          style={styles.profileIcon}>
          <Image
            source={IMAGES.addLocation}
            style={{width: 24, height: 24, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Image
          source={IMAGES.search1}
          style={{width: 24, height: 24, resizeMode: 'contain'}}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#5A5757"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.subHeading}>Where do you want to go?</Text>
      <View style={styles.categoryGrid}>
        {categories.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              navigateTo(SCREENS.SearchViewScreen);
            }}
            key={index}
            style={styles.categoryButton}>
            <Text style={styles.categoryText}>
              {item.emoji} {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ShapeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...commonFontStyle(700, 34, colors.black),
  },
  profileIcon: {
    padding: 4,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 12,
    height: 57,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    ...commonFontStyle(400, 15, colors.black),
  },
  subHeading: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 24,
    textAlign: 'center',
    marginTop: hp(80),
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#1B151533',
    alignSelf: 'center',
  },
  categoryText: {
    ...commonFontStyle(500, 14, 'black'),
  },
});
