import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const AppStyles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  side: {
    paddingHorizontal: 10,
  },
  mainSide: {
    marginHorizontal: 20,
  },
  mainWhiteContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Vcenter: {
    justifyContent: 'center',
  },
  Hcenter: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlyRow: {
    flexDirection: 'row',
  },
});
