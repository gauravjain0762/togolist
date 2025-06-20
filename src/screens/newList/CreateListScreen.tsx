import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, SCREEN_HEIGHT, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import CustomBtn from '../../component/common/CustomBtn';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const options = [
  'List',
  'Trip',
  'Bucket List',
  'Event',
  'Itinerary',
  'Experience',
  'Request a Host',
];

const CreateListScreen = () => {
  const {params} = useRoute();

  const [activeIndex, setActiveIndex] = useState(
    params?.bucketScreen ? options.indexOf('Bucket List') : 0,
  );
  const [activeOption, setActiveOption] = useState(
    params?.bucketScreen ? 'Bucket List' : 'List',
  );

  const swiperRef = useRef(null);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  const {data: dashBoardData, isLoading: dashboardLoading} =
    useGetDashboardQuery(
      {},
      {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
      },
    );

  const renderBg = (key: string) => {
    switch (key) {
      case 'List':
        return IMAGES.list_bg;
      case 'Trip':
        return IMAGES.trip_bg;
      case 'Bucket List':
        return IMAGES.bucketList_bg;
      case 'Event':
        return IMAGES.event_bg;
      case 'Itinerary':
        return IMAGES.Itinerary_bg;
      case 'Experience':
        return IMAGES.experience_bg;
      case 'Request a Host':
        return IMAGES.requestHost_bg;
      default:
        return IMAGES.list_bg;
    }
  };

  const handleIndexChanged = useCallback(
    i => {
      setActiveIndex(i);
      setActiveOption(options[i]);
    },
    [activeIndex], // Removed activeIndex from dependency array as it's set here
  );

  const slides = useMemo(() => {
    return options.map((option, index) => {
      const isListType = ['List', 'Bucket List'].includes(option);
      const isTrip = option === 'Trip';
      const isEvent = option === 'Event';
      const showNextButton = ![
        'Itinerary',
        'Experience',
        'Request a Host',
      ].includes(option);

      return (
        // <View key={index} style={{width: "100%", alignSelf: 'center'}}>
        <ImageBackground
          key={option}
          source={renderBg(option)}
          style={styles.imageContainer}>
          {isListType && (
            <>
              {/* <Text style={styles.title}>
                {''}
              </Text> */}
              <TextInput
                placeholder="List Name"
                placeholderTextColor={'#FFFFFF99'}
                style={styles.title}
              />
              <TouchableOpacity
                style={[
                  styles.inputBox,
                  {width: params?.bucketScreen ? '24%' : '90%'},
                ]}>
                <Image source={IMAGES.camera} style={styles.icon} />
                <Text style={styles.placeholder}>Image</Text>
              </TouchableOpacity>
            </>
          )}

          {isTrip && (
            <>
              {/* <Text style={styles.title}>Destination</Text> */}
              <TextInput
                placeholder="Destination"
                placeholderTextColor={'#FFFFFF99'}
                style={styles.title}
              />
              <View style={styles.row}>
                <TouchableOpacity style={styles.card1}>
                  <Image source={IMAGES.canlder} style={styles.icon1} />
                  <Text style={styles.cardText}>Trip Dates</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                  <Image source={IMAGES.camera} style={styles.icon} />
                  <Text style={styles.cardText}>Image</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {isEvent && (
            <>
              {/* <Text style={styles.title}>Event Name</Text> */}
              <TextInput
                placeholder="Event Name"
                placeholderTextColor={'#FFFFFF99'}
                style={styles.title}
              />
              <TouchableOpacity style={[styles.inputBox, {marginBottom: 10}]}>
                <Image source={IMAGES.location} style={styles.icon} />
                <Text style={styles.placeholder}>Location</Text>
              </TouchableOpacity>
              <View style={styles.row}>
                <TouchableOpacity style={styles.card1}>
                  <Image source={IMAGES.canlder} style={styles.icon1} />
                  <Text style={styles.cardText}>Event Dates</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                  <Image source={IMAGES.camera} style={styles.icon} />
                  <Text style={styles.cardText}>Image</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {!isListType && !isTrip && !isEvent && (
            <View style={styles.content}>
              <Text style={styles.comingSoon}>Coming Soon...</Text>
              <Text style={styles.title1}>Monetize Your Account</Text>
              <Text style={styles.subtitle}>
                Create experiences & trip itineraries for account monetization
                opportunities
              </Text>
              <TouchableOpacity
                onPress={() => navigateTo(SCREENS.Experience)}
                style={styles.button1}>
                <Text style={styles.buttonText1}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )}

          {showNextButton && (
            <>
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
                onPress={() => {
                  option === 'Bucket List'
                    ? navigateTo(SCREENS.BucketListDetails)
                    : navigateTo(SCREENS.PlaceDetails);
                }}
                buttonText={styles.buttonText}
                title={'Next'}
              />
            </>
          )}
        </ImageBackground>
        // </View>
      );
    });
  }, [privacy]); // Added privacy to dependency array

  const slidesHeader = useCallback(() => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={option}
        onPress={() => {
          const diff = index - activeIndex;
          if (diff !== 0) {
            swiperRef?.current?.scrollBy(diff, true);
          }
          // Removed setActiveIndex and setActiveOption from here.
          // These will be updated by handleIndexChanged once swiper scrolls.
        }}
        style={[
          styles.optionItem,
          activeIndex === index && styles.activeOption,
        ]}>
        <Text
          style={[
            styles.optionText,
            activeIndex === index && styles.activeOptionText,
          ]}>
          {option}
        </Text>
      </TouchableOpacity>
    ));
  }, [activeIndex]); // Keep activeIndex in dependency array

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer, styles.containor]}>
      {/* <Loader visible={dashboardLoading} /> */}
      {params?.bucketScreen ? (
        <View style={styles.headerView}>
          <Text style={styles.heading1}>{'Bucket List'}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.heading}>{'Create New'}</Text>
          <View style={styles.optionsWrapper}>{slidesHeader()}</View>
        </View>
      )}

      {params?.bucketScreen ? (
        <>
          {['Bucket List'].map((option, index) => {
            const isListType = ['List', 'Bucket List'].includes(option);
            const isTrip = option === 'Trip';
            const isEvent = option === 'Event';
            const showNextButton = ![
              'Itinerary',
              'Experience',
              'Request a Host',
            ].includes(option);

            return (
              <ImageBackground
                key={option}
                source={renderBg(option)}
                style={styles.imageContainer}>
                {isListType && (
                  <>
                    {/* <Text style={styles.title}>
                      {params?.bucketScreen ? 'Trip Name' : 'List Name'}
                    </Text> */}
                    <TextInput
                      placeholder="Trip Name"
                      placeholderTextColor={'#FFFFFF99'}
                      style={styles.title}
                    />
                    <TouchableOpacity
                      style={[
                        styles.inputBox,
                        {width: params?.bucketScreen ? '24%' : '90%'},
                      ]}>
                      <Image source={IMAGES.camera} style={styles.icon} />
                      <Text style={styles.placeholder}>Image</Text>
                    </TouchableOpacity>
                  </>
                )}

                {showNextButton && (
                  <>
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
                      onPress={() => {
                        option === 'Bucket List'
                          ? navigateTo(SCREENS.BucketListDetails)
                          : navigateTo(SCREENS.PlaceDetails);
                      }}
                      buttonText={styles.buttonText}
                      title={'Next'}
                    />
                  </>
                )}
              </ImageBackground>
            );
          })}
        </>
      ) : (
        // <Swiper
        //   ref={swiperRef}
        //   index={activeIndex} // Initialize Swiper with the correct index
        //   onIndexChanged={handleIndexChanged}
        //   loop={false}
        //   // containerStyle={{paddingHorizontal: }}
        //   showsPagination={false}>
        //   {slides}
        // </Swiper>
        <Swiper
          ref={swiperRef}
          onIndexChanged={handleIndexChanged}
          paginationStyle={styles.paginationStyle}
          showsPagination={false}
          style={styles.wrapper}>
          {slides}
        </Swiper>
      )}
    </SafeAreaView>
  );
};

export default CreateListScreen;

const styles = StyleSheet.create({
   wrapper: {},
  headerView: {
    // marginHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading1: {
    marginVertical: 10,
    ...commonFontStyle(700, 34, colors.black),
    flex: 1,
  },
  moreIcon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },

  containor: {
    paddingHorizontal: wp(16),
  },
  heading: {
    marginVertical: 10,
    ...commonFontStyle(600, 20, colors.black),
  },
  optionsWrapper: {
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  activeOption: {
    backgroundColor: colors.primary1,
  },
  activeOptionText: {
    color: colors.white,
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    marginTop: 20,
    flex: 1,
    // marginBottom: hp(18),
    // width:"100%"
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 24,
    backgroundColor: colors.white,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    ...commonFontStyle(700, 18, colors.primary1),
  },

  privacyContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 100,
    width: '100%',
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
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '90%',
    height: 56,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    marginHorizontal: 20,
  },

  title: {
    ...commonFontStyle(700, 32, '#FFFFFF99'),
    marginBottom: Platform.OS == 'ios' ? 10 : 0,
    textAlign: 'center',
  },
  placeholder: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
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
  card: {
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
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },

  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  comingSoon: {
    ...commonFontStyle(700, 36, colors.white),
    marginBottom: 10,
  },
  title1: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button1: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
    width: 88,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    ...commonFontStyle(600, 12, colors.black),
  },
  header: {
    paddingHorizontal: wp(8),
  },

   paginationStyle: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      left: wp(SCREEN_WIDTH / 2 - 64),
      right: wp(SCREEN_WIDTH / 2 - 64),
      paddingVertical: hp(6),
      borderRadius: 100,
      bottom: hp(30),
      // alignSelf: 'center',
    },
});
