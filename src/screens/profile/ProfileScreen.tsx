import {
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
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import CustomBtn from '../../component/common/CustomBtn';

type Props = {};

const ProfileScreen = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState('Lists');
  const [selectedCategory, setSelectedCategory] = useState('Favorites');

  const categories = [
    {
      key: 'Favorites',
      icon: (
        <Image
          source={IMAGES.favorite}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Been There',
      icon: (
        <Image
          source={IMAGES.been}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Shared',
      icon: (
        <Image
          source={IMAGES.share1}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
          }}
        />
      ),
    },
  ];
  const tabs = [
    {
      key: 'Lists',
      icon: (
        <Image
          source={IMAGES.lists_icon}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Lists' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Saved',
      icon: (
        <Image
          source={IMAGES.save_cion}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Saved' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Listings',
      icon: (
        <Image
          source={IMAGES.list1}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Listings' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Going',
      icon: (
        <Image
          source={IMAGES.go}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Going' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
  ];

  const ListView = ({subText, value}) => {
    return (
      <View style={styles.statItem}>
        <Text style={commonFontStyle(700, 24, colors.black)}>{value}</Text>
        <Text style={commonFontStyle(500, 14, colors.gray)}>{subText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader onSearchPress={() => {}} onMorePress={() => {}} />
      <Loader visible={false} />
      <ScrollView style={[AppStyles.mainSide,AppStyles.flex]}>
        <View style={styles.searchContainer}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Profile"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarView}>
            <Image
              source={{uri: 'https://i.pravatar.cc/150?img=11'}}
              style={styles.avatar}
            />
          </View>
          <View style={{flex: 1, marginLeft: 12}}>
            <Text style={styles.userName}>Raymond Daily</Text>
            <Text style={styles.userSubText}>@raydaily</Text>
            <View style={styles.statsRow}>
              <ListView subText={'Saves'} value={'122'} />
              <ListView subText={'Saves'} value={'67'} />
              <ListView subText={'Listings'} value={'37K'} />
            </View>
          </View>
        </View>

        <Text style={styles.decText}>
          San Diegan that loves to travel and share with friends along the way.
        </Text>
        <CustomBtn
          buttonText={styles.buttonText}
          style={styles.button2}
          onPress={() => {}}
          title={'Follow'}
        />

        <View style={styles.tabContainer1}>
          <ImageBackground source={IMAGES.bg3} style={styles.tabContainer}>
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setSelectedTab(tab.key)}
                style={styles.tabItem}>
                {tab.icon}
                <Text
                  style={[
                    commonFontStyle(
                      500,
                      14,
                      selectedTab === tab.key ? colors.black : colors.gray,
                    ),
                    {marginTop: 4},
                  ]}>
                  {' '}
                  {tab.key}{' '}
                </Text>
              </TouchableOpacity>
            ))}
          </ImageBackground>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
          <Text style={[commonFontStyle(700, 20, colors.black)]}>
            Personal Lists
          </Text>
          <Image source={IMAGES.down} style={styles.downIcon} />
        </View>

        <View style={styles.categoryRow}>
          {categories.map(category => {
            return (
              <TouchableOpacity
                key={category.key}
                onPress={() => setSelectedCategory(category.key)}
                style={[styles.categoryButton, styles.categoryButtonActive]}>
                {category.icon}
                <Text
                  style={[
                    commonFontStyle(500, 14, colors.black),
                    {marginLeft: 6},
                  ]}>
                  {category.key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ImageBackground
          source={IMAGES.bg1} // Replace with actual pyramid image URL
          style={styles.container}
          imageStyle={styles.image}>
          <Text style={styles.title}>For You</Text>

          <View style={styles.bottomRow}>
            <ImageBackground
              source={IMAGES.bg5}
              resizeMode="cover"
              style={styles.chip}>
              <Image source={IMAGES.ToglistCircleIcon} style={styles.forIcon} />
              <Text style={styles.chipText}>Togolist</Text>
            </ImageBackground>

            <ImageBackground
              source={IMAGES.bg5}
              resizeMode="cover"
              style={styles.chip}>
              <Image source={IMAGES.wordWide} style={styles.forIcon1} />
              <Text style={styles.chipText}>Worldwide</Text>
            </ImageBackground>
          </View>
        </ImageBackground>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
          <View style={{flexDirection: 'row', alignItems: 'center',flex:1}}>
            <Text style={[commonFontStyle(700, 20, colors.black)]}>
              Collections
            </Text>
            <Image source={IMAGES.down} style={styles.downIcon} />
          </View>
            <Image source={IMAGES.add_icon} style={styles.addIcon} />
        </View>

         <ImageBackground
              source={IMAGES.collocation_bg}
              resizeMode="contain"
              style={styles.collocation_bg}>
              <Text style={styles.chipText}>Worldwide</Text>
            </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 8,
  },
  profileContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: wp(106),
    height: wp(106),
    borderRadius: wp(106),
  },
  avatarView: {
    width: wp(124),
    height: wp(124),
    borderRadius: wp(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#21212126',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flex: 1,
    marginHorizontal: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  decText: {
    marginTop: 8,
    ...commonFontStyle(500, 14, '#8B8B8B'),
  },
  userName: {
    ...commonFontStyle(700, 20, colors.black),
  },
  userSubText: {
    ...commonFontStyle(500, 14, colors.gray),
    marginTop: 8,
  },
  button2: {
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    marginHorizontal: 0,
    marginTop: 12,
  },
  buttonText: {
    ...commonFontStyle(600, 12, colors.white),
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#7878800D',
    borderRadius: 12,
    paddingVertical: 20,
  },
  tabContainer1: {
    backgroundColor: '#7878800D',
    borderRadius: 20,
    marginTop: 18,
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  categoryButtonActive: {
    backgroundColor: '#f1f1f1',
  },
  downIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  forIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  forIcon1: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  addIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight:8
  },

  container: {
    height: 116,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 12,
  },
  image: {
    borderRadius: 25,
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  chipText: {
    marginLeft: 6,
    ...commonFontStyle(500, 13, '#FAE8D1'),
  },

  collocation_bg:{
    width:wp(370),
    height:wp(370)
  }
});
