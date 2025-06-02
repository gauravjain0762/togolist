import {
  FlatList,
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
import {commonFontStyle, Fs, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import ExploreCard from '../../component/explore/ExploreCard';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';

type Props = {};

const categories = [
  {label: 'Top Rated Nearby 🏆'},
  {label: 'Entertainment 🎭'},
  {label: 'Outdoors 🌲'},
  {label: 'Wellness 🧘'},
  {label: 'Shopping 🎪'},
  {label: 'Fun 🎳'},
  {label: 'More'},
];

const CARD_DATA = [
  {
    title: 'Trending\nDestinations 🔥',
  },
  {
    title: 'Top Rated\nExperiences 🏆',
  },
  {
    title: 'Bucket-List\nHighlights',
  },
  {
    title: 'Unique\nAdventures 💎',
  },
  {
    title: 'Seasonal\nFavorites 🏕️🌸',
  },
  {
    title: 'Top Foodie\nSpots 🍣🍜',
  },
  {
    title: 'Weekend\nGetaways ⛺✈️',
  },
  {
    title: 'Curated Lists from\nInfluencers 🧑‍🤝‍🧑',
  },
  {
    title: 'Weekend\nGetaways ⛺✈️',
  },
  {
    title: 'Curated Lists from\nInfluencers 🧑‍🤝‍🧑',
  },
];

const SearchScreen = (props: Props) => {
  const [activeTab, setActiveTab] = useState('hot');
  const [select, setSelect] = useState('List View');

  function NavItem({icon, library, active, onPress, keyValue}) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.navItem}>
        <Image
          source={icon}
          style={keyValue ? styles.tabIcon1 : styles.tabIcon}
        />
        {active && <View style={styles.activeBar} />}
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>{'Explore'}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: wp(16),
        }}>
        <View style={styles.searchBox}>
          {/* <Ionicons name="search" size={20} color="#999" /> */}
          <Image
            source={IMAGES.search}
            style={{width: 17, height: 15, tintColor: '#A4A4A4'}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#A4A4A4"
            style={styles.searchInput}
          />
        </View>

        {/* Category Chips */}
        <View style={styles.tagsContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text style={styles.tagText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabView}>
          <NavItem
            icon={activeTab === 'hot' ? IMAGES.solar : IMAGES.solar_off}
            active={activeTab === 'hot'}
            onPress={() => {
              setActiveTab('hot');
            }}
          />
          <NavItem
            icon={
              activeTab === 'location' ? IMAGES.Subtract_on : IMAGES.Subtract
            }
            active={activeTab === 'location'}
            keyValue={true}
            onPress={() => {
              setActiveTab('location');
            }}
          />
          <NavItem
            icon={activeTab === 'profile' ? IMAGES.user1_on : IMAGES.user1}
            active={activeTab === 'profile'}
            onPress={() => {
              setActiveTab('profile');
            }}
          />
          <NavItem
            icon={
              activeTab === 'events'
                ? IMAGES.calendar_star_on
                : IMAGES.calendar_star
            }
            active={activeTab === 'events'}
            onPress={() => {
              setActiveTab('events');
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20}}>
          {activeTab == 'hot' && (
            <FlatList
              data={CARD_DATA}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{
                paddingTop: hp(10),
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => <ExploreCard {...item} />}
              ListFooterComponent={() => {
                return <View style={{height: 300}} />;
              }}
            />
          )}
          {activeTab == 'location' && (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Discover New Spots</Text>
                <Text style={styles.headerText1}>15miles Radius</Text>
              </View>
              <View style={styles.select}>
                <TouchableOpacity onPress={() => setSelect('List View')}>
                  <Text
                    style={[
                      styles.subtext,
                      {
                        fontSize: Fs(18),
                        color:
                          select == 'List View'
                            ? colors._BD2332
                            : colors._99999,
                      },
                    ]}>
                    List View
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.subtext, {fontSize: Fs(18)}]}>{'|'}</Text>
                <TouchableOpacity onPress={() => setSelect('Map View')}>
                  <Text
                    style={[
                      styles.subtext,
                      {
                        fontSize: Fs(18),
                        color:
                          select == 'Map View' ? colors._BD2332 : colors._99999,
                      },
                    ]}>
                    Map View
                  </Text>
                </TouchableOpacity>
              </View>
              {select == 'List View' && (
                <>
                  <FlatList
                    data={[1, 2]}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item}) => <DiscoverNewSpotsCard {...item} />}
                    ListFooterComponent={() => {
                      return <View style={{height: 300}} />;
                    }}
                  />
                </>
              )}
              {select == 'Map View' && (
                <>
                  <Text>Map View</Text>
                </>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    marginVertical: 10,
    ...commonFontStyle(600, 34, colors.black),
    flex: 1,
  },
  moreIcon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    marginBottom: 15,
    marginTop: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    ...commonFontStyle(400, 14, '#000'), // You can change 16 to any default search input size
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  tagText: {
    ...commonFontStyle(600, 12, '#000'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
  },

  headerText: {
    ...commonFontStyle(600, 18, '#000'),
    flex: 1,
  },
  headerText1: {
    ...commonFontStyle(400, 14, '#787878'),
  },

  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 29,
    marginHorizontal: 20,
  },
  activeBar: {
    marginTop: 4,
    width: 36,
    height: 3,
    borderRadius: 100,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: -5,
  },
  tabIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  tabIcon1: {
    width: 21,
    height: 29,
    resizeMode: 'contain',
  },
  navItem: {
    alignItems: 'center',
  },

  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },

  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
});
