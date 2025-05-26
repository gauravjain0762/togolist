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

type Props = {};

const categories = [
  {
    title: 'Specific Poojas at Ghat / Temple',
    hindiTitle: 'घाट/मंदिर पर होने वाली पूजा',
    description:
      'These rituals are performed at a particular temple / place of pilgrimage / banks of holy rivers (Ghats) for Shradh of Ancestors, Various Jaaps, Abhisheks on God idol etc',
    image:
      'https://as1.ftcdn.net/jpg/06/55/10/42/1000_F_655104213_GxO8HYfl8LNyc8jw77UhvmekmGMTxx6R.jpg',
  },
  {
    title: 'Regular Poojas at Home',
    hindiTitle: 'घर पर होने वाली पूजा',
    description:
      'This includes all the poojas which are performed at home without any hassles by the Pandits who will visit your place for the purpose.',
    image:
      'https://as1.ftcdn.net/v2/jpg/06/51/52/56/1000_F_651525680_DERm3VNypYv6Sav4cmeZZuQoZ6YN8Ksq.jpg',
  },
  {
    title: 'Virtual / Online Pooja',
    hindiTitle: 'ऑनलाइन पूजा',
    description:
      'All the poojas which are performed at home can also be performed online i.e. through virtual mode.',
    image:
      'https://as1.ftcdn.net/v2/jpg/06/81/63/00/1000_F_681630040_C2eolGEtUHmPAfKtLdwX6fJnvBT37M2G.jpg',
  },
  {
    title: 'Katha Vachan',
    hindiTitle: 'कथा वाचन',
    description:
      'Katha vaachan includes keertans, bhajans and spiritual discourses, Akhand Ramayan, Sunderkand, Bhagwat Geeta, Durga...',
    image:
      'https://as2.ftcdn.net/v2/jpg/09/95/57/83/1000_F_995578392_Mq6mvJuhiKzG2BVIMrssWxsfprIdkShG.jpg',
  },
  {
    title: 'Specific Poojas at Ghat / Temple',
    hindiTitle: 'घाट/मंदिर पर होने वाली पूजा',
    description:
      'These rituals are performed at a particular temple / place of pilgrimage / banks of holy rivers (Ghats) for Shradh of Ancestors, Various Jaaps, Abhisheks on God idol etc',
    image:
      'https://as2.ftcdn.net/v2/jpg/09/95/40/29/1000_F_995402985_PkyS1LE2leKCRFOvHPniM42lfljlZ1A8.jpg',
  },
  {
    title: 'Regular Poojas at Home',
    hindiTitle: 'घर पर होने वाली पूजा',
    description:
      'This includes all the poojas which are performed at home without any hassles by the Pandits who will visit your place for the purpose.',
    image:
      'https://as2.ftcdn.net/v2/jpg/09/95/57/33/1000_F_995573396_eXn2BupUpUJ1v8NHJh7NKymcVAs8Hazt.jpg',
  },

  {
    title: 'Specific Poojas at Ghat / Temple',
    hindiTitle: 'घाट/मंदिर पर होने वाली पूजा',
    description:
      'These rituals are performed at a particular temple / place of pilgrimage / banks of holy rivers (Ghats) for Shradh of Ancestors, Various Jaaps, Abhisheks on God idol etc',
    image:
      'https://as1.ftcdn.net/v2/jpg/06/51/52/56/1000_F_651525680_DERm3VNypYv6Sav4cmeZZuQoZ6YN8Ksq.jpg',
  },
];

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
      <ScrollView style={styles.container}>
        {dashBoardData?.entityProfileList?.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigationRef.navigate(SCREENS.PanditProfileScreen, {
                  item: item,
                });
              }}
              key={index}
              activeOpacity={0.8}
              style={styles.card}>
              <Image
                source={{
                  uri: 'https://as1.ftcdn.net/v2/jpg/06/51/52/56/1000_F_651525680_DERm3VNypYv6Sav4cmeZZuQoZ6YN8Ksq.jpg',
                }}
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {item?.name}
                </Text>
                <Text style={styles.exText}>Ex : 4 year</Text>
                <Text numberOfLines={2} style={styles.description}>
                  {item?.bio}
                </Text>
                <View
                  style={[
                    styles.shareView,
                    {
                      justifyContent: 'space-between',
                      width: 200,
                      marginTop: 10,
                      marginBottom: 8,
                    },
                  ]}>
                  <TouchableOpacity style={styles.shareView}>
                    <Text style={styles.countText}>3</Text>
                    <Image source={IMAGES.quality} style={styles.qualityIcon} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => {
                      shareContent(item);
                    }}>
                    <Image source={IMAGES.share} style={styles.qualityIcon} />
                  </TouchableOpacity> */}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 100}} />
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigationRef.navigate(SCREENS.LoginScreen);
        }}
        style={[styles.button]}>
        <Text style={styles.buttonText}>Register Now</Text>
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
