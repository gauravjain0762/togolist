import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
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

type Props = {};

const TripHome = (props: Props) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [short1, setshort1] = useState(false);
  const [short2, setshort2] = useState(false);
  const [options, setOptions] = useState(false);

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
        <Image source={icon} resizeMode="contain" style={styles.tabIcon} />
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
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>
          {activeTab === 'tab1'
            ? options
              ? 'Archived'
              : 'Trips'
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
          }}
          keyValue={true}
        />
        <NavItem
          icon={activeTab === 'tab2' ? IMAGES.tab2_on : IMAGES.tab2_off}
          active={activeTab === 'tab2'}
          onPress={() => {
            setActiveTab('tab2');
          }}
        />
        <NavItem
          icon={activeTab === 'tab3' ? IMAGES.tab3_on : IMAGES.tab3_off}
          active={activeTab === 'tab3'}
          onPress={() => {
            setActiveTab('tab3');
          }}
        />
        <NavItem
          icon={activeTab === 'tab4' ? IMAGES.tab4_on : IMAGES.tab4_off}
          active={activeTab === 'tab4'}
          onPress={() => {
            setActiveTab('tab4');
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
            onPress={() => navigateTo(SCREENS.NewTrip)}
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

        {!options && (
          <StatusCard
            showBucket={activeTab == 'tab2' ? true : false}
            title={'Travel Stats'}
            key={activeTab}
          />
        )}

        {activeTab == 'tab1' && !options && (
          <View style={{marginTop: 8, paddingBottom: hp(16)}}>
            <TouchableOpacity
              onPress={() => handlePresentAddTogoModalPress()}
              style={{borderRadius: 20}}>
              <TripCardBottomText
                title={'Start Planning...'}
                location={'New Destination'}
                showDay={false}
                dayValue={0}
              />
            </TouchableOpacity>
            <View style={styles.optioncontainer}>
              <View style={styles.row1}>
                <Image source={IMAGES.send} style={styles.Shareicon} />
                <Text style={styles.label}>{'Share'}</Text>
              </View>
              <View style={styles.row1}>
                <Image source={IMAGES.container} style={styles.Addicon} />
                <Text style={styles.label}>{'Bucket List'}</Text>
              </View>
              <View style={styles.row1}>
                <Image source={IMAGES.Itinerary} style={styles.Buildicon} />
                <Text style={styles.label}>{'Build Itinerary'}</Text>
              </View>
              <View style={styles.row1}>
                <Image
                  source={IMAGES.archived}
                  style={[styles.Archiveicon, {width: wp(26), height: wp(26)}]}
                />
                <Text style={styles.label}>{'Archive'}</Text>
              </View>
            </View>
            <TogolistPro cardStyle={{marginTop: 8, marginBottom: 9}} />
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

            <View style={styles.optioncontainer}>
              <View style={styles.row1}>
                <Image source={IMAGES.send} style={styles.Shareicon} />
                <Text style={styles.label}>{'Share'}</Text>
              </View>
              <View style={styles.row1}>
                <Image source={IMAGES.container} style={styles.Addicon} />
                <Text style={styles.label}>{'Bucket List'}</Text>
              </View>
              <View style={styles.row1}>
                <Image source={IMAGES.Itinerary} style={styles.Buildicon} />
                <Text style={styles.label}>{'Build Itinerary'}</Text>
              </View>
              <View style={styles.row1}>
                <Image
                  source={IMAGES.archived}
                  style={[styles.Archiveicon, {width: wp(26), height: wp(26)}]}
                />
                <Text style={styles.label}>{'Archive'}</Text>
              </View>
            </View>

            <TogolistPro cardStyle={{marginTop: 8}} />
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
              <View style={styles.row}>
                <Text style={styles.sheetlabel}>{'Create a Trip'}</Text>
                <Image
                  source={IMAGES.tab1}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </View>
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
    width: '100%',
  },
  tabIcon: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  tabIcon1: {
    width: wp(25),
    height: wp(25),
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
    borderRadius: 20,
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
    backgroundColor: colors._BD2332,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(36),
    paddingBottom: hp(22),
    paddingHorizontal: wp(33),
    marginTop: hp(12),
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
});
