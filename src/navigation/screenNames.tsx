export const SCREENS = {
  HomeScreen: 'HomeScreen',
  LoginScreen: 'LoginScreen',
  SplashScreen: 'SplashScreen',
  PanditProfileScreen: 'PanditProfileScreen',
  WelcomeScreen: 'WelcomeScreen',
  IntroScreen: 'IntroScreen',
    SignupScreen: "SignupScreen",
  SigninScreen: "SigninScreen",
  UserNameScreen: "UserNameScreen",
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
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
