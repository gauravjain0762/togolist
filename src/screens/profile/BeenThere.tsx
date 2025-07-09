import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {CustomHeader, PlacesCard, SearchBar} from '../../component';
import {IMAGES} from '../../assets/Images';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';

const cards = [
  {
    title: 'La Perla Cocina',
    location: 'Egypt',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.FoodPlace),
  },
  {
    title: 'Samuri Japanese Restaurant',
    location: 'Worldwide',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    title: 'La Perla Cocina',
    location: 'London',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    title: 'Samuri Japanese Restaurant',
    location: 'Peru',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
];

const BeenThere = () => {
  const [select, setSelect] = useState('List View');
  const [showPersonal, setShowPersonal] = useState(true);

  return (
    <SafeAreaView style={[AppStyles.flex, styles.maincontainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
         showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <ScrollView
        style={AppStyles.flex1}
        contentContainerStyle={AppStyles.flexGrow}
        showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.daily}>{'Ray Daily’s'}</Text>
          <Text style={styles.title}>{'Been There'}</Text>
          <View style={styles.bylineContainer}>
            <Text style={styles.subtext}>Worldwide | 11 Favs</Text>
          </View>
          <Text style={styles.description}>
            {
              'Favorite lists, places, events and itineraries that you’ve saved for later.'
            }
          </Text>
          <SearchBar searchImg={IMAGES.search1} />
          <View style={styles.select}>
            <TouchableOpacity onPress={() => setSelect('List View')}>
              <Text
                style={[
                  styles.subtext,
                  {
                    fontSize: Fs(18),
                    color:
                      select == 'List View' ? colors._BD2332 : colors._99999,
                  },
                ]}>
                List View
              </Text>
            </TouchableOpacity>
            <Text style={[styles.subtext, {fontSize: Fs(18)}]}>{'|'}</Text>
            <TouchableOpacity onPress={() => setSelect('Map View')}>
              <Text
                style={[
                  styles.subtext,
                  {
                    fontSize: Fs(18),
                    color:
                      select == 'Map View' ? colors._BD2332 : colors._99999,
                  },
                ]}>
                Map View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {select == 'List View' && (
          <View style={styles.container}>
            <HeaderTextIcon
              headerStyle={styles.titleheader}
              title={'San Diego'}
              showAddIcon={false}
              show={showPersonal}
                 onDownPress={() => {
                setShowPersonal(!showPersonal);
              }}
            />
            {showPersonal &&<FlatList
              data={cards}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.Listcontainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => {
                return (
                  <PlacesCard
                    onCardPress={() => {
                      item?.onPress && item?.onPress();
                    }}
                    title={item?.title}
                    location={item?.location}
                    likeCount={item.lists}
                  />
                );
              }}
            />}
            <View style={styles.place}>
              <View style={styles.row}>
                <Text style={styles.location}>{'Los Angeles'}</Text>
                <Text style={styles.count}>{'3 Places'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.location}>{'Toronto'}</Text>
                <Text style={styles.count}>{'3 Places'}</Text>
              </View>
            </View>
          </View>
        )}
        {select == 'Map View' && (
          <MapView
            style={AppStyles.flex1}
            provider={PROVIDER_GOOGLE}
            key={API.MAP_KEY}
            region={{
              latitude: 51.5065313072,
              longitude: -0.1888825778,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeenThere;

const styles = StyleSheet.create({
  maincontainer: {},
  back: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: undefined,
  },
  more: {
    tintColor: undefined,
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  header: {
    paddingHorizontal: wp(16),
  },
  intro: {
    paddingHorizontal: wp(24),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  description: {
    ...commonFontStyle(400, 16, colors.black),
  },
  icon: {
    width: wp(19),
    height: wp(24),
    marginRight: 8,
    resizeMode: 'contain',
  },
  bylineText: {
    ...commonFontStyle(700, 15, colors.black),
  },
  bylineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  daily: {
    ...commonFontStyle(700, 32, colors._99999),
  },
  container: {
    paddingHorizontal: wp(16),
  },
  titleheader: {
    marginVertical: hp(16),
  },
  separator: {
    height: hp(8),
  },
  Listcontainer: {},
  count: {
    ...commonFontStyle(500, 16, colors._99999),
  },
  location: {
    ...commonFontStyle(600, 20, colors.black),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(14),
    borderBottomWidth: 1,
    borderBottomColor: '#1B151533',
  },
  place: {
    marginBottom: hp(60),
  },
});
