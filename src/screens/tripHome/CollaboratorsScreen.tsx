import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Button, CustomHeader, LinearView} from '../../component';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {useRoute} from '@react-navigation/native';

const users = [
  {
    name: 'Mark Davis',
    username: 'markdavis',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mark Davis',
    username: 'markdavis',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    name: 'Mark Davis',
    username: '',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
];

const options = [
  {label: 'Going', emoji: '👍', key: 'going'},
  {label: 'Maybe', emoji: '🤔', key: 'maybe'},
  {label: 'Can’t Go', emoji: '😔', key: 'cantGo'},
];

const CollaboratorsScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState('going');
  const {params} = useRoute();

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        title={'Trip Planner'}
        showSearch={false}
         showBack={true}
        showMore={false}
        onMorePress={() => {}}
      />
      <View style={[styles.horizontal_divider]} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginHorizontal: 20}}>
        <Text style={styles.title}>
          {params?.FriendsGoing ? 'Friends Going' : 'Collaborators'}
        </Text>

        <View
          style={[
            styles.searchContainer,
            {
              borderBottomEndRadius: searchText?.length !== 0 ? 0 : 10,
              borderBottomLeftRadius: searchText?.length !== 0 ? 0 : 10,
            },
          ]}>
          <Image source={IMAGES.search1} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Friends on Togolist"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <View
            style={[
              styles.manualAdd,
              {
                backgroundColor:
                  searchText?.length !== 0 ? colors.primary1 : colors.white,
                borderBottomEndRadius: searchText?.length !== 0 ? 0 : 10,
              },
            ]}>
            <Text
              style={[
                styles.manualAddText,
                {
                  color:
                    searchText?.length !== 0 ? colors.white : colors.primary1,
                },
              ]}>
              Manual Add
            </Text>
          </View>
        </View>
        {searchText?.length !== 0 && (
          <View style={styles.inputField}>
            <TextInput
              placeholder="Friend’s Name"
              placeholderTextColor={colors.gray}
              style={styles.friendNameInput}
            />
            <Text style={styles.emoji}>👍 Going</Text>
          </View>
        )}

        {searchText?.length !== 0 && (
          <Button
            title="Add Friend"
            BtnStyle={{marginTop: hp(20), marginBottom: hp(6)}}
          />
        )}

        <View style={styles.container}>
          {options.map(({label, emoji, key}) => (
            <TouchableOpacity
              key={key}
              onPress={() => setSelected(key)}
              style={styles.tab}>
              <Text style={styles.tabText}>
                {emoji} {label} (0)
              </Text>
              {selected === key && <View style={styles.underline} />}
            </TouchableOpacity>
          ))}
        </View>

        {searchText?.length !== 0 &&
          users.map((user, index) => (
            <View style={styles.userRow} key={index}>
              <Image source={{uri: user.image}} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{user.name}</Text>
                {!!user.username && (
                  <Text style={styles.username}>
                    <Text style={styles.username1}>{'@'}</Text>
                    {user.username}
                  </Text>
                )}
              </View>
              {!user.username && (
                <TouchableOpacity style={styles.inviteBtn}>
                  <Text style={styles.inviteText}>Invite to Togolist</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        {searchText?.length == 0 && (
          <LinearView containerStyle={styles.notOnTogolistBox}>
            <Text style={styles.notOnTogolistText1}>
              No friends added yet!{' '}
            </Text>
            <Text style={styles.notOnTogolistText2}>
              Search for friends on Togolist or invite friends to join the app!
            </Text>
          </LinearView>
        )}
        <View style={{height: 16}} />
        <LinearView containerStyle={styles.notOnTogolistBox}>
          <Text style={styles.notOnTogolistText}>Not on Togolist?</Text>
          <Button
            leftImg={IMAGES.pin1}
            leftImgStyle={styles.leftImgStyle}
            title="Copy invite link"
            BtnStyle={{marginVertical: 10, paddingVertical: hp(12)}}
          />
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...commonFontStyle(700, 24, '#1B1515'),

    marginBottom: 20,
  },
  horizontal_divider: {
    height: 0.3,
    backgroundColor: '#1B151533',
    marginBottom: hp(21),
    marginTop: 3,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    paddingLeft: 12,
  },
  searchIcon: {
    width: 17,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: colors.black,
  },
  manualAdd: {
    backgroundColor: colors.primary1,
    justifyContent: 'center',
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.primary1,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
  },
  manualAddText: {
    ...commonFontStyle(600, 12, colors.white),
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 34,
    paddingRight: 7,
    paddingVertical: 3,
  },
  friendNameInput: {
    flex: 1,
    ...commonFontStyle(600, 12, '#A4A4A4'),
  },
  emoji: {
    ...commonFontStyle(500, 12, '#A4A4A4'),
    marginLeft: 8,
  },
  addFriendBtn: {
    backgroundColor: colors.red,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  addFriendText: {
    ...commonFontStyle(600, 12, colors.white),
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    ...commonFontStyle(600, 16, colors.black),
    marginBottom: 4,
  },
  username: {
    ...commonFontStyle(600, 12, '#444444'),
  },
  username1: {
    ...commonFontStyle(400, 12, '#444444'),
  },
  inviteBtn: {
    borderColor: colors.primary1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  inviteText: {
    ...commonFontStyle(600, 16, colors.primary1),
  },
  notOnTogolistBox: {
    marginTop: hp(16),
    paddingHorizontal: 20,
    paddingBottom: hp(8),
  },
  notOnTogolistText: {
    ...commonFontStyle(700, 16, '#444444'),
    marginBottom: 10,
  },
  notOnTogolistText1: {
    ...commonFontStyle(500, 16, '#444444'),
    marginBottom: 10,
    textAlign: 'center',
  },
  notOnTogolistText2: {
    ...commonFontStyle(400, 16, '#444444'),
    marginBottom: 10,
    textAlign: 'center',
  },

  leftImgStyle: {
    width: wp(15),
    height: wp(16),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp(16),
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    ...commonFontStyle(700, 14, colors._1B1515),
  },
  underline: {
    height: 2,
    backgroundColor: colors.black,
    width: '100%',
    marginTop: hp(6),
  },
});

export default CollaboratorsScreen;
