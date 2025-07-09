import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  CommonSheet,
  CustomHeader,
  LinearView,
  ProfileCard,
  SearchBar,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Fs, SCREEN_HEIGHT, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';
import TravelCardLock from '../../component/common/TravelCardLock';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';

const events = [
  {
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
  {
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
];

const categories = [
  {label: 'Top Rated Nearby 🏆'},
  {label: 'Entertainment 🎭'},
  {label: 'Outdoors 🌲'},
  {label: 'Wellness 🧘'},
  {label: 'Shopping 🎪'},
  {label: 'Fun 🎳'},
  {label: 'More'},
];

const SearchViewScreen = () => {
  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState('List View');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);

  const AddListCard = useCallback(item => {
    return (
      <TouchableOpacity style={styles.card}>
        <ImageBackground
          source={IMAGES.bg1}
          imageStyle={styles.imgStyle}
          resizeMode="cover"
          style={styles.bg}>
          <Text style={styles.cardTitle}>{'Tourist Attractions'}</Text>
          <Image source={IMAGES.add_icon} style={styles.addicon} />
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
         showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title="Explore"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <SearchBar
          container={styles.searchBox}
          placeholder="Toronto Dinner Spots"
          inputStyle={styles.searchInput}
          IconStyle={{width: 17, height: 15, tintColor: '#A4A4A4'}}
        />
        {/* Category Chips */}
        <View style={styles.tagsContainer}>
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} style={styles.tag}>
              <Text style={styles.tagText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Toronto Cafes</Text>
          <Text style={styles.headerText1}>Toronto, Canada</Text>
        </View>
        <View style={AppStyles.flex1}>
          <View></View>

          <View style={[AppStyles.flex1]}>
            <View style={styles.headerrow}>
              <View style={styles.select}>
                <TouchableOpacity onPress={() => setSelect1('List View')}>
                  <Text
                    style={[
                      styles.subtext,
                      {
                        fontSize: Fs(18),
                        color:
                          select1 == 'List View'
                            ? colors._BD2332
                            : colors._99999,
                      },
                    ]}>
                    List View
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.subtext, {fontSize: Fs(18)}]}>{'|'}</Text>
                <TouchableOpacity onPress={() => setSelect1('Map View')}>
                  <Text
                    style={[
                      styles.subtext,
                      {
                        fontSize: Fs(18),
                        color:
                          select1 == 'Map View'
                            ? colors._BD2332
                            : colors._99999,
                      },
                    ]}>
                    Map View
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.location}>{'Mexico'}</Text>
            </View>
            <View style={[AppStyles.flex1]}>
              {select1 == 'List View' && (
                <FlatList
                  data={[1, 2]}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => (
                    <DiscoverNewSpotsCard
                      {...item}
                      imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0: 16}}
                      onPressAdd={() => {
                        setSelect(true);
                        handlePresentAddlistPress();
                      }}
                    />
                  )}
                  contentContainerStyle={{
                    paddingBottom: hp(16),
                    gap: hp(8),
                    marginHorizontal: 20,
                  }}
                />
              )}
              {select1 == 'Map View' && (
                <MapView
                  style={AppStyles.flex1}
                  provider={PROVIDER_GOOGLE}
                  key={API.MAP_KEY}
                  region={{
                    latitude: 51.5065313073,
                    longitude: -0.1888825778,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                  onPoiClick={e => handlePresentModalPress()}
                />
              )}
            </View>
          </View>
          <CommonSheet
            title="Details"
            bottomSheetModalRef={bottomSheetModalRef}
            maxDynamicContentSize={600}
            children={
              <View style={{paddingVertical: hp(8)}}>
                <DiscoverNewSpotsCard
                 imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0: 16}}
                  onPressAdd={() => {
                    setSelect(false);
                    handlePresentAddlistPress();
                  }}
                />
              </View>
            }
          />
        </View>
      </ScrollView>
       <AddToListBottomSheet
              bottomSheetModalRef={bottomSheetAddListRef}
              // maxDynamicContentSize
              // handleSheetChanges={e => handleSheetChanges(e)}
            />
      {/* <CommonSheet
        title="Add To List"
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={
          select ? SCREEN_HEIGHT - hp(190) : SCREEN_HEIGHT - hp(190)
        }
        children={
          <View style={{}}>
            <DiscoverNewSpotsCard
              showInfo={false}
              showRating={false}
              isShowOptions={false}
               imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0: 16}}
            />
            <View style={styles.optionContainer}>
              <View style={styles.row}>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.addpin} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.plain} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.container} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.book} />
                </TouchableOpacity>
              </View>
              <LinearView
                containerStyle={styles.containerStyle}
                linearViewStyle={styles.listContainer1}>
                <View>
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Personal Lists'}
                    headerStyle={styles.headerstyle}
                  />
                  <FlatList
                    data={[1, 2, 3, 4]}
                    ItemSeparatorComponent={() => (
                      <View style={{height: hp(4)}} />
                    )}
                    renderItem={({item, index}) => <AddListCard />}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Guide to LA'}
                    headerStyle={styles.headerstyle}
                  />
                  <FlatList
                    data={[1, 2, 3, 4]}
                    ItemSeparatorComponent={() => (
                      <View style={{height: hp(4)}} />
                    )}
                    renderItem={({item, index}) => <AddListCard />}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Golf Courses'}
                    headerStyle={styles.headerstyle}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Cool Architecture'}
                    headerStyle={styles.headerstyle}
                  />
                </View>
              </LinearView>
            </View>
            <Button type="outline" BtnStyle={styles.btn1} title="Create New" />
            <Button
              type="outline"
              BtnStyle={[styles.btn1, {marginBottom: 20}]}
              title="Done"
            />
          </View>
        }
      /> */}
    </SafeAreaView>
  );
};

export default SearchViewScreen;

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    paddingHorizontal: wp(16),
  },
  tag: {
    paddingHorizontal: wp(12),
    paddingVertical: hp(5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: hp(4),
  },
  tagText: {
    ...commonFontStyle(600, 12, '#000'),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 11,
    paddingHorizontal: wp(16),
  },

  headerText: {
    ...commonFontStyle(600, 18, '#000'),
    flex: 1,
  },
  headerText1: {
    ...commonFontStyle(400, 14, '#787878'),
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
  searchBox: {
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    backgroundColor: colors.white,
    marginHorizontal: wp(16),
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    ...commonFontStyle(400, 14, '#000'), // You can change 16 to any default search input size
  },
  scroll: {
    flexGrow: 1,
  },

  btn: {
    borderWidth: 1,
    borderColor: colors._D9D9D9,
    borderRadius: 10,
    paddingHorizontal: wp(6),
    paddingVertical: hp(6),
  },
  btnText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  separator: {
    width: wp(8),
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
  location: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
  },
  eventTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  list: {
    flex: 1,
  },

  select1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingHorizontal: wp(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(48),
    paddingVertical: hp(21),
  },
  icons: {
    width: wp(26),
    height: wp(26),
    resizeMode: 'contain',
  },
  optionContainer: {
    backgroundColor: '#4444441A',
    borderRadius: 16,
    marginTop: hp(16),
    overflow: 'hidden',
    marginBottom: hp(8),
  },
  listContainer1: {
    borderRadius: 0,
  },
  titleStyle: {
    ...commonFontStyle(600, 14, colors.black),
  },
  containerStyle: {
    padding: wp(16),
  },
  bg: {
    flex: 1,
    paddingVertical: hp(11),
    paddingHorizontal: wp(8),
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imgStyle: {
    flex: 1,
  },
  cardTitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  addicon: {
    width: wp(18),
    height: wp(18),
    alignSelf: 'flex-end',
    tintColor: colors.white,
  },
  headerstyle: {
    paddingBottom: hp(9),
  },
  btn1: {
    marginTop: hp(8),
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    padding: wp(24),
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
  },
  placeholder: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 5,
  },
  icon1: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
  },
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '62%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.7,
    marginRight: 10,
  },
  BGcard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '32%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.3,
  },
  Eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(8),
  },
  guiderow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(24),
  },
  guideTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  headerlabel: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  list1: {
    flex: 1,
  },
  earnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    marginTop: hp(16),
    height: hp(280),
    gap: hp(8),
  },
  earntitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  earnImg: {
    borderRadius: 20,
  },
  discription: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
  },
  hostbtn: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  hosttitle: {
    ...commonFontStyle(600, 12, colors._444444),
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
  },
});
