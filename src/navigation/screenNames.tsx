export const SCREENS = {
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  SplashScreen: 'SplashScreen',
  PanditProfileScreen: 'PanditProfileScreen',
  WelcomeScreen: 'WelcomeScreen',
  IntroScreen: 'IntroScreen',
};

export interface ScreenNames {
  [key: string]: string;
  HomeScreen: string;
  LoginScreen: string;
  SplashScreen: string;
  PanditProfileScreen: string;
  IntroScreen: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
