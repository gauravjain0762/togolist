import {
  FlatList,
  Image,
  ImageProps,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

type search = {
  onChangeText?: (e: any) => void;
  placeholder?: string;
  container?: ViewStyle;
  value?: string;
  searchImg?: ImageProps;
  IconStyle?: ImageStyle;
  inputStyle?: ViewStyle;
  Filterdata?: any[];
  handleSelect?: (e: any) => void;
  data?: any[];
};

const SearchBar: FC<search> = ({
  onChangeText = () => {},
  placeholder,
  container,
  value = '',
  searchImg,
  IconStyle,
  inputStyle,
  Filterdata = [],
  handleSelect = () => {},
  data = [],
}) => {
  return (
    <View style={[styles.searchContainer, container]}>
      <View style={styles.row}>
        <Image
          source={searchImg || IMAGES.search}
          style={[styles.searchIcon, IconStyle]}
        />
        <TextInput
          value={value}
          placeholder={placeholder || 'Search within your list'}
          placeholderTextColor={colors.gray}
          style={[styles.searchInput, inputStyle]}
          onChangeText={e => onChangeText(e)}
        />
      </View>
      {Filterdata.length > 0 && (
        <FlatList
          data={Filterdata}
          keyExtractor={item => item}
          contentContainerStyle={styles.listcontainer}
          ItemSeparatorComponent={() => <View style={{height: hp(10)}} />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.item}>
              <Image
                source={searchImg || IMAGES.search}
                style={[styles.searchIcon, IconStyle]}
              />
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
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
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: hp(12),
    marginVertical: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    ...commonFontStyle(500, 18, '#3C3C4399'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...commonFontStyle(500, 12, colors.black),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  dropdown: {
    backgroundColor: colors.white,
  },
  listcontainer: {
    paddingTop: hp(10),
    borderTopWidth: 1,
    marginTop: hp(10),
    borderColor: colors._959595,
  },
});
