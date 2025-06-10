import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CardImage from '../../component/common/CardImage';
import CardImageView from '../../component/trip/CardImageView';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import CategoryCard from '../../component/trip/CategoryCard';
import {useRoute} from '@react-navigation/native';
import {navigationRef} from '../../navigation/RootContainer';

const categories = [
  {
    title: 'Tourist Attractions',
    category: 'Activities',
    places: 0,
    image: 'https://example.com/ferris.jpg',
    iconName: 'checkbox-outline',
  },
  {
    title: 'Places to Stay',
    category: 'Accommodations',
    places: 0,
    image: 'https://example.com/stay.jpg',
    iconName: 'home-outline',
  },
  {
    title: 'Where to Eat',
    category: 'Dinning',
    places: 0,
    image: 'https://example.com/eat.jpg',
    iconName: 'restaurant-outline',
  },
];

const ThingsTogolistsScreen = ({navigate}: any) => {
  const {params} = useRoute();

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        title={
          params?.isBack
            ? 'Back'
            : params?.showTitle
            ? 'Peru Explorations'
            : 'Trips'
        }
        showSearch={false}
        onMorePress={() => {}}
      />
      <View style={[{paddingHorizontal: 20}]}>
        {/* Title */}
        {params?.showTitle && (
          <Text style={[styles.title, {color: '#999999'}]}>Things to Do</Text>
        )}
        <Text style={styles.title}>Things to Do</Text>

        {/* Location + Collection count */}
        <Text style={styles.subtext}>Trip to Toronto, Canada | 0 Lists</Text>

        <View style={styles.searchContainer}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search within your list"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>
      </View>
      <View style={[styles.horizontal_divider]} />
      <Text style={styles.byLocationText}>
        Most Recent <Text style={{color: '#999999'}}> | </Text>
        <Text style={styles.azText}>Date Created</Text>{' '}
        <Text style={{color: '#999999'}}> | </Text>
        <Text style={styles.azText}>A-Z</Text>
      </Text>
      <FlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => {
          return (
            <CategoryCard
              onCardPress={() => {
                navigateTo(SCREENS.TripTogolistsScreen, {showTitle: true});
              }}
              title={item?.title}
              Togolist={item?.category}
              Lists
              listCount={item?.places}
            />
          );
        }}
        ListFooterComponent={() => {
          return (
            <Button
              leftImg={IMAGES.addlist}
              type="outline"
              title="Add a new place"
              BtnStyle={styles.btn}
              onPress={() =>
                navigateTo(SCREENS.AddTripTogolistsScreen, {
                  sources: params?.isBack ? true : false,
                })
              }
            />
          );
        }}
      />
      <View style={{height: 20}} />
    </SafeAreaView>
  );
};

export default ThingsTogolistsScreen;

const styles = StyleSheet.create({
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginBottom: hp(21),
    marginTop: 3,
    width: '100%',
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
    // marginBottom: 8,
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
  boldText: {
    ...commonFontStyle(600, 15, colors.black),
  },
  subtext: {
    marginVertical: 10,
    ...commonFontStyle(600, 15, '#999999'),
  },
  description: {
    ...commonFontStyle(400, 16, colors.black),
  },
  boldText1: {
    ...commonFontStyle(600, 16, colors.black),
  },
  byLocationText: {
    ...commonFontStyle(500, 18, colors.primary1),
    marginHorizontal: 20,
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
    paddingVertical: 12,
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },

  btn: {
    marginVertical: hp(16),
    paddingVertical: hp(12),
  },
});
