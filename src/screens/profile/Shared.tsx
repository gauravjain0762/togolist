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
import {colors} from '../../theme/colors';
import {
  Button,
  CustomHeader,
  SearchBar,
  ShareBottomSheet,
  SharedCard,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';

const cards = [
  {
    title: 'Fav Food Spots',
    location: 'Egypt',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.SharedListDetails),
  },
  {
    title: 'Things to Do',
    location: 'Worldwide',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    title: 'Hiking',
    location: 'London',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    title: 'Best Coffee Spots',
    location: 'Peru',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
];

const Shared = () => {
  const [select, setSelect] = useState('List View');

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
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <ScrollView
        contentContainerStyle={AppStyles.flexGrow}
        style={AppStyles.flex1}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containter}>
          <View style={styles.info}>
            <Text style={styles.title}>{'North America'}</Text>
            <View style={styles.userinfo}>
              <Image source={IMAGES.avatar} style={styles.user} />
              <Text style={styles.username}>{'@ray'}</Text>
            </View>
            <View style={styles.network}>
              <View style={styles.infoRow}>
                <Text style={styles.text}>San Diego</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.text}>5 Lists</Text>
                <Text style={styles.separator}>|</Text>
                <Image source={IMAGES.world} style={styles.icon} />
                <Text style={[styles.text, styles.textWithIcon]}>Public</Text>
              </View>
              <View style={styles.bookmarkRow}>
                <Image
                  source={IMAGES.save_cion}
                  style={[styles.icon, {width: wp(16), height: wp(16)}]}
                />
                <Text style={styles.text}>1.2K</Text>
              </View>
            </View>
            <Text style={styles.travel}>{'Travel around North America.'}</Text>
          </View>
          <SearchBar container={AppStyles.M16} searchImg={IMAGES.search1} />
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
          {select == 'List View' && (
            <>
              <FlatList
                data={cards}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.Listcontainer}
                ItemSeparatorComponent={() => (
                  <View style={styles.liastseparator} />
                )}
                renderItem={({item}) => {
                  return (
                    <SharedCard
                      onCardPress={() => {
                        item?.onPress && item?.onPress();
                      }}
                      title={item?.title}
                      likeCount={item.lists}
                      account
                      address
                      place
                      listCount={item?.lists}
                    />
                  );
                }}
              />
              <Button
                leftImg={IMAGES.addlist}
                type="outline"
                title="Add a new list"
                BtnStyle={styles.btn}
                onPress={() => handlePresentModalPress()}
              />
            </>
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
        </View>
      </ScrollView>
      <ShareBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={e => handleSheetChanges(e)}
      />
    </SafeAreaView>
  );
};

export default Shared;

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
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  containter: {
    flex: 1,
  },
  info: {
    paddingHorizontal: wp(24),
    marginTop: hp(10),
    gap: hp(12),
  },
  user: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  username: {
    ...commonFontStyle(500, 15, colors.black),
  },
  userinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
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
  bookmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    paddingHorizontal: wp(16),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  Listcontainer: {},
  liastseparator: {
    height: hp(8),
  },
  btn: {
    marginVertical: hp(16),
    paddingVertical: hp(12),
  },
});
