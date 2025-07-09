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
import {CustomHeader, PlacesCard, SearchBar} from '../../component';
import {IMAGES} from '../../assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import TravelCard from '../../component/common/TravelCard';
import CardImage from '../../component/common/CardImage';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';

const mockData = [
  {
    title: 'Aesthetics',
    location: 'World Wide',
    image: 'https://via.placeholder.com/300x200?text=Aesthetics',
    users: [
      {avatar: 'https://randomuser.me/api/portraits/men/1.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/women/2.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/men/3.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/women/4.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/men/5.jpg'},
    ],
  },
  {
    title: 'Tropical Explorations',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Golf Courses',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Golf',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Vibes',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Vibes',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Golf Courses',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Golf',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Vibes',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Vibes',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
];

const cards = [
  {
    title: 'La Perla Cocina',
    location: 'Egypt',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
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

const Favorites = () => {
  const [select, setSelect] = useState('List View');
  const [showPersonal, setShowPersonal] = useState(true);
  const [showCollections, setShowCollections] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  return (
    <SafeAreaView style={[AppStyles.flex, styles.maincontainer]}>
      <CustomHeader
        showBack={true}
        backImg={IMAGES.back1}
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
          <Text style={styles.title}>{'Favorites'}</Text>
          <View style={styles.bylineContainer}>
            <Image source={IMAGES.worldwide} style={styles.icon} />
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
              showAddIcon={false}
              title={'Collections'}
              show={showPersonal}
              onDownPress={() => {
                setShowPersonal(!showPersonal);
              }}
            />

            {showPersonal &&<FlatList
              data={mockData}
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{
                paddingBottom: hp(10),
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => <TravelCard {...item} />}
            />}
            <HeaderTextIcon
              headerStyle={styles.titleheader}
              title={'Places'}
              showAddIcon={false}
              show={showCollections}
              onDownPress={() => {
                setShowCollections(!showCollections);
              }}
            />
           {showCollections && <FlatList
              data={cards}
              showsVerticalScrollIndicator={false}
              // contentContainerStyle={styles.Listcontainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({item}) => {
                return (
                  <PlacesCard
                    onCardPress={() => {
                      // navigateTo(SCREENS.CreatedForYou);
                    }}
                    title={item?.title}
                    location={item?.location}
                    likeCount={item.lists}
                  />
                );
              }}
            />}
            <HeaderTextIcon
              headerStyle={styles.titleheader}
              title={'Events'}
              showAddIcon={false}
              show={showCalendar}
              onDownPress={() => {
                setShowCalendar(!showCalendar);
              }}
            />
           {showCalendar && <FlatList
              data={mockData?.slice(0, 4)}
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{
                paddingTop: hp(10),
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => <TravelCard {...item} />}
            />}
            <HeaderTextIcon
              headerStyle={styles.titleheader}
              title={'Itineraries'}
              showAddIcon={false}
              show={showItineraries}
              onDownPress={() => {
                setShowItineraries(!showItineraries);
              }}
            />
           {showItineraries && <FlatList
              data={mockData?.slice(0, 2)}
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{
                paddingTop: hp(8),
                marginBottom: hp(16),
                justifyContent: 'space-between',
              }}
              renderItem={({item}) => <TravelCard {...item} />}
            />}
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

export default Favorites;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.white,
  },
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
  daily: {
    ...commonFontStyle(700, 32, colors._99999),
  },
  intro: {
    paddingHorizontal: wp(24),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  container: {
    paddingHorizontal: wp(16),
  },
  bylineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
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
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  separator: {
    height: hp(8),
  },
  Listcontainer: {
    // marginTop: hp(16),
  },
  titleheader: {
    marginVertical: hp(16),
  },
});
