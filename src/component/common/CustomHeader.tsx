import React, {FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ImageStyle,
  TextStyle,
  ImageURISource,
  ViewStyle,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {commonFontStyle, wp} from '../../theme/fonts';
import {navigationRef} from '../../navigation/RootContainer';

type header = {
  onBack?: () => void;
  onShare?: () => void;
  mainHeader?: any;
  title?: string;
  onSearchPress?: () => void;
  onMorePress?: () => void;
  searchIconStyle?: ImageStyle;
  showSearch?: boolean;
  showMore?: boolean;
  titleStyle?: TextStyle;
  backIconStyle?: ImageStyle;
  backImg: ImageURISource;
  moreIconStyle?: ImageStyle;
  moreImg?: ImageURISource;
  headerStyle?: ViewStyle;
};

const CustomHeader: FC<header> = ({
  onBack = () => {},
  onShare,
  mainHeader,
  title = 'Back',
  onSearchPress,
  onMorePress,
  searchIconStyle,
  showSearch = true,
  showMore = true,
  titleStyle,
  backIconStyle,
  backImg,
  moreIconStyle,
  moreImg,
  headerStyle,
}) => {
  return (
    <View style={[styles.header, headerStyle]}>
      <TouchableOpacity
        onPress={() => onBack() || navigationRef.goBack()}
        style={styles.left}>
        <Image
          source={backImg || IMAGES.back}
          style={[styles.backIcon, backIconStyle]}
        />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {showSearch && (
          <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
            <Image
              source={IMAGES.search}
              style={[styles.searchIcon, searchIconStyle]}
            />
          </TouchableOpacity>
        )}
        {showMore && (
          <TouchableOpacity onPress={onMorePress} style={{}}>
            <Image
              source={moreImg || IMAGES.more_icon}
              style={[styles.moreIcon, moreIconStyle]}
            />
          </TouchableOpacity>
        )}
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
