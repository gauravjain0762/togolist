import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {commonFontStyle} from '../../theme/fonts';

const CustomHeader = ({
  onBack,
  onShare,
  mainHeader,
  title = 'Back',
  onSearchPress,
  onMorePress,
  searchIconStyle
}: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.left}>
        <Image source={IMAGES.back} style={styles.backIcon} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
          <Image source={IMAGES.search} style={[styles.searchIcon,searchIconStyle]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMorePress} style={{}}>
          <Image source={IMAGES.more_icon} style={styles.moreIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    ...commonFontStyle(600, 17, colors._787878),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginRight: 10,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.black,
  },
  moreIcon: {
    width: 18,
    height: 18,
    tintColor: colors.black,
  },
  backIcon: {
    width: 11,
    height: 24,
    tintColor: colors._787878,
    resizeMode: 'contain',
  },
});

export default CustomHeader;
