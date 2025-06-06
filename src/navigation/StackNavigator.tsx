import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch} from '../redux/hooks';
import {colors} from '../theme/colors';
import {Text} from 'react-native';
import TripHome from '../screens/tripHome/TripHome';
import {ScreenNames, SCREENS} from './screenNames';
import LoginScreen from '../screens/auth/LoginScreen';
import {SET_FCM_TOKEN} from '../redux/actionTypes';
import SplashScreen from '../screens/auth/SplashScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import SigninScreen from '../screens/auth/SigninScreen';
import UserNameScreen from '../screens/auth/UserNameScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import IntroScreen from '../screens/auth/IntroScreen';
import TabNavigator from './TabNavigator';
import VerifyAccountScreen from '../screens/auth/VerifyAccountScreen';
import PlaceDetails from '../screens/newList/PlaceDetails';
import Experience from '../screens/profile/Experience';
import CreatedForYou from '../screens/profile/CreatedForYou';
import GuideRequest from '../screens/profile/GuideRequest';
import Favorites from '../screens/profile/Favorites';
import BeenThere from '../screens/profile/BeenThere';
import Shared from '../screens/profile/Shared';
import ProfileSettingScreen from '../screens/profile/profileSetting/ProfileSettingScreen';
import SubscriptionScreen from '../screens/profile/profileSetting/SubscriptionScreen';
import PersonalInformation from '../screens/profile/profileSetting/PersonalInformation';
import NotificationsSetting from '../screens/profile/profileSetting/NotificationsSetting';
import BillingScreen from '../screens/profile/profileSetting/BillingScreen';
import SubscriptionScreenSetting from '../screens/profile/profileSetting/SubscriptionScreenSetting';
import SecurityScreen from '../screens/profile/profileSetting/SecurityScreen';
import SharedListDetails from '../screens/profile/SharedListDetails';
import FoodPlace from '../screens/profile/FoodPlace';
import EventDetails from '../screens/profile/EventDetails';
import ExperienceScreen from '../screens/search/ExperienceScreen';
import RequestHost from '../screens/search/RequestHost';
import PostRequest from '../screens/search/PostRequest';
import ExploreSearch from '../screens/search/ExploreSearch';
import TripsDetails from '../screens/tripHome/TripsDetails';
import BucketListScreen from '../screens/tripHome/BucketListScreen';
import BucketListDetails from '../screens/tripHome/BucketListDetails';
import CollaboratorsScreen from '../screens/tripHome/CollaboratorsScreen';
import TripTogolistsScreen from '../screens/tripHome/TripTogolistsScreen';
import AddTripTogolistsScreen from '../screens/tripHome/AddTripTogolistsScreen';
import ThingsTogolistsScreen from '../screens/tripHome/ThingsTogolistsScreen';
import SearchViewScreen from '../screens/shape/SearchViewScreen';
import NewTrip from '../screens/tripHome/NewTrip';

export type RootStackParamList = {
  TripHome: undefined;
};
const headerStyleTransparent = {
  headerStyle: {
    backgroundColor: colors.white,
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    // ...commonFontStyle(i18n.language, 500, 19, colors.black),
  },
  headerTitleAlign: 'center',
  // ...TransitionPresets.SlideFromRightIOS,
};
const Stack = createStackNavigator<ScreenNames>();

const LogoHeader = () => {
  return <Text>hi</Text>;
};

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   messaging().setAutoInitEnabled(true);
  //   setNotification();
  // }, []);
  // const setNotification = async () => {
  //   let authStatus = await firebase.messaging().hasPermission();

  //   if (authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED) {
  //     requestPermission();
  //   }

  //   if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
  //     getToken();
  //   }
  // };
  // const requestPermission = () => {
  //   messaging()
  //     .requestPermission({
  //       alert: true,
  //       announcement: false,
  //       badge: true,
  //       carPlay: true,
  //       provisional: false,
  //       sound: true,
  //     })
  //     .then(() => {
  //       getToken();
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // };
  // const getToken = async () => {
  //   messaging()
  //     .getToken()
  //     .then(fcmToken => {
  //       if (fcmToken) {
  //         console.log('fcm--', fcmToken);
  //         dispatchAction(dispatch, SET_FCM_TOKEN, fcmToken);
  //       } else {
  //         console.log('[FCMService] User does not have a device token');
  //       }
  //     })
  //     .catch(error => {
  //       let err = `FCm token get error${error}`;
  //       console.log(err);
  //     });
  // };
  //   const checkNotification = (remoteMessage: any) => {};
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       checkNotification(remoteMessage);
  //     }
  //   });
  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log('getInitialNotification', remoteMessage);
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //       checkNotification(remoteMessage);
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     checkNotification(remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     checkNotification(remoteMessage);
  //     onDisplayNotification(remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);
  // async function onDisplayNotification(message: any) {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });
  //   notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_stat_name',
  //       sound: 'noti.mp3',
  //     },
  //     ios: {
  //       sound: 'noti.wav',
  //     },
  //   });
  // }

  return (
    <Stack.Navigator initialRouteName={SCREENS.TabNavigator}>
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SplashScreen}
        component={SplashScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.TabNavigator}
        component={TabNavigator}
      />

      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.WelcomeScreen}
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.IntroScreen}
        component={IntroScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SignupScreen}
        component={SignupScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SigninScreen}
        component={SigninScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.UserNameScreen}
        component={UserNameScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.VerifyAccountScreen}
        component={VerifyAccountScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.PlaceDetails}
        component={PlaceDetails}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.Experience}
        component={Experience}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.CreatedForYou}
        component={CreatedForYou}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.GuideRequest}
        component={GuideRequest}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.Favorites}
        component={Favorites}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.BeenThere}
        component={BeenThere}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.Shared}
        component={Shared}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.ProfileSettingScreen}
        component={ProfileSettingScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SubscriptionScreen}
        component={SubscriptionScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.PersonalInformation}
        component={PersonalInformation}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.BillingScreen}
        component={BillingScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.NotificationsSetting}
        component={NotificationsSetting}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SecurityScreen}
        component={SecurityScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SubscriptionScreenSetting}
        component={SubscriptionScreenSetting}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.FoodPlace}
        component={FoodPlace}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SharedListDetails}
        component={SharedListDetails}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.EventDetails}
        component={EventDetails}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.ExperienceScreen}
        component={ExperienceScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.RequestHost}
        component={RequestHost}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.PostRequest}
        component={PostRequest}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.ExploreSearch}
        component={ExploreSearch}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.TripsDetails}
        component={TripsDetails}
      />
      {/* NEW  */}
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.BucketListScreen}
        component={BucketListScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.BucketListDetails}
        component={BucketListDetails}
      />

      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.CollaboratorsScreen}
        component={CollaboratorsScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.TripTogolistsScreen}
        component={TripTogolistsScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.AddTripTogolistsScreen}
        component={AddTripTogolistsScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.ThingsTogolistsScreen}
        component={ThingsTogolistsScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.SearchViewScreen}
        component={SearchViewScreen}
      />
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.NewTrip}
        component={NewTrip}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
