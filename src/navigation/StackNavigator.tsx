import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch} from '../redux/hooks';
import {colors} from '../theme/colors';
import {Text} from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
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

export type RootStackParamList = {
  HomeScreen: undefined;
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
    </Stack.Navigator>
  );
};
export default StackNavigator;
