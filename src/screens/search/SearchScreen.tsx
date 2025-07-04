import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
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
  SearchBar,
  ShareBottomSheet,
} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import ExploreCard from '../../component/explore/ExploreCard';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import TravelCardLock from '../../component/common/TravelCardLock';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';
import {useNavigation} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {set} from 'lodash';
import CollectionModal from '../../component/explore/CollectionModal';

type Props = {};

const events = [
  {
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
  {
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
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

const SUGGESTIONS = [
  'Mexico must see',
  'Mexico must see attractions',
  'Mexico must see cities',
  'Mexico must see places',
  'Mexico must see monuments',
  'Mexico must see natural wonders',
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

const AddListCard = () => {
  const [check, setCheck] = useState(false);
  return (
    <TouchableOpacity onPress={() => setCheck(!check)} style={styles.card}>
      <ImageBackground
        source={IMAGES.bg1}
        imageStyle={styles.imgStyle}
        resizeMode="cover"
        style={styles.bg}>
        <Text style={styles.cardTitle}>{'Tourist Attractions'}</Text>
        <Image
          source={check ? IMAGES.check_icon : IMAGES.add_icon1}
          style={styles.addicon}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const SearchScreen = (props: Props) => {
  const [activeTab, setActiveTab] = useState('hot');
  const [select, setSelect] = useState('List View');
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const [radius, setRadius] = useState(15);

  const [showPersonal, setShowPersonal] = useState(true);
  const [showCollections, setShowCollections] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSavedCollections, setShowSavedCollections] = useState(false);
  const [collectionModal, setCollectionModal] = useState(false);
  const [newListShow, setNewListShow] = useState(false);
  const [newListShowTitle, setNewListShowTitle] = useState('');
  const [showPast, setShowPast] = useState(true);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalLocationRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalMoreRef = useRef<BottomSheetModal>(null);
  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentModalMorePress = useCallback(() => {
    bottomSheetModalMoreRef.current?.present();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalLocationPress = useCallback(() => {
    bottomSheetModalLocationRef.current?.present();
  }, []);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
  const handlePresentAddlistClose = useCallback(() => {
    bottomSheetAddListRef.current?.close();
    bottomSheetModalRef.current?.close();
    bottomSheetModalLocationRef.current?.close();
  }, []);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      setActiveTab('hot');
      setSelect('List View');
      // Do something, like scroll to top or reset list
    });

    return unsubscribe;
  }, [navigation]);

  function NavItem({icon, library, active, onPress, keyValue, IconStyle}) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.navItem}>
        <Image
          source={icon}
          style={[keyValue ? styles.tabIcon1 : styles.tabIcon, IconStyle]}
        />
        {active && <View style={styles.activeBar} />}
      </TouchableOpacity>
    );
  }

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      const lowerText = text.toLowerCase();
      const matched = SUGGESTIONS.filter(item =>
        item.toLowerCase().startsWith(lowerText),
      );
      setFiltered(matched);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (text: string) => {
    setQuery(text);
    setFiltered([]);
    navigateTo(SCREENS.ExploreSearch, {search: text});
  };

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>{'Explore'}</Text>
        <TouchableOpacity
          onPress={() => {
            handlePresentModalMorePress();
          }}>
          <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AppStyles.flex1}
        contentContainerStyle={AppStyles.flexGrow}>
        <View style={AppStyles.flex1}>
          <View style={AppStyles.P16}>
            <SearchBar
              container={styles.searchBox}
              placeholder="Search"
              handleSelect={handleSelect}
              Filterdata={filtered}
              onChangeText={handleSearch}
              value={query}
              data={SUGGESTIONS}
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
                activeTab === 'location' ? IMAGES.Subtract : IMAGES.Subtract
              }
              active={activeTab === 'location'}
              keyValue={true}
              IconStyle={activeTab === 'location' ? styles.iconStyle : {}}
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
          {activeTab == 'hot' && (
            <FlatList
              data={CARD_DATA}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={AppStyles.P16}
              columnWrapperStyle={{
                // paddingTop: hp(10),
                justifyContent: 'space-between',
                paddingVertical: hp(4),
              }}
              renderItem={({item}) => (
                <ExploreCard
                  {...item}
                  onPress={() => {
                    navigateTo(SCREENS.Shared);
                  }}
                />
              )}
            />
          )}
          {activeTab == 'location' && (
            <View style={AppStyles.flex1}>
              <View style={styles.headerRow}>
                <Text style={styles.headerText}>Discover New Spots</Text>
                <TouchableOpacity
                  onPress={() => {
                    handlePresentModalLocationPress();
                  }}>
                  <Text style={styles.headerText1}>Toronto, Canada</Text>
                </TouchableOpacity>
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
                    renderItem={({item}) => (
                      <DiscoverNewSpotsCard
                        {...item}
                        imageStyle={{
                          marginHorizontal: Platform.OS == 'ios' ? 0 : 16,
                        }}
                        onPressAdd={() => handlePresentAddlistPress()}
                        onPressBeenThere={() => {
                          navigateTo(SCREENS.BeenThere);
                          handlePresentAddlistClose();
                        }}
                        onPressFavs={() => {
                          navigateTo(SCREENS.Favorites);
                          handlePresentAddlistClose();
                        }}
                      />
                    )}
                    contentContainerStyle={{
                      paddingBottom: hp(16),
                      gap: hp(8),
                      paddingHorizontal: 16,
                    }}
                  />
                </>
              )}
              {select == 'Map View' && (
                <MapView
                  style={AppStyles.flex1}
                  provider={PROVIDER_GOOGLE}
                  key={API.MAP_KEY}
                  region={{
                    latitude: 51.5065313073,
                    longitude: -0.1888825778,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                  onPoiClick={e => handlePresentModalPress()}
                />
              )}
            </View>
          )}
          {activeTab == 'profile' && (
            <View style={[AppStyles.P16, {paddingBottom: hp(16)}]}>
              <ImageBackground
                source={IMAGES.requestHost_bg}
                resizeMode="cover"
                style={styles.imageContainer}>
                <>
                  <Text style={styles.title}>Find a Host</Text>
                  <TouchableOpacity style={[styles.inputBox]}>
                    <Image source={IMAGES.location} style={styles.icon} />
                    <Text style={styles.placeholder}>Set Location</Text>
                  </TouchableOpacity>
                  <View style={[styles.inputBox, {marginVertical: 4}]}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 0.8,
                      }}>
                      <Image
                        source={IMAGES.canlder}
                        style={[styles.icon, {marginRight: 10}]}
                      />
                      <Text style={styles.placeholder}>Start Date</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 24,
                        borderWidth: 1,
                        borderColor: '#999999',
                        marginRight: 10,
                      }}
                    />
                    <TouchableOpacity style={{flex: 0.9}}>
                      {/* <Image source={IMAGES.canlder} style={styles.icon1} /> */}
                      <Text style={styles.placeholder}>End Date</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.BGcard}>
                      <Image source={IMAGES.clock} style={styles.icon1} />
                      <Text style={styles.cardText}>Length</Text>
                    </TouchableOpacity> */}
                  </View>
                  <Button
                    title="Find Local Guides"
                    BtnStyle={{paddingVertical: hp(12)}}
                  />
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
                    gap: wp(4),
                  }}
                  contentContainerStyle={{gap: wp(4)}}
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
          {activeTab == 'events' && (
            <View style={AppStyles.P16}>
              <View style={styles.headerrow}>
                <Text style={styles.eventTitle}>{'Events Near You'}</Text>
                <Text style={styles.location}>{'50miles Radius'}</Text>
              </View>

              <FlatList
                data={events}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
                style={{marginTop: 10}}
                renderItem={({item}) => (
                  <TravelCardLock
                    {...item}
                    onPress={() => {
                      navigateTo(SCREENS.Shared);
                    }}
                  />
                )}
              />

              <View style={styles.headerrow}>
                <Text style={styles.eventTitle}>{'Experiences  Near You'}</Text>
                <Text style={styles.location}>{'50miles Radius'}</Text>
              </View>

              <FlatList
                data={[1, 2]}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                  <DiscoverNewSpotsCard
                    {...item}
                    onPressAdd={() => handlePresentAddlistPress()}
              onPressBeenThere={() => {
                navigateTo(SCREENS.BeenThere);
                handlePresentAddlistClose();
              }}
              onPressFavs={() => {
                navigateTo(SCREENS.Favorites);
                handlePresentAddlistClose();
              }}
                    imageStyle={{
                      marginHorizontal: Platform.OS == 'ios' ? 0 : 16,
                    }}
                  />
                )}
                contentContainerStyle={{paddingBottom: hp(16), gap: hp(8)}}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <CommonSheet
        title="Location Settings"
        maxDynamicContentSize={270}
        bottomSheetModalRef={bottomSheetModalLocationRef}
        children={
          <View style={{paddingVertical: hp(28)}}>
            <View style={styles.rowStyle}>
              <Text style={styles.locationHeaderText}>Radius</Text>
              <Slider
                value={radius}
                onValueChange={value => setRadius(Math.round(value))}
                minimumValue={1}
                maximumValue={100}
                minimumTrackTintColor="#B41E2A"
                thumbTintColor="#B41E2A"
                style={{width: '72%', left: 5}}
              />
              <Text style={styles.locationHeaderText1}>{radius} miles</Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.locationHeaderText}>Location</Text>
              <Text style={styles.locationHeaderText1}>
                Toronto, ON, Canada
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.locationHeaderText}>Location Settings</Text>
              <View style={AppStyles.row}>
                <Text style={styles.locationHeaderText1}>On (While Using)</Text>
                <Text
                  style={[
                    styles.locationHeaderText1,
                    {color: '#BD2332', marginLeft: 8},
                  ]}>
                  Change
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.subscribeBtn}>
              <Text style={styles.subscribeText}>Done</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <CommonSheet
        title="Details"
        maxDynamicContentSize={550}
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <View style={{}}>
            <DiscoverNewSpotsCard
              onPressAdd={() => handlePresentAddlistPress()}
              onPressBeenThere={() => {
                navigateTo(SCREENS.BeenThere);
                handlePresentAddlistClose();
              }}
              onPressFavs={() => {
                navigateTo(SCREENS.Favorites);
                handlePresentAddlistClose();
              }}
              imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0 : 16}}
            />
          </View>
        }
      />
      <ShareBottomSheet
        bottomSheetModalRef={bottomSheetModalMoreRef}
        // handleSheetChanges={e => handleSheetChanges(e)}
      />
      <CommonSheet
        title="Add To List"
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={SCREEN_HEIGHT - hp(150)}
        children={
          <View>
            <DiscoverNewSpotsCard
              showInfo={false}
              showAddToList={true}
              showRating={false}
              isShowOptions={false}
              imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0 : 16}}
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
                    show={showPersonal}
                    onDownPress={() => {
                      setShowPersonal(!showPersonal);
                    }}
                  />
                  {showPersonal && (
                    <FlatList
                      data={[1, 2,]}
                      keyExtractor={(_,index)=>index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp(4)}} />
                      )}
                      ListFooterComponent={() => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setCollectionModal(true);
                              setNewListShow(true);
                              setNewListShowTitle('Personal Lists');
                            }}
                            style={styles.addNewListBtn}>
                            <Text style={styles.addNewListBtnText}>
                              New List
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      renderItem={({item, index}) => {
                        return <AddListCard />;
                      }}
                    />
                  )}
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Guide to LA'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showCollections}
                    onDownPress={() => {
                      setShowCollections(!showCollections);
                    }}
                  />
                  {showCollections ? (
                    <FlatList
                      data={[1, 2,]}
                      keyExtractor={(_,index)=>index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp(4)}} />
                      )}
                      ListFooterComponent={() => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setCollectionModal(true);
                              setNewListShow(true);
                              setNewListShowTitle('Guide to LA');
                            }}
                            style={styles.addNewListBtn}>
                            <Text style={styles.addNewListBtnText}>
                              New List
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      renderItem={({item, index}) => {
                        return <AddListCard />;
                      }}
                    />
                  ): null}
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Golf Courses'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showCalendar}
                    onDownPress={() => {
                      setShowCalendar(!showCalendar);
                    }}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Cool Architecture'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showSavedCollections}
                    onDownPress={() => {
                      setShowSavedCollections(!showSavedCollections);
                    }}
                  />
                </View>
              </LinearView>
            </View>
            <Button
              type="outline"
              BtnStyle={styles.btn}
              title="New Collection"
              onPress={() => {
                setCollectionModal(true);
                setNewListShow(false);
              }}
            />
            <Button type="outline" BtnStyle={styles.btn} title="Done" />
            <CollectionModal
              visible={collectionModal}
              title={
                newListShow ? `New List: ${newListShowTitle}` : 'New Collection'
              }
              subInput={newListShow ? 'List Name' : 'Collection Name'}
              onClose={() => {
                setCollectionModal(false);
              }}
            />
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
    marginVertical: 8,
    ...commonFontStyle(700, 34, colors.black),
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
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    backgroundColor: colors.white,
    marginVertical: 0,
    marginBottom: 8,
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
    // paddingVertical: hp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: hp(4),
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    ...commonFontStyle(600, 12, '#000'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
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
    marginTop: hp(16),
    marginHorizontal: wp(16),
    gap: wp(60),
    marginBottom: hp(16),
  },
  activeBar: {
    marginTop: 4,
    width: 36,
    height: 3,
    borderRadius: 100,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: -6,
  },
  tabIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  tabIcon1: {
    width: 24,
    height: 29,
    resizeMode: 'contain',
  },
  iconStyle: {
    tintColor: colors.black,
    width: 24,
    height: 29,
  },
  navItem: {
    alignItems: 'center',
  },

  subtext: {
    marginTop: 6,
    marginBottom: 10,
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
    width: wp(24),
    height: wp(24),
    alignSelf: 'flex-end',
    // tintColor: colors.white,
  },
  headerstyle: {
    paddingBottom: hp(9),
    marginTop: 0,
  },
  btn: {
    marginTop: hp(8),
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    padding: wp(16),
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
  },
  placeholder: {
    ...commonFontStyle(500, 18, '#3C3C4399'),
  },
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(12),
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 4,
  },
  icon1: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
  },
  cardText: {
    ...commonFontStyle(500, 14, '#3C3C4399'),
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
    flex: 0.5,
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
    flex: 0.4,
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
    paddingTop: hp(12),
    paddingHorizontal: 6,
    marginBottom: 4,
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
    marginTop: hp(12),
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
  locationHeaderText: {
    ...commonFontStyle(500, 15, '#444444'),
  },
  locationHeaderText1: {
    ...commonFontStyle(400, 15, '#444444'),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  subscribeBtn: {
    marginTop: 10,
    backgroundColor: colors.primary1,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  subscribeText: {
    ...commonFontStyle(700, 16, colors.white),
  },
  addNewListBtn: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#787878',
  },
  addNewListBtnText: {
    ...commonFontStyle(600, 13, '#787878'),
  },
});
