import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {
  Button,
  Checklist,
  CommonSheet,
  CustomHeader,
  LinearView,
  SearchBar,
} from '../../component';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import CustomBtn from '../../component/common/CustomBtn';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TogolistPro from '../../component/common/TogolistPro';
import CategoryCard from '../../component/trip/CategoryCard';
import {useRoute} from '@react-navigation/native';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';

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

const reference = [
  {
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    platform: 'Instagram',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    platform: 'TikTok',
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
  const [upload, setUpload] = useState(false);
  const [references, setReferences] = useState(false);

  const SocialCard = useCallback(
    item => {
      return (
        <ImageBackground
          resizeMode="cover"
          style={styles.socialImg}
          imageStyle={{borderRadius: 25}}
          source={IMAGES.bg}>
          <Text style={styles.platform}>{item?.platform}</Text>
          <Text style={styles.post}>{'Post by @emily '}</Text>
        </ImageBackground>
      );
    },
    [reference],
  );

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
          contentContainerStyle={[AppStyles.P16, {gap: hp(8)}]}>
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
          <LinearView>
            <Text style={styles.headerTitle}>{'People'}</Text>
            <View style={[styles.row, styles.people]}>
              {[1, 3].map((user, index) => (
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                  }}
                  style={[
                    styles.avatar,
                    {marginLeft: index === 0 ? 20 : -10, zIndex: 1},
                  ]}
                />
              ))}
              <TouchableOpacity
                onPress={() => {
                  // navigateTo(SCREENS.CollaboratorsScreen);
                }}>
                <Image source={IMAGES.addIcon} style={[styles.avatar1]} />
              </TouchableOpacity>
            </View>
          </LinearView>
          <LinearView containerStyle={styles.ItineraryCard}>
            <View style={styles.Itineraryheader}>
              <Text style={styles.Itinerarytitle}>Itinerary</Text>
              <Image source={IMAGES.edit_icon} style={styles.edit} />
            </View>

            {/* Day List */}
            {['Day 01', 'Day 02', 'Day 03'].map((day, index) => (
              <View key={index}>
                <TouchableOpacity style={styles.dayRow}>
                  <View style={styles.daterow}>
                    <Text style={styles.dayText}>{day}</Text>
                    <Image
                      source={IMAGES.rightArrow}
                      style={{
                        width: wp(24),
                        height: wp(24),
                        tintColor: colors.black,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
              </View>
            ))}

            {/* Add Day Button */}
            {/* <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>＋ Add Day</Text>
            </TouchableOpacity> */}
            <Button
              title="Add Day"
              leftImg={IMAGES.add_location}
              BtnStyle={styles.addButton}
              leftImgStyle={styles.addImg}
              type="outline"
            />
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'Notes'}</Text>
            <View style={[styles.infoContainor]}>
              <TextInput
                style={styles.label}
                placeholder="Trip planning and goals of the trip..."
                placeholderTextColor={'#787878'}
              />
            </View>
            <TouchableOpacity
              onPress={() => handlePresentModalPress()}
              style={styles.postbtn}>
              <Text style={styles.btntxt}>{'Post'}</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.horizontal_divider,
                {marginTop: 0, marginHorizontal: 10},
              ]}
            />
            <View style={styles.container1}>
              {/* Top: Avatar + Name */}
              <View style={styles.userheader}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/women/75.jpg',
                  }}
                  style={styles.avatar2}
                />
                <Text style={styles.username}>Emily</Text>
              </View>

              {/* Comment text */}
              <Text style={styles.commentText}>
                What is everyone’s preference for area for our accommodation?
              </Text>

              {/* Footer: Comment count + View all */}
              <TouchableOpacity style={styles.footer}>
                <Image
                  source={IMAGES.message_icon}
                  style={styles.message_icon}
                />
                <Text style={styles.commentCount}>10</Text>
                <Text style={styles.viewAll}>View all comments</Text>
              </TouchableOpacity>
            </View>
          </LinearView>
          <LinearView>
            <View style={styles.photoContainor}>
              <Text style={styles.todoTitle}>{'To Do List'}</Text>
            </View>
            <View>
              <Checklist
                data={[
                  {
                    id: '1',
                    label: 'Things to do for the trip...',
                    checked: false,
                  },
                ]}
              />
            </View>
          </LinearView>
          <LinearView>
            <View style={styles.photoContainor}>
              <View style={styles.uploadRow}>
                <Text style={styles.uploadTitle}>{'Uploads'}</Text>
                <Image source={IMAGES.info} style={styles.infoIcon} />
              </View>
              <TouchableOpacity onPress={() => setUpload(!upload)}>
                <Image source={IMAGES.add_icon} style={styles.addicon} />
              </TouchableOpacity>
            </View>
            {upload ? (
              <FlatList
                data={[1, 2, 3, 4]}
                numColumns={2}
                contentContainerStyle={{gap: wp(15), padding: wp(20)}}
                columnWrapperStyle={{
                  gap: wp(15),
                  justifyContent: 'space-between',
                }}
                renderItem={({item, index}) => (
                  <Image source={IMAGES.bg1} style={styles.upload} />
                )}
              />
            ) : (
              <Text style={styles.description}>
                {'Photos, flight & hotel info & other docs...'}
              </Text>
            )}
          </LinearView>
          <LinearView containerStyle={[styles.Budgatecard]}>
            <View style={[styles.budgaterow, {marginBottom: hp(18)}]}>
              <View style={styles.uploadRow}>
                <Text style={styles.Budgettitle}>Budget</Text>
                <Image source={IMAGES.info} style={styles.infoIcon} />
              </View>
              <Image source={IMAGES.edit_icon} style={styles.edit} />
            </View>
            {[
              ['Flights', '$0'],
              ['Hotel', '$0'],
              ['Food', '$0'],
              ['Tickets', '$0'],
              ['Total', '$0'],
            ].map(([label, value], i) => (
              <>
                {i === 4 && (
                  <View style={[styles.devider, {marginVertical: hp(4)}]} />
                )}
                <View style={styles.achievementRow} key={i}>
                  <Text
                    style={[
                      styles.achievementLabel,
                      i === 4 && styles.totalLabel,
                    ]}>
                    {label}
                  </Text>
                  <Text
                    style={[
                      styles.achievementValue,
                      i === 4 && styles.totalValue,
                    ]}>
                    {value}
                  </Text>
                </View>
              </>
            ))}
          </LinearView>
          <LinearView containerStyle={styles.photos}>
            <HeaderTextIcon
              headerStyle={styles.phototitle}
              title={'References'}
              showAddIcon={true}
              showDown={false}
              titleStyle={commonFontStyle(700, 24, colors._1B1515)}
              onAddPress={() => setReferences(!references)}
            />
            {references ? (
              <FlatList
                data={reference}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  gap: wp(15),
                }}
                style={{marginTop: hp(16)}}
                renderItem={({item}) => <SocialCard {...item} />}
              />
            ) : (
              <Text
                style={[styles.description, {padding: 0, paddingTop: hp(16)}]}>
                Save reference links to relevant social media posts, blogs &
                more...
              </Text>
            )}
          </LinearView>
          <LinearView containerStyle={styles.rainRow}>
            <Text>{'Need a rain check?'}</Text>
            <Button
              title="Convert to Bucket List"
              BtnStyle={styles.bucketBtn}
              titleStyle={{...commonFontStyle(600, 12, colors.white)}}
            />
          </LinearView>
          <LinearView containerStyle={styles.notificationRow}>
            <Text style={styles.notificationtitle}>
              {'Turn on trip notifications '}
            </Text>
            <TouchableOpacity>
              <Image source={IMAGES.bell} style={styles.notification} />
            </TouchableOpacity>
          </LinearView>
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
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
  },
  avatar: {
    width: wp(48),
    height: wp(48),
    borderRadius: 48,
  },
  avatar1: {
    width: wp(48),
    height: wp(48),
    borderRadius: 48,
    borderWidth: 2,
    left: wp(-20),
  },
  people: {
    alignSelf: 'flex-start',
    paddingBottom: hp(18),
  },
  infoContainor: {
    paddingHorizontal: wp(20),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  postbtn: {
    backgroundColor: colors._AE1927,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: wp(20),
    marginBottom: hp(18),
    marginTop: hp(6),
  },
  btntxt: {
    ...commonFontStyle(600, 12, colors.white),
    paddingHorizontal: wp(22),
    paddingVertical: hp(8),
  },
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(12),
  },
  container1: {
    // padding: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 12,
    // margin: 16,
  },
  avatar2: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 5,
  },
  username: {
    ...commonFontStyle(500, 13, '#444444'),
  },
  commentText: {
    ...commonFontStyle(400, 16, '#444444'),
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginLeft: 6,
    marginRight: 8,
    ...commonFontStyle(500, 16, '#444444'),
  },
  viewAll: {
    ...commonFontStyle(500, 16, '#444444'),
  },
  message_icon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  userheader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  photoContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(20),
    paddingHorizontal: wp(20),
  },
  todoTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  ItineraryTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  ItineraryContainor: {
    paddingHorizontal: wp(16),
  },
  ItineraryCard: {
    padding: wp(20),
    margin: wp(10),
  },
  Itineraryheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Itinerarytitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(16),
    marginTop: hp(16),
  },
  dayText: {
    ...commonFontStyle(700, 20, colors.black),
  },
  addText: {
    ...commonFontStyle(500, 16, colors._99999),
  },
  separator: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(2),
  },
  addButtonText: {
    ...commonFontStyle(600, 14, colors.primary),
  },
  addButton: {
    paddingVertical: hp(15),
    marginTop: hp(16),
    gap: wp(12),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  addImg: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  daterow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  edit: {
    width: wp(21),
    height: wp(21),
    resizeMode: 'contain',
  },
  infoIcon: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
    top: -5,
    left: 6,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  description: {
    ...commonFontStyle(400, 16, colors._444444),
    padding: wp(20),
  },
  upload: {
    flex: 1,
    height: hp(150),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  devider: {
    height: hp(0.5),
    backgroundColor: '#3C3C4399',
    flex: 1,
  },
  achievementLabel: {...commonFontStyle(500, 16, colors._444444)},
  achievementValue: {...commonFontStyle(400, 16, colors._444444)},
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
    // marginTop: hp(12),
  },
  totalLabel: {...commonFontStyle(600, 13, colors.primary)},
  totalValue: {...commonFontStyle(400, 16, colors._444444)},
  Budgatecard: {
    marginHorizontal: wp(16),
    borderRadius: wp(12),
    padding: wp(16),
    justifyContent: 'center',
  },
  budgaterow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Budgettitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  photos: {
    padding: wp(20),
  },
  phototitle: {
    marginTop: 0,
  },
  socialImg: {
    height: hp(181),
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: hp(12),
  },
  platform: {
    ...commonFontStyle(600, 11, colors.white),
  },
  post: {
    ...commonFontStyle(500, 10, colors.white),
  },
  bucketBtn: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  rainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(10),
    paddingHorizontal: wp(18),
  },
  notification: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
  notificationtitle: {
    ...commonFontStyle(400, 16, colors._444444),
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(18),
    paddingVertical: hp(10),
  },
});
