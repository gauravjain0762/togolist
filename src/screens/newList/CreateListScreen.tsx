import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
// import {Loader} from '../../component'; // Still imported but commented out in usage
import {useGetDashboardQuery} from '../../api/dashboardApi';
import CustomBtn from '../../component/common/CustomBtn';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {useRoute} from '@react-navigation/native';

// Import for gestures and reanimated
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '../../theme/fonts'; // Assuming SCREEN_WIDTH is defined in your fonts.js or similar

// Define SCREEN_WIDTH if not already in fonts.js
// const SCREEN_WIDTH = Dimensions.get('window').width;


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

  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');

  // Reanimated shared values for translation
  const translateX = useSharedValue(0);
  const startTranslateX = useSharedValue(0); // To store translation at the start of a gesture

  const {data: dashBoardData, isLoading: dashboardLoading} =
    useGetDashboardQuery(
      {},
      {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
      },
    );

  const renderBg = useCallback((key: string) => {
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
  }, []); // useCallback to memoize the function itself

  const goToNextSlide = useCallback(() => {
    setActiveIndex(prev => {
      const nextIndex = Math.min(options.length - 1, prev + 1);
      return nextIndex;
    });
  }, []);

  const goToPrevSlide = useCallback(() => {
    setActiveIndex(prev => {
      const prevIndex = Math.max(0, prev - 1);
      return prevIndex;
    });
  }, []);

  // Use useEffect to reset translateX when activeIndex changes
  // This will slide the new content into view
  React.useEffect(() => {
    // When activeIndex changes, reset translateX to 0 with animation
    translateX.value = withTiming(0, { duration: 300 });
    // Also update activeOption based on activeIndex
    setActiveOption(options[activeIndex]);
  }, [activeIndex]);


  const slides = useMemo(() => {
    // We only need to render the current and potentially adjacent slides for smooth transition
    // For simplicity, we'll render only the active slide here,
    // and rely on translateX for the "swipe" effect
    const option = options[activeIndex];
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
        key={option} // Key important for React's reconciliation
        source={renderBg(option)}
        style={styles.imageContainer}>
        {isListType && (
          <>
            <TextInput
              placeholder={option === 'Bucket List' ? 'Trip Name' : 'List Name'}
              placeholderTextColor={'#FFFFFF99'}
              style={styles.title}
            />
            <TouchableOpacity
              style={[
                styles.inputBox,
                {width: '90%'},
              ]}>
              <Image source={IMAGES.camera} style={styles.icon} />
              <Text style={styles.placeholder}>Image</Text>
            </TouchableOpacity>
          </>
        )}

        {isTrip && (
          <>
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
    );
  }, [activeIndex, privacy, params?.bucketScreen, renderBg]); // Added renderBg to dependencies

  const slidesHeader = useCallback(() => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={option}
        onPress={() => setActiveIndex(index)} // Directly set activeIndex
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
  }, [activeIndex]);

  // Gesture handler for swiping
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startTranslateX.value = translateX.value; // Store current position
    })
    .onUpdate((event) => {
      // Calculate new position based on drag
      translateX.value = startTranslateX.value + event.translationX;
    })
    .onEnd((event) => {
      const THRESHOLD = SCREEN_WIDTH * 0.25; // Swipe threshold (25% of screen width)

      if (event.translationX < -THRESHOLD && activeIndex < options.length - 1) {
        // Swiped left (to go to next slide)
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(goToNextSlide)(); // Update activeIndex on JS thread
          // translateX will be reset by useEffect
        });
      } else if (event.translationX > THRESHOLD && activeIndex > 0) {
        // Swiped right (to go to previous slide)
        translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(goToPrevSlide)(); // Update activeIndex on JS thread
          // translateX will be reset by useEffect
        });
      } else {
        // Not enough swipe, snap back to original position
        translateX.value = withSpring(0);
      }
    });

  // Animated style for the content container
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer, styles.containor]}>
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

      {/* Implement GestureDetector around the content that you want to swipe */}
      {/* Make sure this GestureDetector wraps the Animated.View that will move */}
      {params?.bucketScreen ? (
        // For bucketScreen, still render the "Bucket List" slide directly without swipe
        slides[options.indexOf('Bucket List')]
      ) : (
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.animatedContentWrapper, animatedStyles]}>
            {slides[activeIndex]}
          </Animated.View>
        </GestureDetector>
      )}
    </SafeAreaView>
  );
};

export default CreateListScreen;

const styles = StyleSheet.create({
  headerView: {
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
    flex: 1, // Ensure container takes full height to allow flexible content
  },
  header: {
    paddingHorizontal: wp(8),
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
  // New style for the wrapper around the swiped content
  animatedContentWrapper: {
    flex: 1, // This is crucial so the Animated.View takes the full space for the slide
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    marginTop: 20,
    flex: 1,
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
    marginBottom: Platform.OS== 'ios' ?  10 : 0,
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
});