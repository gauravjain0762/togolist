import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, Ref, useCallback, useState} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {SCREEN_HEIGHT, commonFontStyle, hp, wp} from '../../theme/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, LinearView} from '..';
import {AppStyles} from '../../theme/appStyles';

const inviteList = [
  {
    name: 'Christina',
    username: 'markdavis',
    image: 'https://i.pravatar.cc/150?img=10',
    invited: true,
  },
  {
    name: 'Stephanie',
    username: 'markdavis',
    image: 'https://i.pravatar.cc/150?img=11',
    invited: true,
  },
  {
    name: 'Mark Davis',
    username: 'markdavis',
    image: 'https://i.pravatar.cc/150?img=12',
    invited: false,
  },
  {
    name: 'Mark Davis',
    username: 'markdavis',
    image: 'https://i.pravatar.cc/150?img=12',
    invited: false,
  },
  {
    name: 'Mark Davis',
    username: 'markdavis',
    image: 'https://i.pravatar.cc/150?img=12',
    invited: false,
  },
  // more...
];

type sheet = {
  bottomSheetModalRef?: Ref<BottomSheetModal>;
  handleSheetChanges?: (index: any) => void;
  contentContainer?: ViewStyle;
  children?: ReactNode;
  scrollviewStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
};

const InviteFriendsSheet: FC<sheet> = ({
  bottomSheetModalRef,
  contentContainer,
  handleSheetChanges = () => {},
  headerStyle,
  scrollviewStyle,
  title,
  titleStyle,
}) => {
  const [searchText, setSearchText] = useState('');

  const InviteItem = useCallback(({name, username, image, invited}: any) => {
    return (
      <View style={styles.listcontainer}>
        <View style={styles.userInfo}>
          <Image source={{uri: image}} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>@{username}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={invited ? styles.inviteSentButton : styles.inviteButton}>
          <Text style={invited ? styles.inviteSentText : styles.inviteText}>
            {invited ? 'Invite Sent' : 'Invite'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={styles.modalStyle}
        maxDynamicContentSize={SCREEN_HEIGHT * 0.8}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetView style={[styles.contentContainer, contentContainer]}>
          <View style={[styles.header, headerStyle]}>
            <Text style={[styles.title, titleStyle]}>{'Invite Friends'}</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <Image source={IMAGES.close} style={styles.close} />
            </TouchableOpacity>
          </View>
          <SafeAreaView edges={['bottom']} style={styles.container}>
            <ScrollView
              contentContainerStyle={AppStyles.flexGrow}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              style={AppStyles.flex1}>
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
                        searchText?.length !== 0
                          ? colors.primary1
                          : colors.white,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.manualAddText,
                      {
                        color:
                          searchText?.length !== 0
                            ? colors.white
                            : colors.primary1,
                      },
                    ]}>
                    Manual Add
                  </Text>
                </View>
              </View>
              <Text style={styles.yourfrd}>{'Your Friends'}</Text>
              <FlatList
                data={inviteList}
                contentContainerStyle={AppStyles.flexGrow}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <InviteItem
                    name={item.name}
                    username={item.username}
                    image={item.image}
                    invited={item.invited}
                  />
                )}
              />
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
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default InviteFriendsSheet;

const styles = StyleSheet.create({
  modalStyle:{
     borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -100, // shadow upwards
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    paddingBottom: hp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
  },
  close: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain',
    tintColor: '#3D3D3D80',
  },
  title: {
    ...commonFontStyle(600, 18, colors.black),
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    paddingLeft: wp(8),
    marginTop: hp(16),
  },
  searchIcon: {
    width: 17,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: wp(12),
    color: colors.black,
    paddingLeft: wp(8),
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
  container: {
    paddingHorizontal: wp(14),
    flex: 1,
  },
  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(10),
    paddingHorizontal: wp(5),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp(48),
    height: wp(48),
    borderRadius: wp(24),
    marginRight: wp(12),
  },
  name: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  username: {
    ...commonFontStyle(400, 12, colors._444444),
    marginTop: hp(2),
  },
  inviteButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(8),
    paddingHorizontal: wp(20),
    borderRadius: wp(10),
  },
  inviteText: {
    ...commonFontStyle(500, 16, colors.white),
  },
  inviteSentButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: hp(8),
    paddingHorizontal: wp(20),
    borderRadius: wp(10),
  },
  inviteSentText: {
    ...commonFontStyle(500, 16, colors.primary),
  },
  yourfrd: {
    ...commonFontStyle(700, 16, colors._1B1515),
    marginTop: hp(18),
    marginBottom: hp(14),
  },
  notOnTogolistBox: {
    paddingTop: hp(20),
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  notOnTogolistText: {
    ...commonFontStyle(700, 16, '#444444'),
    marginBottom: 10,
  },
  leftImgStyle: {
    width: wp(15),
    height: wp(16),
    resizeMode: 'contain',
  },
});
