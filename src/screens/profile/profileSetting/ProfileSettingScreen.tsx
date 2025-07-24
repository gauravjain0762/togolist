import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../../theme/appStyles';
import {CustomHeader, LinearView} from '../../../component';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {IMAGES} from '../../../assets/Images';
import EditPicture from '../../../component/common/EditPicture';
import ImagePickerModal from '../../../component/profile/ImagePickerModal';
import {navigateTo} from '../../../utils/commonFunction';
import {SCREENS} from '../../../navigation/screenNames';
import React, {useCallback, useEffect, useState} from 'react';
import Animated from 'react-native-reanimated';
import CustomTabBar from '../../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../../hook/useScrollHideAnimation';

type Props = {};
const options = [
  {id: 'subscription', label: 'Subscription', isPro: true},
  {id: 'personal_info', label: 'Personal Information'},
  {id: 'notifications', label: 'Notifications'},
  {id: 'billing', label: 'Billing'},
  {id: 'security_settings', label: 'Security & Settings'},
  {id: 'legal', label: 'Legal'},
  {id: 'help_feedback', label: 'Help and feedback'},
];

const ProfileSettingScreen = (props: Props) => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const [userEdit, setUserEdit] = useState(false);
  const [actionSheet, setActionSheet] = useState(false);

  const [useData, setUserData] = useState({
    name: 'Raymond Daily',
    useName: 'raydaily',
    location: 'Toronto, Canada',
  });

  const handlePress = useCallback((id: string) => {
    if (id == 'subscription') {
      navigateTo(SCREENS.SubscriptionScreen);
    } else if (id == 'personal_info') {
      navigateTo(SCREENS.PersonalInformation);
    } else if (id == 'notifications') {
      navigateTo(SCREENS.NotificationsSetting);
    } else if (id == 'billing') {
      navigateTo(SCREENS.BillingScreen);
    } else if (id == 'security_settings') {
      navigateTo(SCREENS.SecurityScreen);
    } else if (id == 'legal') {
      navigateTo(SCREENS.SubscriptionScreenSetting);
    } else if (id == 'help_feedback') {
      // navigateTo(SCREENS.BillingScreen);
    } else {
      // navigateTo(SCREENS.PersonalInformation);
    }
    console.log(`Pressed: ${id}`);
    // Navigate or trigger logic based on `id`
  }, []);

  const ProfileView = () => {
    return (
      <View style={styles.userCardView}>
        <Image source={IMAGES.Avatar_icon} style={styles.userIcon} />
        <View style={{gap: 8}}>
          <Text style={styles.userName}>Raymond Daily</Text>
          <Text style={styles.userName1}>@raydaily</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={IMAGES.locationWhite} style={styles.locationIcon} />
            <Text style={styles.userName2}> Toronto, Canada</Text>
          </View>
        </View>
      </View>
    );
  };

  const ProfileEditView = () => {
    return (
      <View style={[{marginTop: 10}]}>
        <View style={[AppStyles.Hcenter]}>
          <Image source={IMAGES.Avatar_icon} style={[styles.userIcon]} />
          <TouchableOpacity
            onPress={() => {
              setActionSheet(true);
            }}>
            <Text style={styles.uploadText}>Upload New</Text>
          </TouchableOpacity>
        </View>
        <View style={[AppStyles.row, {marginTop: 10}]}>
          <Text style={styles.inputName}>Name</Text>
          <TextInput
            placeholder="Enter Name"
            style={styles.textInput}
            value={useData?.name}
            onChangeText={text => {
              setUserData({...useData, name: text});
            }}
          />
        </View>

        <View style={[AppStyles.row, {marginTop: 10}]}>
          <Text style={styles.inputName}>Username</Text>
          <TextInput
            placeholder="Enter Name"
            style={styles.textInput}
            value={useData?.useName}
            onChangeText={text => {
              setUserData({...useData, name: text});
            }}
          />
        </View>
        <View style={[AppStyles.row, {marginTop: 10}]}>
          <Text style={styles.inputName}>Location</Text>
          <TextInput
            placeholder="Enter Name"
            style={styles.textInput}
            value={useData?.location}
            onChangeText={text => {
              setUserData({...useData, name: text});
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        showBack={true}
        title="Profile"
        showSearch={false}
        showMore={false}
      />

      <View style={styles.searchContainer}>
        <Image source={IMAGES.search} style={styles.searchIcon} />
        <TextInput
          placeholder="Search Profile"
          placeholderTextColor={colors.gray}
          style={styles.searchInput}
        />
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        style={{marginHorizontal: 16, flex: 1,}}>
        <View key={userEdit ? 'edit' : 'view'}>
          {userEdit ? (
            <LinearView>
              <View style={styles.cardView}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{flex: 1}}>
                    <Text style={styles.profileText}>Profile</Text>
                  </TouchableOpacity>
                  <View style={[AppStyles.row, {gap: 16}]}>
                    <TouchableOpacity onPress={() => setUserEdit(false)}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setUserEdit(false)}>
                      <Text style={styles.cancelText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <ProfileEditView />
              </View>
            </LinearView>
          ) : (
            <LinearView>
              <View style={styles.cardView}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{flex: 1}}>
                    <Text style={styles.profileText}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setUserEdit(true)}>
                    <Image
                      source={IMAGES.edit_icon}
                      style={{width: 21, height: 21}}
                    />
                  </TouchableOpacity>
                </View>

                <ProfileView />
              </View>
            </LinearView>
          )}

          <View>
            {options.map((option, index) => (
              <LinearView key={option.id} linearViewStyle={{marginTop: 8}}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handlePress(option.id)}>
                  <Text style={styles.text}>{option.label}</Text>
                  {option.isPro && <Text style={styles.proBadge}>Pro</Text>}
                </TouchableOpacity>
              </LinearView>
            ))}
          </View>
          <View style={{height:120}}/>
          <ImagePickerModal
            actionSheet={actionSheet}
            setActionSheet={res => {
              setActionSheet(res);
            }}
          />
          <View style={{height: 30}} />
        </View>
      </Animated.ScrollView>

      <Animated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfileSettingScreen;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginVertical: 10,
    ...commonFontStyle(600, 22, colors.black),
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 14,
    paddingHorizontal: wp(12),
    marginBottom: 16,
    marginHorizontal: wp(16),
    marginTop: 10,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },

  cardView: {
    padding: 16,
  },
  profileText: {
    ...commonFontStyle(600, 24, colors.black),
  },
  cancelText: {
    ...commonFontStyle(700, 15, colors.primary1),
  },

  userCardView: {
    // padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    gap: 16,
  },
  userIcon: {
    width: wp(75),
    height: wp(75),
  },
  locationIcon: {
    width: wp(14),
    height: wp(20),
    tintColor: '#3C3C4399',
    resizeMode: 'contain',
  },
  uploadText: {
    ...commonFontStyle(600, 12, colors.primary1),
    marginTop: 4,
  },
  userName: {
    ...commonFontStyle(700, 15, colors.black),
  },
  userName1: {
    ...commonFontStyle(500, 14, colors.black),
  },
  userName2: {
    ...commonFontStyle(500, 12, '#87878B'),
  },

  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    // backgroundColor: '#F3F3F3',
    borderRadius: 16,
    // paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 49,
  },
  text: {
    ...commonFontStyle(500, 14, colors.black),
  },
  proBadge: {
    backgroundColor: colors.white,
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    borderRadius: 8,
    ...commonFontStyle(500, 14, colors.primary1),
    borderWidth: 1,
    borderColor: colors.primary1,
    width: wp(43),
    height: hp(21),
    textAlign: 'center',
  },

  inputName: {
    ...commonFontStyle(500, 15, '#444444'),
    width: wp(80),
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    flex: 1,
    marginLeft: 10,
    padding: 4,
    margin: 0,
    ...commonFontStyle(400, 15, '#444444'),
  },
});
