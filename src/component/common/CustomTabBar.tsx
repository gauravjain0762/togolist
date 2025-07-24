import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {SharedElement} from 'react-native-shared-element';
import FastImage from 'react-native-fast-image';
import { SCREENS } from '../../navigation/screenNames';
import { useNavigation } from '@react-navigation/native';


// Custom Tab Bar Component
const CustomTabBar = () => {
  const navigation=useNavigation()
  const stateData=[
    {index:1,name:SCREENS.SearchScreen},
    {index:2,name:SCREENS.TripHome},
    {index:3,name:SCREENS.CreateListScreen},
    {index:4,name:SCREENS.NotificationScreen},
    {index:5,name:SCREENS.ProfileScreen},
  ]
  return (
    <View>
      <View style={[styles.tabBarContainer]}>
        {stateData?.map((route: any, index: any) => {
          const isFocused = 1 === index;

          let iconName;
          switch (route.name) {
            case SCREENS.TripHome:
              iconName = IMAGES.trips;
              break;
            case SCREENS.SearchScreen:
              iconName = IMAGES.search;
              break;
            case SCREENS.CreateListScreen:
              iconName = IMAGES.newList;
              break;
            case SCREENS.NotificationScreen:
              iconName = IMAGES.shape;
              break;
            case SCREENS.ProfileScreen:
              iconName = IMAGES.Avatar_icon;
              break;
            default:
              iconName = IMAGES.user;
          }

          const onPress = () => {
            // const event = navigation.emit({
            //   type: 'tabPress',
            //   target: route?.key,
            //   canPreventDefault: true,
            // });

            navigation.navigate(route?.name);
          };

          const onLongPress = () => {
            // navigation.emit({
            //   type: 'tabLongPress',
            //   target: route.key,
            // });
          };

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              // onLongPress={onLongPress}
              // onPress={() => navigation.navigate(route.name,{ from: 'button' })}
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
                  tintColor={ colors.black}
                />
              ) : (
                <FastImage
                  source={iconName}
                  defaultSource={iconName}
                  style={styles.image}
                  resizeMode="contain"
                  // tintColor={ colors.black}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    // gap: 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 40,
    borderTopWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: colors.white,
    // paddingVertical: Platform.OS == 'ios' ? 0 : hp(0),
    width: '100%',
    paddingBottom: 12,
  },
  tabButton: {
    width: wp(65),
    height: hp(65),
    // borderRadius: 60,
    // backgroundColor: colors._181818,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: hp(24),
    height: hp(24),
    resizeMode:'contain'
  },
  carImage: {
    width: hp(28),
    height: hp(37),
    resizeMode: 'contain',
  },
});
