/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IMAGES} from '../assets/Images';
import FastImage from 'react-native-fast-image';
import {colors} from '../theme/colors';
import {hp, wp} from '../theme/fonts';
import HomeScreen from '../screens/home/HomeScreen';
import {SCREENS} from './screenNames';
import {useAppSelector} from '../redux/hooks';
import SearchScreen from '../screens/search/SearchScreen';
import CreateListScreen from '../screens/newList/CreateListScreen';
import ShapeScreen from '../screens/shape/ShapeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
const CustomTabBar = ({state, navigation}: any) => {
  return (
    <SafeAreaView edges={['bottom']}>
      <View style={[styles.tabBarContainer]}>
        {state.routes.map((route: any, index: any) => {
          const isFocused = state.index === index;

          let iconName;
          switch (route.name) {
            case SCREENS.HomeScreen:
              iconName = isFocused ? IMAGES.trips : IMAGES.trips;
              break;
            case SCREENS.SearchScreen:
              iconName = IMAGES.search;
              break;
            case SCREENS.CreateListScreen:
              iconName = IMAGES.newList;
              break;
            case SCREENS.ShapeScreen:
              iconName = IMAGES.shape;
              break;
            case SCREENS.ProfileScreen:
              iconName = IMAGES.user;
              break;
            default:
              iconName = IMAGES.user;
          }

          return (
            <TouchableOpacity
              key={route.name}
              onPress={() => navigation.navigate(route.name)}
              style={[
                styles.tabButton,
                {
                  // backgroundColor: isFocused ? colors.white : colors._181818,
                },
              ]}>
              {route.name == SCREENS.CreateListScreen ? (
                <FastImage
                  source={iconName}
                  defaultSource={iconName}
                  style={styles.carImage}
                  resizeMode="contain"
                  tintColor={isFocused ? '#BD2332' : colors.black}
                />
              ) : (
                <FastImage
                  source={iconName}
                  defaultSource={iconName}
                  style={styles.image}
                  resizeMode="contain"
                  tintColor={isFocused ? '#BD2332' : colors.black}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// Main App with Tab Navigation
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREENS.ProfileScreen}
      tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen name={SCREENS.SearchScreen} component={SearchScreen} />
      <Tab.Screen name={SCREENS.HomeScreen} component={HomeScreen} />
      <Tab.Screen
        name={SCREENS.CreateListScreen}
        component={CreateListScreen}
      />
      <Tab.Screen name={SCREENS.ShapeScreen} component={ShapeScreen} />
      <Tab.Screen name={SCREENS.ProfileScreen} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    gap: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: colors.white,
    paddingVertical: Platform.OS == 'ios' ? 0 : hp(6),
  },
  tabButton: {
    width: wp(65),
    height: hp(65),
    borderRadius: 60,
    // backgroundColor: colors._181818,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: hp(28),
    height: hp(28),
  },
  carImage: {
    width: hp(26),
    height: hp(37),
    resizeMode: 'contain',
  },
});
