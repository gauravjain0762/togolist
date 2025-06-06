import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CardImage from '../../component/common/CardImage';
import CardImageView from '../../component/trip/CardImageView';
import { navigateTo } from '../../utils/commonFunction';
import { SCREENS } from '../../navigation/screenNames';

const cards = [
  {
    title: 'Best of Egypt',
    location: 'Egypt',
    user: 'Togolist',
    lists: 31,
    likes: '20.3k',
    image: 'https://example.com/egypt.jpg',
  },
  {
    title: 'Unesco Heritage Sites',
    location: 'Worldwide',
    user: 'jessica123',
    lists: 23,
    likes: '18.1k',
    image: 'https://example.com/unesco.jpg',
  },
  {
    title: 'London Guide',
    location: 'London',
    user: 'jessica123',
    lists: 6,
    likes: '17k',
    image: 'https://example.com/london.jpg',
  },
  {
    title: 'Where To Go: Peru',
    location: 'Peru',
    user: 'jessica123',
    lists: 11,
    likes: '16.5k',
    image: 'https://example.com/peru.jpg',
  },
  {
    title: 'Safari: Africa Where To Go',
    location: 'Africa',
    user: 'jessica123',
    lists: 6,
    likes: '14k',
    image: 'https://example.com/safari.jpg',
  },
  {
    title: 'Visit the Amazon',
    location: 'San Diego',
    user: 'jessica123',
    lists: 6,
    likes: '13.1k',
    image: 'https://example.com/amazon.jpg',
  },
];
const BucketListScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title="Trips" showSearch={false} onMorePress={() => {}} />
      <View style={[{paddingHorizontal: 20}]}>
        {/* Title */}
        <Text style={styles.title}>Bucket List Inspo</Text>

        {/* Byline */}
        <View style={styles.bylineContainer}>
          <Image source={IMAGES.ToglistCircleIcon} style={styles.icon} />
          <Text style={styles.bylineText}>
            By <Text style={styles.boldText}>Togolist</Text>
          </Text>
        </View>

        {/* Location + Collection count */}
        <Text style={styles.subtext}>Worldwide | 11 Collections</Text>

        {/* Description */}
        <Text style={styles.description}>
          Find places to go in epic destinations. Collection curated by{' '}
          <Text style={styles.boldText1}>Togolist</Text>
        </Text>

        <View style={styles.searchContainer}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search within your list"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.byLocationText}>
          Most Popular <Text style={{color: '#999999'}}> | </Text>
          <Text style={styles.azText}>By location</Text>{' '}
          <Text style={{color: '#999999'}}> | </Text>
          <Text style={styles.azText}>A-Z</Text>
        </Text>
      </View>
      <FlatList
        data={cards}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => {
          return (
            <CardImageView
              onCardPress={() => {
                navigateTo(SCREENS.BucketListDetails);
              }}
              title={item?.title}
              Togolist={item?.user}
              Worldwide={item?.location}
              Lists
              listCount={item.lists}
              viewValue={item.likes}
            />
          );
        }}
      />
      <View style={{height: 20}} />
    </SafeAreaView>
  );
};

export default BucketListScreen;

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(700, 32, colors.black),
    marginBottom: 8,
  },
  bylineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: wp(24),
    height: wp(24),
    marginRight: 8,
  },
  bylineText: {
    ...commonFontStyle(700, 15, colors.black),
  },
  bylineText: {
    ...commonFontStyle(500, 15, colors.black),
  },
  boldText: {
    ...commonFontStyle(600, 15, colors.black),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  description: {
    ...commonFontStyle(400, 16, colors.black),
  },
  boldText1: {
    ...commonFontStyle(600, 16, colors.black),
  },
  byLocationText: {
    ...commonFontStyle(500, 18, colors.primary1),
  },
  azText: {
    ...commonFontStyle(500, 18, '#999999'),
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
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
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },
});
