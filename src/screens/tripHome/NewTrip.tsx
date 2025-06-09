import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Button, CommonSheet, CustomHeader, SearchBar} from '../../component';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import CustomBtn from '../../component/common/CustomBtn';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TogolistPro from '../../component/common/TogolistPro';
import CategoryCard from '../../component/trip/CategoryCard';
import {useRoute} from '@react-navigation/native';

const categories = [
  {
    title: 'Things to Do',
    category: 'Activities',
    places: 0,
    image: 'https://example.com/ferris.jpg',
    iconName: 'checkbox-outline',
  },
  {
    title: 'Places to Stay',
    category: 'Accommodations',
    places: 0,
    image: 'https://example.com/stay.jpg',
    iconName: 'home-outline',
  },
  {
    title: 'Where to Eat',
    category: 'Dinning',
    places: 0,
    image: 'https://example.com/eat.jpg',
    iconName: 'restaurant-outline',
  },
];

const NewTrip = () => {
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const {params} = useRoute();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title={params?.pastTrips ? 'Past Trips' : 'Trips'}
      />
      {step == 1 && (
        <ImageBackground source={IMAGES.trip_bg} style={styles.imageContainer}>
          <Text style={styles.title}>Destination</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card1}>
              <Image source={IMAGES.canlder} style={styles.icon1} />
              <Text style={styles.cardText}>Trip Dates</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePresentModalPress()}
              style={styles.card}>
              <Image source={IMAGES.camera} style={styles.icon} />
              <Text style={styles.cardText}>Image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.privacyContainer}>
            <RenderPrivacyOption
              type="public"
              selected={privacy}
              setSelected={setPrivacy}
            />

            <View style={{height: 16}} />
            <RenderPrivacyOption
              type="private"
              selected={privacy}
              setSelected={setPrivacy}
            />
          </View>
          <CustomBtn
            style={styles.button}
            onPress={() => setStep(step + 1)}
            buttonText={styles.buttonText}
            title={'Next'}
          />
        </ImageBackground>
      )}
      {step == 2 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={AppStyles.P16}>
          <ImageBackground
            source={IMAGES.bbq}
            imageStyle={styles.placeimges}
            style={styles.place}>
            <Text style={styles.placeTitle}>{'BBQ Festival'}</Text>
            <View style={styles.location}>
              <Text style={styles.address}>{'Starts in 60 Days'}</Text>
            </View>
            <View style={styles.timecontainer}>
              <Text style={styles.time}>{'May 10'}</Text>
              <Image source={IMAGES.arrow} style={styles.arrow} />
              <Text style={styles.time}>{'May 11'}</Text>
            </View>
          </ImageBackground>
          <TogolistPro />
          <View style={AppStyles.row}>
            <Text style={[styles.Tripphoto, {flex: 1}]}>
              {'Trip Togolists'}
            </Text>
            <TouchableOpacity>
              <Image source={IMAGES.add_icon} style={styles.addicon} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <CategoryCard
                  // onCardPress={() => {
                  //   navigateTo(SCREENS.BucketListDetails);
                  // }}
                  title={item?.title}
                  Togolist={item?.category}
                  Lists
                  listCount={item?.places}
                  showAddList={true}
                />
              );
            }}
          />
        </ScrollView>
      )}
      <CommonSheet
        title="Cover Image"
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <View style={styles.container}>
            <Button
              BtnStyle={styles.photo}
              title="From Photo Library"
              leftImg={IMAGES.upload}
            />
            <Button
              BtnStyle={styles.file}
              title="From Files"
              type="outline"
              leftImg={IMAGES.file}
              titleStyle={styles.Fieltitle}
            />
            <SearchBar
              container={styles.search}
              searchImg={IMAGES.search1}
              placeholder={'Search Unsplash'}
            />
            <FlatList
              numColumns={3}
              columnWrapperStyle={{flexWrap: 'wrap', gap: wp(8)}}
              contentContainerStyle={{gap: hp(8)}}
              data={new Array(9).fill(null)}
              renderItem={({item, index}) => (
                <Image source={IMAGES.bg} style={styles.bg} />
              )}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default NewTrip;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,

    flex: 1,
    marginHorizontal: wp(16),
  },
  title: {
    ...commonFontStyle(700, 32, '#FFFFFF99'),
    marginBottom: hp(15),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: wp(5),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  icon: {
    height: wp(24),
    width: wp(24),
    resizeMode: 'contain',
    marginRight: 5,
  },
  icon1: {
    height: wp(22),
    width: wp(22),
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
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
  privacyContainer: {
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 100,
    width: '100%',
  },
  button: {
    position: 'absolute',
    paddingHorizontal: wp(80),
    bottom: 24,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 14,
  },
  buttonText: {
    ...commonFontStyle(700, 18, colors.primary1),
  },
  photo: {
    backgroundColor: colors.primary,
    paddingVertical: hp(16),
    gap: wp(12),
  },
  file: {
    borderColor: colors.black,
    paddingVertical: hp(12),
  },
  Fieltitle: {
    ...commonFontStyle(700, 15, colors.black),
  },
  container: {
    gap: hp(16),
  },
  search: {
    marginVertical: hp(0),
  },
  bg: {
    flex: 1,
    height: hp(150),
    borderRadius: 20,
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(12),
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingBottom: hp(38),
    marginTop: hp(4),
  },
  time: {
    ...commonFontStyle(500, 14, colors.white),
  },
  arrow: {
    resizeMode: 'contain',
    width: wp(12),
    height: wp(12),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  Tripphoto: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
});
