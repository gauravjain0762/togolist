import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {wp} from './fonts';

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
    paddingHorizontal: wp(10),
  },
  mainSide: {
    marginHorizontal: wp(20),
  },
  P16: {
    paddingHorizontal: wp(16),
  },
  M16: {
    marginHorizontal: wp(16),
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
