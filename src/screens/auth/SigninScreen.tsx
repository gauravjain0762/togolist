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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CustomBtn from '../../component/common/CustomBtn';
import {CustomTextInput} from '../../component';
import {emailCheck, validatePassword} from '../../utils/commonFunction';

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

const SigninScreen = ({navigation}: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: __DEV__ ? 'test@gmail.com' : '',
    password: '',
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            stepIndex > 0 ? setStepIndex(stepIndex - 1) : navigation.goBack();
          }}>
          <Image source={IMAGES.back} style={{width: 10, height: 18}} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          {/* {steps.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i <= stepIndex ? styles.activeDot : null]}
            />
          ))} */}
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <View />
      </View>

      <ImageBackground
        source={IMAGES.bg} // replace with your actual image path
        style={styles.container}>
        {/* Title */}
        <View style={{position: 'absolute', top: 20}}>
          <Text style={styles.title}>{'Welcome Back!'}</Text>
        </View>
        {/* Input */}
        <View style={{top: showKeyboard ? -100 : 0}}>
          <CustomTextInput
            placeholder={'Username'}
            placeholderTextColor="#3C3C4399"
            errorMsg={emailErr}
            value={formData?.email}
            keyValue={steps[0]?.key}
            onChangeText={text => {
              setEmailErr('');
              setFormData({...formData, ['email']: text});
            }}
            keyboardType={'email-address'}
          />
          <View style={{height: 7}} />
          <CustomTextInput
            placeholder={'Password'}
            placeholderTextColor="#3C3C4399"
            errorMsg={emailErr}
            value={formData?.password}
            keyValue={steps[0]?.key}
            onChangeText={text => {
              text?.length !== '' && setEmailErr('');
              setPasswordChecks(validatePassword(text));
              setFormData({...formData, ['password']: text});
            }}
            // keyboardType={currentStep.keyboardType || 'default'}
            secureTextEntry={!passwordVisible}
            showToggle={true}
            isSecureVisible={!passwordVisible}
            onToggleSecure={() => setPasswordVisible(!passwordVisible)}
          />
        </View>

        <CustomBtn
          style={styles.button}
          onPress={() => {
            handleNext();
          }}
          title={'Next'}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.84,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    // padding:hp(24)
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
});

export default SigninScreen;
