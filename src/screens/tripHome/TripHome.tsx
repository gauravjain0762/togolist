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
import StatusCard from '../../component/trip/StatusCard';
import CardImageText from '../../component/common/CardImageText';

type Props = {};

const TripHome = (props: Props) => {
  const [activeTab, setActiveTab] = useState('tab1');

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
        <Text style={styles.heading}>
          {activeTab === 'tab1' ? 'Trips' : 'Bucket List'}
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
        {activeTab == 'tab1' && (
          <Button
            type="outline"
            BtnStyle={styles.btn}
            leftImgStyle={styles.leftImgStyle}
            titleStyle={styles.titleStyle}
            leftImg={IMAGES.add_location}
            title="New Trip"
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
          />
        )}

        <StatusCard
          showBucket={activeTab == 'tab2' ? true : false}
          title={'Travel Stats'}
        />

        {activeTab == 'tab1' && (
          <View style={{marginTop:8}}>
            <TripCardBottomText
              title={'Start Planning...'}
              location={'New Destination'}
              showDay={false}
              dayValue={0}
            />
            <TogolistPro cardStyle={{marginTop: 8,marginBottom:9}} />
            <CalendarCard />
          </View>
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
            />
            <TogolistPro cardStyle={{marginTop: 10}} />
          </>
        )}
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
});
