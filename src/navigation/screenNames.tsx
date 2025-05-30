export const SCREENS = {
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  TabNavigator: 'TabNavigator',
  SplashScreen: 'SplashScreen',
  PanditProfileScreen: 'PanditProfileScreen',
  WelcomeScreen: 'WelcomeScreen',
  IntroScreen: 'IntroScreen',
  SignupScreen: 'SignupScreen',
  SigninScreen: 'SigninScreen',
  UserNameScreen: 'UserNameScreen',
  SearchScreen: 'SearchScreen',
  CreateListScreen: 'CreateListScreen',
  ShapeScreen: 'ShapeScreen',
  ProfileScreen: 'ProfileScreen',
  VerifyAccountScreen: 'VerifyAccountScreen',
  PlaceDetails: 'PlaceDetails',
  Experience: 'Experience',
  CreatedForYou: 'CreatedForYou',
  GuideRequest: 'GuideRequest',
  Favorites: 'Favorites',
  BeenThere: 'BeenThere',
  Shared: 'Shared',
};

export interface ScreenNames {
  [key: string]: string;
  HomeScreen: string;
  LoginScreen: string;
  SplashScreen: string;
  PanditProfileScreen: string;
  IntroScreen: string;
  SignupScreen: string;
  SigninScreen: string;
  UserNameScreen: string;
  SearchScreen: string;
  CreateListScreen: string;
  ShapeScreen: string;
  ProfileScreen: string;
  TabNavigator: string;
  VerifyAccountScreen: string;
  PlaceDetails: string;
  Experience: string;
  CreatedForYou: string;
  Favorites: string;
  BeenThere: string;
  Shared: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
