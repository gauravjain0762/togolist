import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, Fs, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {
  Button,
  CommonSheet,
  LinearView,
  Loader,
  ProfileCard,
} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import ExploreCard from '../../component/explore/ExploreCard';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
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

  const AddListCard = useCallback(item => {
    return (
      <TouchableOpacity style={styles.card}>
        <ImageBackground
          source={IMAGES.bg1}
          imageStyle={styles.imgStyle}
          resizeMode="cover"
          style={styles.bg}>
          <Text style={styles.cardTitle}>{'Tourist Attractions'}</Text>
          <Image source={IMAGES.add_icon} style={styles.addicon} />
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

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
          flex: 1,
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
          style={{marginTop: 20, flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
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
                  <TouchableOpacity onPress={() => handlePresentModalPress()}>
                    <Text>Map View</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
          {activeTab == 'profile' && (
            <View>
              <ImageBackground
                source={IMAGES.requestHost_bg}
                resizeMode="cover"
                style={styles.imageContainer}>
                <>
                  <Text style={styles.title}>Find a Host</Text>
                  <TouchableOpacity style={[styles.inputBox]}>
                    <Image source={IMAGES.location} style={styles.icon} />
                    <Text style={styles.placeholder}>Location</Text>
                  </TouchableOpacity>
                  <View style={styles.Eventrow}>
                    <TouchableOpacity style={styles.card1}>
                      <Image source={IMAGES.canlder} style={styles.icon1} />
                      <Text style={styles.cardText}>Event Dates</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.BGcard}>
                      <Image source={IMAGES.clock} style={styles.icon} />
                      <Text style={styles.cardText}>Length</Text>
                    </TouchableOpacity>
                  </View>
                  <Button title="Find Local Guides" />
                </>
              </ImageBackground>
              <View style={styles.guiderow}>
                <Text style={styles.guideTitle}>{'Local Guides'}</Text>
                <Text style={styles.headerlabel}>
                  {'Your Location | 10m Radius'}
                </Text>
              </View>
              <View style={styles.list}>
                <FlatList
                  data={[1, 2, 3, 4]}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    gap: wp(8),
                  }}
                  contentContainerStyle={{gap: wp(16)}}
                  renderItem={({item, index}) => <ProfileCard />}
                />
              </View>
              <ImageBackground
                imageStyle={styles.earnImg}
                source={IMAGES.intro3}
                style={styles.earnBg}>
                <Text style={styles.earntitle}>{'Earn with Togolist'}</Text>
                <Text style={styles.discription}>
                  {
                    'Share your world. Meet great people. Get paid to host local experiences.'
                  }
                </Text>
                <TouchableOpacity
                  onPress={() => navigateTo(SCREENS.ExperienceScreen)}
                  style={styles.hostbtn}>
                  <Text style={styles.hosttitle}>{'Become a Host'}</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
        </ScrollView>
      </View>
      <CommonSheet
        title="Details"
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <DiscoverNewSpotsCard
            onPressAdd={() => handlePresentAddlistPress()}
          />
        }
      />
      <CommonSheet
        title="Add To List"
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={SCREEN_HEIGHT - hp(150)}
        children={
          <View>
            <DiscoverNewSpotsCard
              showInfo={false}
              showRating={false}
              isShowOptions={false}
            />
            <View style={styles.optionContainer}>
              <View style={styles.row}>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.addpin} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.plain} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.container} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.book} />
                </TouchableOpacity>
              </View>
              <LinearView
                containerStyle={styles.containerStyle}
                linearViewStyle={styles.listContainer}>
                <View>
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Personal Lists'}
                    headerStyle={styles.headerstyle}
                  />
                  <FlatList
                    data={[1, 2, 3, 4]}
                    ItemSeparatorComponent={() => (
                      <View style={{height: hp(4)}} />
                    )}
                    renderItem={({item, index}) => <AddListCard />}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Guide to LA'}
                    headerStyle={styles.headerstyle}
                  />
                  <FlatList
                    data={[1, 2, 3, 4]}
                    ItemSeparatorComponent={() => (
                      <View style={{height: hp(4)}} />
                    )}
                    renderItem={({item, index}) => <AddListCard />}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Golf Courses'}
                    headerStyle={styles.headerstyle}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Cool Architecture'}
                    headerStyle={styles.headerstyle}
                  />
                </View>
              </LinearView>
            </View>
            <Button type="outline" BtnStyle={styles.btn} title="Create New" />
            <Button type="outline" BtnStyle={styles.btn} title="Done" />
          </View>
        }
      />
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
    paddingVertical: hp(10),
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(48),
    paddingVertical: hp(21),
  },
  icons: {
    width: wp(26),
    height: wp(26),
    resizeMode: 'contain',
  },
  optionContainer: {
    backgroundColor: '#4444441A',
    borderRadius: 16,
    marginTop: hp(16),
    overflow: 'hidden',
    marginBottom: hp(8),
  },
  listContainer: {
    borderRadius: 0,
  },
  titleStyle: {
    ...commonFontStyle(600, 14, colors.black),
  },
  containerStyle: {
    padding: wp(16),
  },
  bg: {
    flex: 1,
    paddingVertical: hp(11),
    paddingHorizontal: wp(8),
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imgStyle: {
    flex: 1,
  },
  cardTitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  addicon: {
    width: wp(18),
    height: wp(18),
    alignSelf: 'flex-end',
    tintColor: colors.white,
  },
  headerstyle: {
    paddingBottom: hp(9),
  },
  btn: {
    marginTop: hp(8),
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    padding: wp(24),
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
  },
  placeholder: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 5,
  },
  icon1: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
  },
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '62%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.7,
    marginRight: 10,
  },
  BGcard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '32%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.3,
  },
  Eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(8),
  },
  guiderow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(24),
  },
  guideTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  headerlabel: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  list: {
    flex: 1,
  },
  earnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    marginTop: hp(16),
    height: hp(280),
    gap: hp(8),
  },
  earntitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  earnImg: {
    borderRadius: 20,
  },
  discription: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
  },
  hostbtn: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  hosttitle: {
    ...commonFontStyle(600, 12, colors._444444),
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
  },
});
