import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CardImage from '../../component/common/CardImage';
import {SwipeListView} from 'react-native-swipe-list-view';
import Animated from 'react-native-reanimated';
import CustomTabBar from '../../component/common/CustomTabBar';
import { useScrollHideAnimation } from '../../hook/useScrollHideAnimation';

const cards = [
  {
    title: 'Best of Egypt',
    location: 'Egypt',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
  },
  {
    title: 'Unesco Heritage Sites',
    location: 'Worldwide',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    title: 'London Guide',
    location: 'London',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    title: 'Where To Go: Peru',
    location: 'Peru',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
  {
    title: 'Safari: Africa Where To Go',
    location: 'Africa',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?safari,africa',
  },
  {
    title: 'Visit the Amazon',
    location: 'Brazil',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?amazon,forest',
  },
];

const CreatedForYou = () => {
       const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
          80,
          10,
        );
  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title="Profile"  showBack={true} showSearch={false} onMorePress={() => {}} />
      <View style={[{paddingHorizontal: 20}]}>
        {/* Title */}
        <Text style={styles.title}>Created For You</Text>

        {/* Byline */}
        <View style={styles.bylineContainer}>
          <Image source={IMAGES.ToglistCircleIcon} style={styles.icon} />
          <Text style={styles.bylineText}>
            By <Text style={styles.boldText}>Togolist</Text>
          </Text>
        </View>

        {/* Location + Collection count */}
        <Text style={styles.subtext}>Worldwide | 11 Collections</Text>

        {/* Description */}
        <Text style={styles.description}>
          Custom collections curated by{' '}
          <Text style={styles.boldText1}>Togolist</Text> based on your profile
          preferences.
        </Text>

        <View style={styles.searchContainer}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search within your list"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.byLocationText}>
          By location <Text style={{color: '#999999'}}> | </Text>
          <Text style={styles.azText}>A-Z</Text>
        </Text>
      </View>

      <Animated.FlatList
        data={cards}
         onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => {
          return (
            <CardImage
              onCardPress={() => {
                // navigateTo(SCREENS.CreatedForYou);
              }}
              title={item?.title}
              Togolist
              Worldwide
              Lists
              listCount={item.lists}
            />
          );
        }}
      />
      <View style={{height: 20}} />

       <Animated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default CreatedForYou;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(700, 32, colors.black),
    marginBottom: 8,
  },
  bylineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: wp(24),
    height: wp(24),
    marginRight: 8,
  },
  bylineText: {
    ...commonFontStyle(700, 15, colors.black),
  },
  bylineText: {
    ...commonFontStyle(500, 15, colors.black),
  },
  boldText: {
    ...commonFontStyle(600, 15, colors.black),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  description: {
    ...commonFontStyle(600, 16, colors.black),
  },
  boldText1: {
    ...commonFontStyle(600, 16, colors.black),
  },
  byLocationText: {
    ...commonFontStyle(500, 18, colors.primary1),
  },
  azText: {
    ...commonFontStyle(500, 18, '#999999'),
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
    marginHorizontal: 20,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: colors._BD2332,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: hp(28),
    gap: wp(30),
    overflow: 'hidden',
    marginTop: 12,
    marginHorizontal: 20,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(6),
  },
  backText: {
    ...commonFontStyle(500, 10, colors.white),
  },
  restore: {
    width: wp(23),
    height: wp(23),
    resizeMode: 'contain',
  },
  remove: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
});
