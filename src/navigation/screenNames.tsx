export const SCREENS = {
  HomeScreen: "HomeScreen",
  LoginScreen: "LoginScreen",
  SplashScreen: "SplashScreen",
  PanditProfileScreen: "PanditProfileScreen",
};

export interface ScreenNames {
  [key: string]: string;
  HomeScreen: string;
  LoginScreen: string;
  SplashScreen: string;
  PanditProfileScreen: string;
}

export const SCREEN_NAMES: ScreenNames = {
  ...SCREENS,
};
