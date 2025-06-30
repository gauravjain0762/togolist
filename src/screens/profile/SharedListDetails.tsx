import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {
  Button,
  CustomHeader,
  OptionBar,
  PlacesCard,
  SearchBar,
  ShareBottomSheet,
  SharedCard,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {SwipeListView} from 'react-native-swipe-list-view';

const cards = [
  {
    id:1,
    title: 'Samuri Japanese Restaurant',
    location: '979 Lomas Santa Fe Dr, Solana Beach...',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.EventDetails),
  },
  {
    id:2,
    title: 'Mt. Hood Timber Lodge',
    location: 'National park in California',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    id:3,
    title: 'Samuri Japanese Restaurant',
    location: '979 Lomas Santa Fe Dr, Solana Beach...',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    id:4,
    title: 'Mt. Hood Timber Lodge',
    location: 'National park in California',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
];

const SharedListDetails = () => {
  const [select, setSelect] = useState('List View');
  const [showCard, setShowCard] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <SafeAreaView style={[AppStyles.flex, styles.mainContainer]}>
      <CustomHeader
       showBack={true}
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containter}>
          <View style={styles.info}>
            <View>
              <Text style={styles.graytitle}>{'North America'}</Text>
              <Text style={styles.title}>{'Fav Food Spots'}</Text>
            </View>
            <View style={styles.network}>
              <View style={styles.infoRow}>
                <Text style={styles.text}>San Diego</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.text}>5 Places</Text>
                <Text style={styles.separator}>|</Text>
                <Image source={IMAGES.world} style={styles.icon} />
                <Text style={[styles.text, styles.textWithIcon]}>Public</Text>
              </View>
            </View>
          </View>
          <SearchBar
            container={{marginHorizontal: 0}}
            searchImg={IMAGES.search1}
          />
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
          {/* {showCard && <OptionBar container={styles.optioncontainer} />} */}
          <SwipeListView
            data={cards}
            ItemSeparatorComponent={() => (
              <View style={styles.liastseparator} />
            )}
            showsVerticalScrollIndicator={false}
            renderItem={(data, rowMap) => {
              return (
                <View style={styles.rowFront}>
                  <PlacesCard
                    onCardPress={() => {
                      // data?.item?.onPress && data?.item?.onPress();
                       navigateTo(SCREENS.EventDetails,{item:data?.item,data:cards})
                      
                    }}
                    id={data?.item?.id}
                    title={data?.item?.title}
                    location={data?.item?.location}
                    likeCount={data?.item.lists}
                    locationIcon
                    locationStyle={styles.location}
                  />
                </View>
              );
            }}
            disableRightSwipe
            swipeToOpenPercent={30}
                   rightOpenValue={-354}
            renderHiddenItem={(data, rowMap) => (
               <OptionBar container={styles.optioncontainer} />
              
            )}
            leftOpenValue={75}
            onRowOpen={(rowKey, rowMap, toValue) => {
              if (toValue < 0) {
                console.log('Swiped left');
                setShowCard(true);
              } else {
                console.log('Swiped right');
              }
            }}
            onRowClose={(rowKey, rowMap) => {
              setShowCard(false);
            }}
          />
          {/* <FlatList
            data={cards}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.Listcontainer}
            ItemSeparatorComponent={() => (
              <View style={styles.liastseparator} />
            )}
            renderItem={({item}) => {
              return (
                <PlacesCard
                  onCardPress={() => {
                    item?.onPress && item?.onPress();
                  }}
                  title={item?.title}
                  location={item?.location}
                  likeCount={item.lists}
                  locationIcon
                  locationStyle={styles.location}
                />
              );
            }}
          /> */}
          <Button
            leftImg={IMAGES.addlist}
            type="outline"
            title="Add a new place"
            BtnStyle={styles.btn}
            onPress={() => handlePresentModalPress()}
          />
        </View>
      </ScrollView>
      <ShareBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={e => handleSheetChanges(e)}
      />
    </SafeAreaView>
  );
};

export default SharedListDetails;

const styles = StyleSheet.create({
  mainContainer: {
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
  containter: {
    paddingHorizontal: wp(16),
  },
  info: {
    paddingHorizontal: wp(8),
    marginTop: hp(10),
    gap: hp(12),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...commonFontStyle(500, 18, colors._999999),
  },
  separator: {
    marginHorizontal: 6,
    ...commonFontStyle(500, 18, colors._999999),
  },
  textWithIcon: {
    marginLeft: 4,
  },
  network: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  travel: {
    ...commonFontStyle(400, 16, colors.black),
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
  graytitle: {
    ...commonFontStyle(700, 32, colors._999999),
  },
  btn: {
    marginVertical: hp(16),
    paddingVertical: hp(12),
  },
  Listcontainer: {},
  liastseparator: {
    height: hp(8),
  },
  location: {
    ...commonFontStyle(600, 12, colors.white),
    marginTop: 0,
  },
  optioncontainer: {
    marginBottom: hp(8),
  },

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
    // marginHorizontal: 20,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: colors._BD2332,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: hp(28),
    gap: wp(30),
    overflow: 'hidden',
    // marginTop: 12,
    // marginHorizontal: 20,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(6),
  },
  backText: {
    ...commonFontStyle(500, 10, colors.white),
  },
  restore: {
    width: wp(23),
    height: wp(23),
    resizeMode: 'contain',
  },
  remove: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
});
