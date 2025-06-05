import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {
  ActionSheet,
  CustomDropdown,
  CustomTextInput,
  Loader,
} from '../../component';
import EditPicture from '../../component/common/EditPicture';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle} from '../../theme/fonts';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import {
  emailCheck,
  errorToast,
  resetNavigation,
  successToast,
} from '../../utils/commonFunction';
import {useAppDispatch} from '../../redux/hooks';
import {
  onUserEntityProfileInsert,
  onUserUserInfoInsert,
} from '../../redux/service/AuthServices';
import moment = require('moment');
import {requestLocationPermission} from '../../utils/locationHandler';
import {
  useEntityProfileInsertMutation,
  useUserInfoInsertMutation,
} from '../../api/authApi';

type Props = {};

const educationOptions = [
  {label: 'High School', value: 'high_school'},
  {label: 'Diploma', value: 'diploma'},
  {label: "Bachelor's Degree", value: 'bachelor'},
  {label: "Master's Degree", value: 'master'},
  {label: 'PhD', value: 'phd'},
];

const LoginScreen = (props: Props) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState(__DEV__ ? 'gaurav jain' : '');
  const [lastName, setLastName] = useState(__DEV__ ? 'jain' : '');
  const [phone, setPhone] = useState(__DEV__ ? '123456789' : '');
  const [email, setEmail] = useState(__DEV__ ? 'gaurav@gmail.com' : '');
  const [education, setEducation] = useState(__DEV__ ? 'diploma ' : '');
  const [experience, setExperience] = useState(__DEV__ ? '12' : '');
  const [area, setArea] = useState(__DEV__ ? '12 udaipur' : '');
  const [city, setCity] = useState(__DEV__ ? 'rajasthan' : '');
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [userInfoInsert, {isLoading: loginLoading}] =
    useUserInfoInsertMutation();
  const [entityProfileInsert, {isLoading: loginLoading1}] =
    useEntityProfileInsertMutation();

  useEffect(() => {
    onCurrentLocation();
  }, [isFocused]);

  const onCurrentLocation = async () => {
    // setLoader(true);
    await requestLocationPermission(
      position => {
        const data = {
          latitude: position.latitude,
          longitude: position.longitude,
        };
        setCurrentLocation(data);
      },
      error => {
        // setLoader(false);
      },
    );
  };

  const handleSubmit = async () => {
    if (firstName.trim() === '') {
      errorToast('Please enter first name');
    } else if (lastName.trim() === '') {
      errorToast('Please enter last name');
    } else if (phone.trim() === '') {
      errorToast('Please enter phone number');
    } else if (!emailCheck(email.trim())) {
      errorToast('Please enter a valid email address');
    } else if (education.trim() === '') {
      errorToast('Please select education');
    } else if (experience.trim() === '') {
      errorToast('Please enter experience');
    } else if (area.trim() === '') {
      errorToast('Please enter area');
    } else if (city.trim() === '') {
      errorToast('Please enter city');
    } else {
      setIsLoading(true);

      let date = moment().format('YYYY-MM-DD');
      let time = moment().format('hh:mm:ss');

      let data = {
        UserInfoID: '-1',
        SystemInfoID: '1',
        FullName: firstName,
        PhoneNumber: phone,
        Email: email,
        Password: 'Pass@123',
        IsActive: true,
        UserRole: 'ServiceProvider',
        ProfilePicture: 'alice.jpg',
        IPAddress: '10.0.0.1',
        DateAdded: `${date}T${time}`,
        DateModified: `${date}T${time}`,
        UpdatedByUser: 'admin',
      };

      const response = await userInfoInsert(data).unwrap();
      console.log('Login Response', response?.userInfoID);
      if (response?.userInfoID) {
        let data1 = {
          EntityProfileID: 0,
          UserInfoID: response?.userInfoID,
          Name: firstName,
          Sect: 'Public',
          Category: 'Education',
          Bio: 'Empowering education globally.',
          FoundedYear: 2015,
          AreaOfWorking: 'EdTech',
          City: city,
          State: 'Karnataka',
          Country: 'India',
          Latitude: currentLocation?.latitude,
          Longitude: currentLocation?.longitude,
          ContactNumber: phone,
          Email: email,
          Website: 'https://xyz.com',
          PhotoURL: 'xyz_logo.png',
          IsActive: true,
          DateAdded: new Date(),
          DateModified: new Date(),
          UpdatedByUser: 'admin',
        };

        const response1 = await entityProfileInsert(data1).unwrap();
        console.log('Login Response11', response1);
        if (response1) {
          successToast('Created Successfully');
          navigationRef.navigate(SCREENS.TripHome);
        } else {
          errorToast(response1?.message);
        }
      } else {
        errorToast(response?.message);
      }

      // let obj = {
      //   data: {
      //     UserInfoID: '-1',
      //     SystemInfoID: '1',
      //     FullName: firstName,
      //     PhoneNumber: phone,
      //     Email: email,
      //     Password: 'Pass@123',
      //     IsActive: true,
      //     UserRole: 'ServiceProvider',
      //     ProfilePicture: 'alice.jpg',
      //     IPAddress: '10.0.0.1',
      //     DateAdded: `${date}T${time}`,
      //     DateModified: `${date}T${time}`,
      //     UpdatedByUser: 'admin',
      //   },
      //   onSuccess: res => {

      //     let obj = {
      //       data: {
      //         EntityProfileID: 0,
      //         UserInfoID: res?.userInfoID,
      //         Name: firstName,
      //         Sect: 'Public',
      //         Category: 'Education',
      //         Bio: 'Empowering education globally.',
      //         FoundedYear: 2015,
      //         AreaOfWorking: 'EdTech',
      //         City: city,
      //         State: 'Karnataka',
      //         Country: 'India',
      //         Latitude: currentLocation?.latitude,
      //         Longitude: currentLocation?.longitude,
      //         ContactNumber: phone,
      //         Email: email,
      //         Website: 'https://xyz.com',
      //         PhotoURL: 'xyz_logo.png',
      //         IsActive: true,
      //         DateAdded: new Date(),
      //         DateModified: new Date(),
      //         UpdatedByUser: 'admin',
      //       },
      //       onSuccess: res => {
      //         setIsLoading(false);
      //         successToast("Created Successfully")
      //         navigationRef.navigate(SCREENS.TripHome);
      //       },
      //       onFailure: () => {
      //         setIsLoading(false);
      //       },
      //     };
      //     dispatch(onUserEntityProfileInsert(obj));
      //   },
      //   onFailure: () => {
      //     setIsLoading(false);
      //   },
      // };
      // dispatch(onUserUserInfoInsert(obj));
    }
  };

  return (
    <SafeAreaView style={[AppStyles.flex, AppStyles.side]}>
      <Loader visible={loginLoading || loginLoading1} />
      <Text style={styles.heading}>Register</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        {/* <View style={styles.avatarContainer}>
          <Image
            source={image ? image : IMAGES.user} // Your avatar image
            style={styles.avatar}
          />
          <TouchableOpacity onPress={()=>{
            
          }} style={styles.editIcon}>
            <Image source={IMAGES.pen} style={styles.penIcon} />
          </TouchableOpacity>
        </View> */}
        <EditPicture />

        <View style={styles.form}>
          <CustomTextInput
            label="First Name"
            required
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <CustomTextInput
            label="Last Name"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChangeText={setLastName}
          />
          <CustomTextInput
            label="Phone"
            placeholder="Enter Phone Number"
            required
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <CustomTextInput
            label="Email"
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomDropdown
            data={educationOptions}
            label="Education"
            placeholder={'Select Education'}
            value={education}
            container={{marginBottom: 15}}
            disable={false}
            onChange={selectedItem => {
              console.log('====================================');
              console.log('selectedItem', selectedItem);
              console.log('====================================');
              setEducation(selectedItem?.value);
            }}
          />
          <CustomTextInput
            label="Experience"
            placeholder="Enter Experience"
            required
            value={experience}
            onChangeText={setExperience}
          />
          <CustomTextInput
            label="Area or location"
            placeholder="Enter Area or location"
            required
            value={area}
            onChangeText={setArea}
          />
          <CustomTextInput
            label="City"
            placeholder="Enter City"
            required
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 50,
      backgroundColor: colors.white,
    },
    heading: {
      textAlign: 'center',
      marginVertical: 10,
      ...commonFontStyle(600, 22, colors.black),
    },
    avatarContainer: {
      alignSelf: 'center',
      marginVertical: 20,
      position: 'relative',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    penIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    editIcon: {
      position: 'absolute',
      right: -2,
      bottom: 3,
      backgroundColor: colors.white,
      padding: 6,
      borderRadius: 20,
    },
    form: {
      marginTop: 10,
    },
    submitButton: {
      backgroundColor: colors.mainColor,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    submitText: {
      ...commonFontStyle(600, 20, colors.white),
    },
  });
};
