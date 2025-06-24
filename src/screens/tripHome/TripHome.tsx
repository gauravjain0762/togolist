import {
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
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {
  AddTogolistSheet,
  Button,
  CommonSheet,
  GetCheckboxImage,
  LinearView,
  Loader,
  OptionBar,
  SwipeList,
} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import TogolistPro from '../../component/common/TogolistPro';
import CardBottomText from '../../component/common/CardBottomText';
import TripCardBottomText from '../../component/trip/TripCardBottomText';
import CalendarCard from '../../component/trip/CalendarCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import StatusCard from '../../component/trip/StatusCard';
import CardImageText from '../../component/common/CardImageText';
import {SwipeListView} from 'react-native-swipe-list-view';
import CardImageBtn from '../../component/common/CardImageBtn';
import Animated from 'react-native-reanimated';

type Props = {};

const TripHome = (props: Props) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [short1, setshort1] = useState(false);
  const [short2, setshort2] = useState(false);
  const [options, setOptions] = useState(false);
  const [showTogolistPro, setShowTogolistPro] = useState(true);
  const [showTogolistPro1, setShowTogolistPro1] = useState(true);
  const [showTogolistPro2, setShowTogolistPro2] = useState(true);
  const [showCard, setShowCard] = useState(false);

  const tabs = [
    {
      key: 'Trips',
      value: 0,
    },
    {
      key: 'Countries',
      value: 0,
    },
    {
      key: 'Cities',
      value: 0,
    },
    {
      key: 'Days',
      value: 0,
    },
  ];

  const {
    data: dashBoardData,
    isLoading: dashboardLoading,
    refetch: refetchDashboard,
  } = useGetDashboardQuery(
    {},
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  function NavItem({icon, library, active, onPress, keyValue}) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.navItem}>
        <Image
          source={icon}
          resizeMode="contain"
          style={[
            styles.tabIcon,
            {tintColor: active ? colors.black : '#999999'},
          ]}
        />
        <View
          style={[
            styles.activeBar,
            {backgroundColor: active ? colors.black : colors.white},
          ]}
        />
      </TouchableOpacity>
    );
  }

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const bottomSheetAddTogolist = useRef<BottomSheetModal>(null);
  const handlePresentAddTogoModalPress = useCallback(() => {
    bottomSheetAddTogolist.current?.present();
  }, []);

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>
          {activeTab === 'tab1'
            ? options
              ? 'Archived'
              : 'Trips'
            : activeTab == 'tab3'
            ? 'Listings'
            : activeTab == 'tab4'
            ? 'Past Trips'
            : 'Bucket List'}
        </Text>
        <TouchableOpacity onPress={() => handlePresentModalPress()}>
          <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabView}>
        <NavItem
          icon={activeTab === 'tab1' ? IMAGES.tab1 : IMAGES.tab_off}
          active={activeTab === 'tab1'}
          onPress={() => {
            setActiveTab('tab1');
             setShowCard(false);
          }}
        />
        <NavItem
          icon={activeTab === 'tab2' ? IMAGES.tab2_on : IMAGES.tab2_off}
          active={activeTab === 'tab2'}
          onPress={() => {
            setActiveTab('tab2');
             setShowCard(false);
          }}
        />
        <NavItem
          icon={activeTab === 'tab3' ? IMAGES.tab3_on : IMAGES.tab3_off}
          active={activeTab === 'tab3'}
          onPress={() => {
            setActiveTab('tab3');
             setShowCard(false);
          }}
        />
        <NavItem
          icon={activeTab === 'tab4' ? IMAGES.tab4_on : IMAGES.tab4_on}
          active={activeTab === 'tab4'}
          keyValue={true}
          onPress={() => {
            setActiveTab('tab4');
             setShowCard(false);
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={AppStyles.flexGrow}
        style={{marginHorizontal: wp(16), flex: 1}}>
        {activeTab == 'tab1' && !options && (
          <Button
            type="outline"
            BtnStyle={styles.btn}
            leftImgStyle={styles.leftImgStyle}
            titleStyle={styles.titleStyle}
            leftImg={IMAGES.add_location}
            title="New Trip"
            onPress={() => handlePresentAddTogoModalPress()}
          />
        )}
        {activeTab == 'tab2' && (
          <Button
            type="outline"
            BtnStyle={styles.btn}
            leftImgStyle={styles.leftImgStyle}
            titleStyle={styles.titleStyle}
            leftImg={IMAGES.add_location}
            title="New Bucket List Trip"
            onPress={() => {
              navigateTo(SCREENS.CreateListScreen, {bucketScreen: true});
            }}
          />
        )}
        {activeTab == 'tab4' && (
          <>
            <View style={styles.searchContainer}>
              <Image source={IMAGES.search} style={styles.searchIcon} />
              <TextInput
                placeholder="Search Past Trips"
                placeholderTextColor={'#A4A4A4'}
                style={styles.searchInput}
              />
            </View>
            <Button
              type="outline"
              BtnStyle={styles.btn}
              leftImgStyle={styles.leftImgStyle}
              titleStyle={styles.titleStyle}
              leftImg={IMAGES.add_location}
              title="Add Past Trip"
              onPress={() => navigateTo(SCREENS.NewTrip, {pastTrips: true})}
            />
          </>
        )}

        {activeTab !== 'tab3' && !options && (
          <StatusCard
            showBucket={activeTab == 'tab2' ? true : false}
            title={'Travel Stats'}
            key={activeTab}
          />
        )}

        {activeTab == 'tab1' && !options && (
          <View style={{marginTop: 8, paddingBottom: hp(16)}}>
            {/* <TouchableOpacity
              onPress={() => handlePresentAddTogoModalPress()}
              style={{borderRadius: 20}}>
              <TripCardBottomText
                title={'Start Planning...'}
                location={'New Destination'}
                showDay={false}
                dayValue={0}
              />
            </TouchableOpacity> */}
            {showCard && <OptionBar container={styles.optioncontainer} />}

            <SwipeListView
              ItemSeparatorComponent={() => (
                <View style={{height: Platform.OS == 'ios' ? hp(12) : 8}} />
              )}
              data={[
                {title: 'Start Planning...', location: 'New Destination'},
                {title: 'Canada Experience', location: 'Toronto, Canada'},
              ]}
              renderItem={({item, index}) => (
                <View style={styles.rowFront}>
                  <TripCardBottomText
                    title={item?.title}
                    sharedTransitionTag={`TripCard-${index?.toString()}`}
                    location={item?.location}
                    showDay={false}
                    dayValue={0}
                    BGImg={{borderRadius: 0}}
                    activeOpacity={1}
                    containerStyle={{borderRadius: 0}}
                    onPress={() => {
                      navigateTo(SCREENS.NewTrip, {
                        tag: `TripCard-${index?.toString()}`,
                      });
                    }}
                  />
                </View>
              )}
              disableRightSwipe
              swipeToOpenPercent={30}
              rightOpenValue={-150}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity style={styles.backButton}>
                    <Image source={IMAGES.restore} style={styles.restore} />
                    <Text style={styles.backText}>Restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backButton, {marginTop: hp(4)}]}>
                    <Image source={IMAGES.remove} style={styles.remove} />
                    <Text style={styles.backText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              onRowOpen={(rowKey, rowMap, toValue) => {
                if (toValue < 0) {
                  console.log('Swiped left');
                  setShowCard(true);
                } else {
                  console.log('Swiped right');
                }
              }}
              onRowClose={(rowKey, rowMap) => {
                setShowCard(false);
              }}
              leftOpenValue={75}
            />

            {showTogolistPro ? (
              <TogolistPro
                cardStyle={{marginTop: 8, marginBottom: 9}}
                onClosePress={() => {
                  setShowTogolistPro(false);
                }}
              />
            ) : (
              <View style={{marginBottom: 9}} />
            )}
            <CalendarCard />
          </View>
        )}
        {options && activeTab == 'tab1' && (
          <>
            {/* <SwipeList title={'HEllo'} /> */}
            <SwipeListView
              data={[1, 1]}
              ItemSeparatorComponent={() => <View style={{height: hp(12)}} />}
              renderItem={(data, rowMap) => (
                <View style={styles.rowFront}>
                  <TripCardBottomText
                    title={'Toronto, Canada'}
                    location={'New Destination'}
                    showDay={true}
                    dayValue={45}
                    BGImg={{borderRadius: 0}}
                    activeOpacity={1}
                    containerStyle={{borderRadius: 0}}
                  />
                </View>
              )}
              disableRightSwipe
              swipeToOpenPercent={30}
              rightOpenValue={-150}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity style={styles.backButton}>
                    <Image source={IMAGES.restore} style={styles.restore} />
                    <Text style={styles.backText}>Restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backButton, {marginTop: hp(4)}]}>
                    <Image source={IMAGES.remove} style={styles.remove} />
                    <Text style={styles.backText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
            />
          </>
        )}
        {activeTab == 'tab2' && (
          <>
            <View style={{marginVertical: 8}}>
              <CardImageText
                // title={'No collections yet!'}
                subText={
                  'Start building Bucket List Trips to save places you’d like to go!'
                }
              />
            </View>
            <TripCardBottomText
              title={'Explore Destinations'}
              // location={'New Destination'}
              showDay={false}
              dayValue={0}
              onPress={() => {
                navigateTo(SCREENS.BucketListScreen);
              }}
            />

            {showCard && (
              <OptionBar
                container={[
                  styles.optioncontainer,
                  {marginTop: hp(8), marginBottom: 0},
                ]}
              />
            )}
            <SwipeListView
              // ItemSeparatorComponent={() => <View style={{height: hp(12)}} />}
              data={[{title: 'Start Planning...', location: 'New Destination'}]}
              renderItem={({item, index}) => (
                <View style={styles.rowFront}>
                  <TripCardBottomText
                    title={'Peru Explorations'}
                    location={'Peru, South Ameria'}
                    showDay={false}
                    dayValue={0}
                    containerStyle={{marginTop: 8}}
                    onPress={() => {
                      navigateTo(SCREENS.BucketListScreen);
                    }}
                  />
                </View>
              )}
              disableRightSwipe
              swipeToOpenPercent={30}
              rightOpenValue={-150}
              renderHiddenItem={(data, rowMap) => (
                <View style={[styles.rowBack, {marginTop: 8}]}>
                  <TouchableOpacity style={styles.backButton}>
                    <Image source={IMAGES.restore} style={styles.restore} />
                    <Text style={styles.backText}>Restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backButton, {marginTop: hp(4)}]}>
                    <Image source={IMAGES.remove} style={styles.remove} />
                    <Text style={styles.backText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              onRowOpen={(rowKey, rowMap, toValue) => {
                if (toValue < 0) {
                  console.log('Swiped left');
                  setShowCard(true);
                } else {
                  console.log('Swiped right');
                }
              }}
              onRowClose={(rowKey, rowMap) => {
                setShowCard(false);
              }}
            />

            {showTogolistPro1 ? (
              <TogolistPro
                cardStyle={{marginTop: 8}}
                onClosePress={() => {
                  setShowTogolistPro1(false);
                }}
              />
            ) : (
              <View style={{marginBottom: 9}} />
            )}
          </>
        )}

        {activeTab == 'tab3' && (
          <>
            <CardImageBtn
              text1={'Coming Soon...'}
              text2={'Monetize Your Account'}
              text3={
                'Create experiences & trip itineraries for account monetization opportunities'
              }
              btnText={''}
              onBtnPress={() => {}}
            />
          </>
        )}
        {activeTab == 'tab4' && (
          <>
            {showTogolistPro2 ? (
              <TogolistPro
                cardStyle={{marginTop: 8, marginBottom: 9}}
                onClosePress={() => {
                  setShowTogolistPro2(false);
                }}
              />
            ) : (
              <View style={{marginBottom: 9}} />
            )}
            {showCard && (
              <OptionBar
                container={[
                  styles.optioncontainer,
                  {marginTop: hp(8), marginBottom: 0},
                ]}
              />
            )}

            <SwipeListView
              data={[1, 2, 3]}
              renderItem={({item, index}) => (
                <View style={styles.rowFront}>
                  <TripCardBottomText
                    title={'Canada Experience'}
                    location={'Toronto, Canada'}
                    showDay={false}
                    dayValue={0}
                    showDayTime={'Sept 2024'}
                    containerStyle={{marginTop: 8}}
                    onPress={() => {
                      navigateTo(SCREENS.PastTripDetails);
                    }}
                  />
                </View>
              )}
              disableRightSwipe
              swipeToOpenPercent={30}
              rightOpenValue={-150}
              renderHiddenItem={(data, rowMap) => (
                <View style={[styles.rowBack, {marginTop: 8}]}>
                  <TouchableOpacity style={styles.backButton}>
                    <Image source={IMAGES.restore} style={styles.restore} />
                    <Text style={styles.backText}>Restore</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backButton, {marginTop: hp(4)}]}>
                    <Image source={IMAGES.remove} style={styles.remove} />
                    <Text style={styles.backText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListFooterComponent={() => {
                return (
                  <View style={{marginTop: hp(8)}}>
                    <CardImageText
                      subText={
                        'No past trips yet. Time to start making memories!'
                      }
                    />
                  </View>
                );
              }}
              leftOpenValue={75}
              onRowOpen={(rowKey, rowMap, toValue) => {
                if (toValue < 0) {
                  console.log('Swiped left');
                  setShowCard(true);
                } else {
                  console.log('Swiped right');
                }
              }}
              onRowClose={(rowKey, rowMap) => {
                setShowCard(false);
              }}
            />
            {/* <FlatList
              data={[1, 2, 3]}
              contentContainerStyle={{marginBottom: hp(8)}}
              renderItem={() => {
                return (
                  <TripCardBottomText
                    title={'Canada Experience'}
                    location={'Toronto, Canada'}
                    showDay={false}
                    dayValue={0}
                    showDayTime={'Sept 2024'}
                    containerStyle={{marginTop: 8}}
                    onPress={() => {
                      navigateTo(SCREENS.PastTripDetails);
                    }}
                  />
                );
              }}
              ListFooterComponent={() => {
                return (
                  <View style={{marginTop: hp(8)}}>
                    <CardImageText
                      subText={
                        'No past trips yet. Time to start making memories!'
                      }
                    />
                  </View>
                );
              }}
            /> */}
          </>
        )}
      </ScrollView>
      <CommonSheet
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <>
            <View style={styles.toplist}>
              <View style={styles.row}>
                <Text style={styles.sheetlabel}>{'Share'}</Text>
                <Image source={IMAGES.send} style={styles.icon} />
              </View>
              <View style={styles.divider1} />
              <TouchableOpacity style={styles.row}>
                <Text style={styles.sheetlabel}>{'Create a Trip'}</Text>
                <Image
                  source={IMAGES.tab1}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.divider1} />
              {/* <View style={styles.divider1} /> */}
              <TouchableOpacity
                onPress={() => navigateTo(SCREENS.TripsDetails)}
                style={styles.row}>
                <Text style={styles.sheetlabel}>{'Edit Trips'}</Text>
                <Image source={IMAGES.edit_icon} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Sort by Date'}</Text>
              <GetCheckboxImage
                onPress={() => setshort1(!short1)}
                value={short1}
              />
            </View>
            <View style={styles.divider1} />

            <View style={[styles.row]}>
              <Text style={styles.sheetlabel}>{'Sort by Destination'}</Text>
              <GetCheckboxImage
                onPress={() => setshort2(!short2)}
                value={short2}
              />
            </View>
            <View style={styles.devider} />

            <TouchableOpacity
              onPress={() => (
                setOptions(!options), bottomSheetModalRef.current?.dismiss()
              )}
              style={styles.row}>
              <Text style={styles.sheetlabel}>{'Archived'}</Text>
              <Image
                source={IMAGES.archived}
                resizeMode="contain"
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.devider} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Report an Issue'}</Text>
              <Image
                source={IMAGES.report}
                style={[styles.icon, {width: wp(24), height: hp(24)}]}
              />
            </View>
          </>
        }
        title="Settings"
      />
      <AddTogolistSheet bottomSheetModalRef={bottomSheetAddTogolist} />
    </SafeAreaView>
  );
};

export default TripHome;

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    marginVertical: 10,
    ...commonFontStyle(700, 34, colors.black),
    flex: 1,
  },
  moreIcon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },

  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(16),
    marginHorizontal: wp(48),
    backgroundColor: colors.white,
    paddingBottom: hp(20),
  },
  activeBar: {
    height: 3,
    borderRadius: 100,
    backgroundColor: '#000',
    width: 36,
  },
  tabIcon: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  tabIcon1: {
    width: wp(24),
    height: wp(26),
    resizeMode: 'contain',
  },
  navItem: {
    alignItems: 'center',
    gap: hp(10),
  },

  btn: {
    paddingVertical: hp(12),
    borderRadius: 8,
    borderWidth: 2,
  },
  leftImgStyle: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  titleStyle: {
    ...commonFontStyle(700, 13, colors._BD2332),
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#7878800D',
    borderRadius: 12,
    // paddingVertical: 20,
  },
  tabContainer1: {
    backgroundColor: '#7878800D',
    borderRadius: 20,
    marginTop: 18,
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  toplist: {
    borderBottomWidth: 8,
    borderColor: '#8080802E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(17),
    paddingHorizontal: wp(16),
  },
  sheetlabel: {
    ...commonFontStyle(500, 18, colors.black),
  },
  divider1: {
    height: 0.5,
    backgroundColor: '#8080808C',
  },
  icon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  devider: {
    borderColor: '#8080802E',
    borderBottomWidth: hp(8),
  },
  contentContainerStyle: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  rowFront: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 12,
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
  optioncontainer: {
    marginBottom: hp(8),
  },
  label: {
    ...commonFontStyle(500, 10, colors.white),
    lineHeight: hp(24),
  },
  row1: {
    alignItems: 'center',
  },
  Shareicon: {
    width: wp(28),
    height: wp(28),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  Addicon: {
    width: wp(25),
    height: wp(26),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  Buildicon: {
    width: wp(25),
    height: wp(26),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  Archiveicon: {
    width: wp(30),
    height: wp(24),
    resizeMode: 'contain',
    tintColor: colors.white,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#A4A4A4',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 10.2,
    borderWidth: 1,
    borderColor: '#959595',
    marginBottom: hp(16),
  },
  searchInput: {
    flex: 1,
    ...commonFontStyle(600, 12, colors.black),
    marginLeft: 8,
  },
});
