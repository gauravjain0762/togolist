import {
  FlatList,
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
import {CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';

const galleryData = {
  All: [
    require('../../assets/extra/0e9256e7b2c6a1da0d97636a247cf21df915ac31.jpg'),
    require('../../assets/extra/7d727fe48d5920a0c264d41e100f833f7f79defe.jpg'),
    require('../../assets/extra/62c3cafdd98929007147277cd3e80401713b1408.jpg'),
    require('../../assets/extra/415c62ccc17d8a83f1c421912f2921b912cb0a62.jpg'),
    require('../../assets/extra/613d6f2a5a1b20d77427d460383a301c2279afde.jpg'),
    require('../../assets/extra/777270ea3c49a657ca6672e8d50c67778e1d9ed8.jpg'),
    require('../../assets/extra/6865761f5201a514fc5762947bb7fb8995b96d23.jpg'),
    require('../../assets/extra/a3bf9fbb42dd5558510d032ba0097ed5c1534344.jpg'),
    require('../../assets/extra/e36304a569c1b628a162421b490ce51dcbd0e758.jpg'),
    require('../../assets/extra/ed8e815f9e9d7dd469fc26d6d161e3549c083304.jpg'),
  ],
  Vibe: [
    require('../../assets/extra/415c62ccc17d8a83f1c421912f2921b912cb0a62.jpg'),
    require('../../assets/extra/613d6f2a5a1b20d77427d460383a301c2279afde.jpg'),
    require('../../assets/extra/7d727fe48d5920a0c264d41e100f833f7f79defe.jpg'),
    require('../../assets/extra/777270ea3c49a657ca6672e8d50c67778e1d9ed8.jpg'),
  ],
  Food: [
    require('../../assets/extra/0e9256e7b2c6a1da0d97636a247cf21df915ac31.jpg'),
    require('../../assets/extra/62c3cafdd98929007147277cd3e80401713b1408.jpg'),
    require('../../assets/extra/6865761f5201a514fc5762947bb7fb8995b96d23.jpg'),
    require('../../assets/extra/a3bf9fbb42dd5558510d032ba0097ed5c1534344.jpg'),
    require('../../assets/extra/e36304a569c1b628a162421b490ce51dcbd0e758.jpg'),
    require('../../assets/extra/ed8e815f9e9d7dd469fc26d6d161e3549c083304.jpg'),
  ],
  Menu: [
    require('../../assets/extra/415c62ccc17d8a83f1c421912f2921b912cb0a62.jpg'),
  ],
};

const tabImages = {
  All: require('../../assets/extra/415c62ccc17d8a83f1c421912f2921b912cb0a62.jpg'),
  Vibe: require('../../assets/extra/613d6f2a5a1b20d77427d460383a301c2279afde.jpg'),
  Food: require('../../assets/extra/e36304a569c1b628a162421b490ce51dcbd0e758.jpg'),
  Menu: require('../../assets/extra/415c62ccc17d8a83f1c421912f2921b912cb0a62.jpg'),
};

const GalleryScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  return (
    <SafeAreaView style={[AppStyles.flex, styles.maincontainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <View style={styles.container}>
        <View style={styles.Titlecontainer}>
          <Text style={styles.title}>La Perla Cocina</Text>
          <View style={[AppStyles.row, styles.features]}>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.add} source={IMAGES.newList} />
              <Text style={[styles.optionText]}>{'Add to list'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.check} source={IMAGES.been} />
              <Text style={[styles.optionText]}>{'Been There'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.fav} source={IMAGES.fav} />
              <Text style={[styles.optionText]}>{'Favs'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.gallery}>{'Gallery'}</Text>
        </View>
        <View style={AppStyles.flex1}>
          <View style={styles.tabContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {Object.keys(tabImages).map(tab => {
                const isActive = tab === activeTab;
                return (
                  <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                    <ImageBackground
                      source={tabImages[tab]}
                      style={styles.tabImage}
                      imageStyle={[
                        styles.tabImageStyle,
                        {
                          borderColor: isActive && colors._BD2332,
                          borderWidth: isActive ? 3 : 0,
                        },
                      ]}>
                      {isActive && <View style={styles.overlay} />}
                      <Text
                        style={
                          isActive
                            ? styles.tabTextActive
                            : styles.tabTextInactive
                        }>
                        {tab}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <FlatList
            data={galleryData[activeTab]}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={AppStyles.flexGrow}
            columnWrapperStyle={styles.imageRow}
            style={AppStyles.flex1}
            renderItem={({item}) => (
              <Image source={item} style={styles.galleryImage} />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: colors.white,
  },
  back: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: undefined,
  },
  more: {
    tintColor: undefined,
    resizeMode: 'contain',
    width: 22,
    height: 22,
  },
  header: {
    paddingHorizontal: wp(16),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
    tintColor: colors._BD2332,
  },
  check: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
  },
  fav: {
    width: wp(21),
    height: wp(18),
    resizeMode: 'contain',
  },
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  features: {
    gap: wp(4),
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(4),
  },
  container: {
    paddingHorizontal: wp(12),
    flex: 1,
  },
  gallery: {
    ...commonFontStyle(700, 24, colors.black),
  },
  Titlecontainer: {
    gap: wp(12),
    // marginTop: hp(35),
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: hp(15),
  },
  tabImage: {
    width: wp(92),
    height: hp(120),
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 8,
  },
  tabImageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
  },
  tabTextActive: {
    ...commonFontStyle(700, 18, '#FFFFFF'),
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: wp(12),
  },
  tabTextInactive: {
    ...commonFontStyle(700, 18, '#FFFFFF'),
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: wp(12),
  },
  imageRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: wp(8),
  },
  galleryImage: {
    height: hp(182),
    borderRadius: 12,
    flex: 1,
  },
});
