import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Keyboard,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CustomBtn from '../../component/common/CustomBtn';
import {CustomTextInput} from '../../component';
import {
  emailCheck,
  navigateTo,
  validatePassword,
} from '../../utils/commonFunction';
import LocationSearch from '../../component/common/LocationSearch';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import {SCREENS} from '../../navigation/screenNames';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const steps = [
  {
    title: 'Email',
    placeholder: 'Email address',
    key: 'email',
    keyboardType: 'email-address',
  },
  {
    title: 'Create a Password',
    placeholder: 'Password',
    key: 'password',
    secure: true,
  },
  {title: 'Your Name', placeholder: 'Your Name', key: 'name'},
  {title: 'Username', placeholder: 'Username', key: 'username'},
  {title: 'Location Settings', placeholder: 'Location', key: 'location'},
  {
    title: 'Enable permissions',
    placeholder: 'Enable permissions',
    key: 'Enable permissions',
  },
];

const permissions = [
  {
    id: 'photos',
    title: 'Photos',
    description: 'Let us organize your memories and map your past adventures!',
    icon: IMAGES.photo, // Replace with your image asset
  },
  {
    id: 'foodie',
    title: 'Foodie',
    description: 'Sync your calendar to plan trips and stay organized',
    icon: IMAGES.calnder, // Replace with your image asset
  },
  {
    id: 'maps',
    title: 'Google Maps',
    description: 'Import saved places and lists from Google Maps to start',
    icon: IMAGES.map, // Replace with your image asset
  },
];

const SignupScreen = ({navigation}: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: __DEV__ ? 'test@gmail.com' : '',
    password: __DEV__ ? 'Test@123' : '',
    name: '',
    username: '',
    location: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selected, setSelected] = useState<'public' | 'private'>('public');

  const [emailErr, setEmailErr] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    uppercase: false,
    specialChar: false,
  });

  const currentStep = steps[stepIndex];

  const [selected1, setSelected1] = useState<string[]>([]);

  console.log('====================================');
  console.log('selected1', selected1?.length);
  console.log('====================================');
  const toggleSelect = (id: string) => {
    setSelected1(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('⌨️ Keyboard is open');
      setShowKeyboard(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('⌨️ Keyboard is closed');
      setShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleNext = () => {
    const value = formData[currentStep.key];

    // Validate email on the first step
    if (currentStep.key === 'email' && !emailCheck(value)) {
      setEmailErr('Incorrect email format');
      return;
    }
    if (currentStep.key === 'password') {
      const checks = validatePassword(formData.password);
      const valid = Object.values(checks).every(Boolean);
      if (!valid) {
        setEmailErr('Incorrect password format');
        return;
      }
    }

    setEmailErr(''); // Clear error if valid

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      console.log('Form complete', formData);
      // Submit or navigate here
    }
  };

  return (
    <SafeAreaView edges={['top']} style={AppStyles.flex}>
      {/* Header with back icon and progress bar */}
      <StatusBar
        barStyle={'dark-content'}
        animated
        backgroundColor={colors.white}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigation.goBack();
          }}>
          <Image source={IMAGES.back} style={{width: 10, height: 18}} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i <= stepIndex ? styles.activeDot : null]}
            />
          ))}
        </View>
        <View />
      </View>

        {currentStep.key == 'Enable permissions' ? (
          <View style={{marginHorizontal: 20, flex: 1}}>
            {/* Title */}
            <Text style={styles.title1}>
              Enable permissions and boost Togolist’s functionality
            </Text>
            <Text style={styles.subtitle}>
              Togolist works best with access to the following permissions
            </Text>

            {/* Permission Cards */}
            <FlatList
              data={permissions}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const isSelected = selected1.includes(item.id);
                return (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item.id)}
                    style={styles.card}>
                    <Image source={item.icon} style={styles.icon1} />
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDesc}>{item.description}</Text>
                    </View>
                    <View
                      style={[
                        styles.radio,
                        isSelected && styles.radioSelected,
                      ]}>
                      {isSelected && (
                        <Image
                          source={IMAGES.check1}
                          style={{width: 11, height: 9, resizeMode: 'contain'}}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <CustomBtn
              style={styles.button2}
              onPress={() => {
                navigateTo(SCREENS.VerifyAccountScreen);
              }}
              title={selected1?.length !== 3 ? 'Next' : 'Finish sign up'}
            />
          </View>
        ) : (
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>

          <ImageBackground
            source={IMAGES.bg} // replace with your actual image path
            style={styles.container}>
            {/* Title */}
            <View style={{position: 'absolute', top: 20}}>
              <Text style={styles.title}>{currentStep.title}</Text>
              {currentStep.key === 'password' && (
                <View style={{marginLeft: 24, marginBottom: 10}}>
                  <Text style={styles.checkTitle}>
                    Please include Each of the Following
                  </Text>
                  <Text style={styles.checkItem}>
                    {passwordChecks.length ? '✅' : '◽'} Eight characters
                  </Text>
                  <Text style={styles.checkItem}>
                    {passwordChecks.number ? '✅' : '◽'} One number
                  </Text>
                  <Text style={styles.checkItem}>
                    {passwordChecks.uppercase ? '✅' : '◽'} One uppercase
                    letter
                  </Text>
                  <Text style={styles.checkItem}>
                    {passwordChecks.specialChar ? '✅' : '◽'} One special
                    character
                  </Text>
                </View>
              )}
            </View>
            {/* Input */}
            <View style={{top: showKeyboard ? -100 : 0}}>
              {currentStep.key == 'location' ? (
                <LocationSearch
                  value={formData?.location}
                  onChangeText={text => {
                    setFormData({...formData, ['location']: text});
                  }}
                />
              ) : (
                <CustomTextInput
                  placeholder={currentStep.placeholder}
                  placeholderTextColor="#3C3C4399"
                  errorMsg={emailErr}
                  value={formData[currentStep.key]}
                  keyValue={currentStep.key}
                  onChangeText={text => {
                    if (currentStep.key == 'email') {
                      setEmailErr('');
                    } else if (currentStep.key == 'password') {
                      text?.length !== '' && setEmailErr('');
                      setPasswordChecks(validatePassword(text));
                    }
                    setFormData({...formData, [currentStep.key]: text});
                  }}
                  keyboardType={currentStep.keyboardType || 'default'}
                  secureTextEntry={!passwordVisible}
                  showToggle={currentStep.key == 'password' ? true : false}
                  isSecureVisible={!passwordVisible}
                  onToggleSecure={() => setPasswordVisible(!passwordVisible)}
                />
              )}
            </View>

            {currentStep.key == 'location' && (
              <View style={styles.container1}>
                {/* Public Option */}
                <RenderPrivacyOption
                  type="public"
                  selected={selected}
                  setSelected={setSelected}
                />

                <View style={{height: 16}} />
                <RenderPrivacyOption
                  type="private"
                  selected={selected}
                  setSelected={setSelected}
                />
              </View>
            )}
            <CustomBtn
              style={styles.button}
              onPress={() => {
                handleNext();
              }}
              title={'Next'}
            />
          </ImageBackground>
      </KeyboardAwareScrollView>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.84,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: hp(26),
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 43.8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#999',
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  title: {
    marginLeft: 20,
    marginBottom: 10,
    ...commonFontStyle(700, 32, colors.white),
  },
  button: {
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 24,
    left: 0,
    right: 0,
  },
  checkTitle: {
    marginBottom: 9,
    ...commonFontStyle(500, 13, colors.white),
  },
  checkItem: {
    ...commonFontStyle(500, 13, colors.white),
    marginBottom: 6,
  },
  textStyle: {
    ...commonFontStyle(600, 16, colors.white),
    // flex:1
  },

  locationView: {
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 100,
  },

  container1: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 100,
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    marginLeft: 8,
    flex: 1,
    ...commonFontStyle(600, 16, colors.white),
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },

  title1: {
    marginBottom: 10,
    ...commonFontStyle(700, 36, colors.black),
  },
  subtitle: {
    marginBottom: 20,
    ...commonFontStyle(400, 18, '#5A5757'),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 22,
  },
  icon1: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...commonFontStyle(700, 18, colors.black),
  },
  cardDesc: {
    marginTop: 2,
    ...commonFontStyle(400, 16, '#444444'),
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#999',
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#D62828',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  radioSelected: {
    backgroundColor: '#D62828',
    borderWidth: 0,
  },
  innerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D62828',
  },
  button2: {
    position: 'absolute',
    paddingHorizontal: 0,
    bottom: 30,
    left: 0,
    right: 0,
    marginHorizontal: 0,
  },
});

export default SignupScreen;
