import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import CustomBtn from '../../component/common/CustomBtn';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

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
  const [activeOption, setActiveOption] = useState('List');
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

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer, styles.containor]}>
      <Loader visible={dashboardLoading} />

      <View style={styles.header}>
        <Text style={styles.heading}>{'Create New'}</Text>

        <View style={styles.optionsWrapper}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setActiveOption(option)}
              style={[
                styles.optionItem,
                activeOption === option && styles.activeOption,
              ]}>
              <Text
                style={[
                  styles.optionText,
                  activeOption === option && styles.activeOptionText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ImageBackground
        source={renderBg(activeOption)}
        style={styles.imageContainer}>
        {(activeOption == 'List' || activeOption == 'Bucket List') && (
          <>
            <Text style={styles.title}>List Name</Text>
            <TouchableOpacity style={styles.inputBox}>
              <Image source={IMAGES.camera} style={styles.icon} />
              <Text style={styles.placeholder}>Image</Text>
            </TouchableOpacity>
          </>
        )}
        {activeOption == 'Trip' && (
          <>
            <Text style={styles.title}>Destination</Text>

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
        {activeOption == 'Event' && (
          <>
            <Text style={styles.title}>Event Name</Text>
            <TouchableOpacity style={[styles.inputBox, {marginBottom: 10}]}>
              <Image source={IMAGES.location} style={styles.icon} />
              <Text style={styles.placeholder}>Location</Text>
            </TouchableOpacity>
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

        {(activeOption == 'Itinerary' ||
          activeOption == 'Experience' ||
          activeOption == 'Request a Host') && (
          <>
            <View style={styles.content}>
              <Text style={styles.comingSoon}>Coming Soon...</Text>
              <Text style={styles.title1}>Monetize Your Account</Text>
              <Text style={styles.subtitle}>
                Create experiences & trip itineraries for account monetization
                opportunities
              </Text>

              <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText1}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeOption == 'Itinerary' ||
        activeOption == 'Experience' ||
        activeOption == 'Request a Host' ? null : (
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
        )}
        {activeOption == 'Itinerary' ||
        activeOption == 'Experience' ||
        activeOption == 'Request a Host' ? null : (
          <CustomBtn
            style={styles.button}
            onPress={() => {
              navigateTo(SCREENS.PlaceDetails);
            }}
            buttonText={styles.buttonText}
            title={'Next'}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateListScreen;

const styles = StyleSheet.create({
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
    marginBottom: hp(18),
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
    marginBottom: 10,
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
    ...commonFontStyle(500, 16, '#555'),
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
});
