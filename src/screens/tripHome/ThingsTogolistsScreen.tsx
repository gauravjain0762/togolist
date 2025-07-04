import {
  FlatList,
  Image,
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
import {SwipeListView} from 'react-native-swipe-list-view';

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
       showBack={true}
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
      <SwipeListView
        data={categories}
        nestedScrollEnabled
        contentContainerStyle={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        renderItem={(data, rowMap) => {
          return (
            <View style={styles.rowFront}>
              <CategoryCard
                onCardPress={() => {
                  navigateTo(SCREENS.TripTogolistsScreen, {showTitle: true});
                }}
                title={data?.item?.title}
                Togolist={data?.item?.category}
                Lists
                listCount={data?.item?.places}
              />
            </View>
          );
        }}
        disableRightSwipe
        swipeToOpenPercent={30}
        rightOpenValue={-140}
        
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
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={styles.backButton}>
              <Image source={IMAGES.restore} style={styles.restore} />
              <Text style={styles.backText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backButton, {marginTop: hp(4)}]}>
              <Image source={IMAGES.remove} style={styles.remove} />
              <Text style={styles.backText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
      />
      {/* <FlatList
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
      /> */}
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

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
    // marginHorizontal: 20,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: colors._BD2332,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: hp(16),
    gap: wp(30),
    overflow: 'hidden',
    marginTop: 12,
    // marginLeft:30
    // marginHorizontal: 20,
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
