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
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import { navigateTo } from '../../utils/commonFunction';

type Props = {};

const HomeScreen = (props: Props) => {
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

  const shareContent = async (item: any) => {
    try {
      const result = await Share.share({
        title: item?.title,
        message: item?.title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ' + result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <Loader visible={dashboardLoading} />
      {/* <Text style={styles.heading}>{"Mangal Bhav"}</Text> */}
      <CustomHeader
        onBack={() => navigationRef.goBack()}
        onShare={() => shareContent('Share via WhatsApp')}
        mainHeader
      />

      <TouchableOpacity
       onPress={()=>{
        navigateTo(SCREENS.SignupScreen)
       }}
        style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
        <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={()=>{
        navigateTo(SCREENS.SigninScreen)
       }}
        style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
        <Text>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={()=>{
        navigateTo(SCREENS.UserNameScreen)
       }}
        style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
        <Text>User Name</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginVertical: 10,
    ...commonFontStyle(600, 22, colors.black),
  },
  countText: {
    ...commonFontStyle(400, 14, colors.black),
    marginRight: 5,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    margin: 10,
    padding: 10,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  shareView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qualityIcon: {
    width: 20,
    height: 20,
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 4,
    ...commonFontStyle(500, 16, colors.black),
    width: 200,
  },
  exText: {
    marginBottom: 4,
    ...commonFontStyle(500, 14, colors.black),
  },
  description: {
    flex: 1,
    width: 200,
    ...commonFontStyle(500, 11, '#444'),
  },
  button: {
    // flex: 1,
    backgroundColor: colors.mainColor,
    // padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '92%',
    alignSelf: 'center',
  },
  buttonText: {...commonFontStyle(600, 22, colors.white)},
});
