import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, SCREEN_HEIGHT} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import NotificationCard from '../../component/notification/NotificationCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import CardImageBtn from '../../component/common/CardImageBtn';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import ActivityFeedCard from '../../component/notification/ActivityFeedCard';
import {useNavigation} from '@react-navigation/native';

const tabs = ['All', 'Updates', 'Activity Feed', 'Guide Board'];

const notificationData = [
  {
    id: '1',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message: 'added a note to “Canada Experience” in Toronto, Canada',
    description:
      'Thoughts on travel mode, flight or train?\nGoing to look at rates tonight!',
    time: 'Today at 6:45 AM',
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message:
      'invited you to join their trip “Canada Experience” in Toronto, Canada',
    time: 'Today at 6:34 AM',
    isDecision: true,
  },
  {
    id: '3',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message:
      'added 5 new places to list “Places to Eat” under West Coast Road Trip',
    time: 'Yesterday at 5:23 PM',
    buttons: [{label: 'View List', type: 'fill', onPress: () => {}}],
  },
  {
    id: '4',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message:
      'added 5 new places to list “Places to Eat” under West Coast Road Trip',
    time: 'Yesterday at 5:23 PM',
    buttons: [{label: 'View Collection', type: 'fill', onPress: () => {}}],
  },
  {
    id: '5',
    image: '',
    name: 'Marc Ribas',
    message:
      'added 5 new places to list “Places to Eat” under West Coast Road Trip',
    time: 'Yesterday at 5:23 PM',
    buttons: [
      {
        label: 'Apply Now',
        type: 'fill',
        onPress: () => {},
      },
      {
        label: 'More Info',
        type: 'outline',
        onPress: () => {},
      },
    ],
  },
];

const notificationDataUpdate = [
  {
    id: '1',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message: 'added a note to “Canada Experience” in Toronto, Canada',
    description:
      'Thoughts on travel mode, flight or train?\nGoing to look at rates tonight!',
    time: 'Today at 6:45 AM',
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message:
      'invited you to join their trip “Canada Experience” in Toronto, Canada',
    time: 'Today at 6:34 AM',
    isDecision: true,
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Marc Ribas',
    message:
      'invited you to join their trip “Canada Experience” in Toronto, Canada',
    time: 'Today at 6:34 AM',
    isDecision: false,
  },
  {
    id: '5',
    image: '',
    name: 'Marc Ribas',
    message:
      'added 5 new places to list “Places to Eat” under West Coast Road Trip',
    time: 'Yesterday at 5:23 PM',
    buttons: [
      {
        label: 'Apply Now',
        type: 'fill',
        onPress: () => {},
      },
      {
        label: 'More Info',
        type: 'outline',
        onPress: () => {},
      },
    ],
  },
];

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedBtn, setSelectedBtn] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      setSelectedTab('All');
      // Do something, like scroll to top or reset list
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => {
    if (item.isDecision) {
      return (
        <NotificationCard
          image={item.image}
          name={item.name}
          message={item.message}
          time={item.time}
          selectedBtn={selectedBtn}
          btnLabel={'Accepted'}
          buttons={[
            {
              label: 'Accept',
              type: 'fill',
              onPress: () => setSelectedBtn(true),
            },
            {
              label: 'Decline',
              type: 'outline',
              onPress: () => setSelectedBtn(false),
            },
          ]}
        />
      );
    }

    return (
      <NotificationCard
        image={item.image}
        name={item.name}
        message={item.message}
        time={item.time}
        description={item.description}
        buttons={item.buttons}
      />
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={[AppStyles.mainWhiteContainer, {paddingHorizontal: 20}]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Notifications</Text>
        <TouchableOpacity>
          <Image source={IMAGES.more_icon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab == 'All' && (
        <FlatList
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, gap: 8}}
        />
      )}

      {selectedTab == 'Updates' && (
        <FlatList
          data={notificationDataUpdate}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, gap: 8}}
        />
      )}

      {selectedTab == 'Activity Feed' && (
        <FlatList
          data={[1, 2]}
          renderItem={() => {
            return (
              <ActivityFeedCard
                imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0 : 20}}
              />
            );
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20, gap: 8}}
          ListFooterComponent={() => {
            return (
              <CardImageBtn
                text2={'Earn Cash with Togolist'}
                text1={''}
                text3={
                  'Register with Togolist to become a verified local guide and share your expertise with others while earning an income!'
                }
                btnText={'Become a Guide'}
                onBtnPress={() => {
                  navigateTo(SCREENS.NotificationDetails);
                }}
                collocation_bg={{height: hp(368), marginTop: 0}}
                btnStyle={{
                  width: 116,
                }}
              />
            );
          }}
        />
      )}

      {selectedTab == 'Guide Board' && (
        <CardImageBtn
          text2={'Earn Cash with Togolist'}
          text1={''}
          text3={
            'Register with Togolist to become a verified local guide and share your expertise with others while earning an income!'
          }
          btnText={'Become a Guide'}
          onBtnPress={() => {
            navigateTo(SCREENS.NotificationDetails);
          }}
          collocation_bg={{height: SCREEN_HEIGHT * 0.69, marginTop: 0}}
          btnStyle={{
            width: 116,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...commonFontStyle(700, 34, colors.black),
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    marginVertical: hp(17),
  },
  tab: {
    padding: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#D9D9D9',
  },
  selectedTab: {
    backgroundColor: 'white',
    borderColor: '#BD2332',
  },
  tabText: {
    ...commonFontStyle(700, 14, '#999999'),
  },
  selectedTabText: {
    ...commonFontStyle(700, 14, colors.primary1),
  },
});
