import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {IMAGES} from '../../assets/Images';
import {
  Button,
  CommonSheet,
  LinearView,
  ProfileCard,
  SearchBar,
} from '../../component';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Fs, SCREEN_HEIGHT, commonFontStyle, hp, wp} from '../../theme/fonts';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';
import {colors} from '../../theme/colors';
import ExploreCard from '../../component/explore/ExploreCard';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

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

const categories = [
  {label: 'Top Rated Nearby 🏆'},
  {label: 'Entertainment 🎭'},
  {label: 'Outdoors 🌲'},
  {label: 'Wellness 🧘'},
  {label: 'Shopping 🎪'},
  {label: 'Fun 🎳'},
  {label: 'More'},
];

const TripExplore = () => {
  const [activeTab, setActiveTab] = useState('hot');

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
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>{'Explore'}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Image source={IMAGES.explorePin} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <View style={AppStyles.flex1}>
        <View style={AppStyles.P16}>
          <SearchBar
            container={styles.searchBox}
            editable={false}
            onPress={() => navigateTo(SCREENS.ShapeScreen)}
            placeholder="Search"
            onChangeText={() => {}}
            inputStyle={styles.searchInput}
            IconStyle={{width: 17, height: 15, tintColor: '#A4A4A4'}}
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
          contentContainerStyle={AppStyles.flexGrow}>
          {activeTab == 'hot' && (
            <FlatList
              data={CARD_DATA}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={AppStyles.P16}
              columnWrapperStyle={{
                paddingTop: hp(10),
                justifyContent: 'space-between',
                paddingBottom: hp(16),
              }}
              renderItem={({item}) => <ExploreCard {...item} />}
            />
          )}
        </ScrollView>
      </View>
      <CommonSheet
        title="Details"
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <View style={{paddingVertical: hp(28)}}>
            <DiscoverNewSpotsCard
              onPressAdd={() => handlePresentAddlistPress()}
            />
          </View>
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

export default TripExplore;

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    marginVertical: 10,
    ...commonFontStyle(600, 20, colors.black),
    flex: 1,
  },
  moreIcon: {
    width: wp(24),
    height: hp(48),
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    ...commonFontStyle(400, 14, '#000'), // You can change 16 to any default search input size
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    paddingHorizontal: wp(16),
  },
  tag: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: hp(4),
  },
  tagText: {
    ...commonFontStyle(600, 12, '#000'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
    paddingHorizontal: wp(16),
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
    justifyContent: 'center',
    marginTop: hp(29),
    marginHorizontal: wp(16),
    gap: wp(60),
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
    paddingHorizontal: wp(16),
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
  location: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(16),
  },
  eventTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
});
