import {
  Image,
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
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {Button, CommonSheet, LinearView, Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import TogolistPro from '../../component/common/TogolistPro';
import CardBottomText from '../../component/common/CardBottomText';
import TripCardBottomText from '../../component/trip/TripCardBottomText';
import CalendarCard from '../../component/trip/CalendarCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type Props = {};

const TripHome = (props: Props) => {
  const [activeTab, setActiveTab] = useState('hot');

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

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      {/* <Loader visible={dashboardLoading} /> */}
      <View style={styles.headerView}>
        <Text style={styles.heading}>{'Trips'}</Text>
        <TouchableOpacity onPress={() => handlePresentModalPress()}>
          <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabView}>
        <NavItem
          icon={activeTab === 'hot' ? IMAGES.tab1 : IMAGES.tab_off}
          active={activeTab === 'hot'}
          onPress={() => {
            setActiveTab('hot');
          }}
          keyValue={true}
        />
        <NavItem
          icon={activeTab === 'location' ? IMAGES.tab2_on : IMAGES.tab2_off}
          active={activeTab === 'location'}
          onPress={() => {
            setActiveTab('location');
          }}
        />
        <NavItem
          icon={activeTab === 'profile' ? IMAGES.tab3_on : IMAGES.tab3_off}
          active={activeTab === 'profile'}
          onPress={() => {
            setActiveTab('profile');
          }}
        />
        <NavItem
          icon={activeTab === 'events' ? IMAGES.tab4_on : IMAGES.tab4_off}
          active={activeTab === 'events'}
          onPress={() => {
            setActiveTab('events');
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={AppStyles.flexGrow}
        style={{marginHorizontal: wp(16), flex: 1}}>
        <Button
          type="outline"
          BtnStyle={styles.btn}
          leftImgStyle={styles.leftImgStyle}
          titleStyle={styles.titleStyle}
          leftImg={IMAGES.add_location}
          title="New Trip"
        />

        <LinearView
          linearViewStyle={{marginTop: hp(20)}}
          containerStyle={{paddingVertical: 20}}>
          <Text
            style={[
              commonFontStyle(700, 24, colors.black),
              {marginBottom: 16, textAlign: 'center'},
            ]}>
            {'Travel Stats'}
          </Text>
          <View style={[styles.tabContainer]}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setSelectedTab(tab.key)}
                style={styles.tabItem}>
                <Text style={[commonFontStyle(600, 20, colors.primary1)]}>
                  {tab.value}
                </Text>
                <Text style={[commonFontStyle(500, 10, '#444444')]}>
                  {tab.key}{' '}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearView>

        <TripCardBottomText
          title={'Start Planning...'}
          location={'New Destination'}
          showDay={false}
          dayValue={0}
        />
        <TogolistPro cardStyle={{marginTop: 10}} />
        <CalendarCard />
      </ScrollView>
      <CommonSheet bottomSheetModalRef={bottomSheetModalRef} title="Settings" />
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
});
