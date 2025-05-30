import {
  Image,
  ImageProps,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

type search = {
  onChangeText?: (e: any) => void;
  placeholder?: string;
  container?: ViewStyle;
  value?: string;
  searchImg?: ImageProps;
  IconStyle?: ImageStyle;
};

const SearchBar: FC<search> = ({
  onChangeText = () => {},
  placeholder,
  container,
  value = '',
  searchImg,
  IconStyle,
}) => {
  return (
    <View style={[styles.searchContainer, container]}>
      <Image
        source={searchImg || IMAGES.search}
        style={[styles.searchIcon, IconStyle]}
      />
      <TextInput
        value={value}
        placeholder={placeholder || 'Search within your list'}
        placeholderTextColor={colors.gray}
        style={styles.searchInput}
        onChangeText={e => onChangeText(e)}
      />
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  searchIcon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    ...commonFontStyle(500, 18, '#3C3C4399'),
  },
});
