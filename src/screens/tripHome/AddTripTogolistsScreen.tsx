import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthHeader, Button, CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CardImage from '../../component/common/CardImage';
import CardImageView from '../../component/trip/CardImageView';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import CategoryCard from '../../component/trip/CategoryCard';
import {navigationRef} from '../../navigation/RootContainer';
import {useRoute} from '@react-navigation/native';

const AddTripTogolistsScreen = () => {
  const {params} = useRoute();
  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigationRef.goBack()} style={{}}>
          <Image source={IMAGES.back} style={[styles.backIcon]} />
        </TouchableOpacity>
        <AuthHeader showBack={false} proggress={60} />
        <TouchableOpacity
          onPress={() => navigationRef.goBack()}
          style={{right: 20}}>
          <Image source={IMAGES.close} style={[styles.closeIcon]} />
        </TouchableOpacity>
      </View>
      <View style={[styles.horizontal_divider]} />

      <View style={[{paddingHorizontal: 20, flex: 1}]}>
        {/* Title */}
        <Text style={styles.title}>Add List: Things to Do</Text>

        {/* Location + Collection count */}
        <Text style={styles.subtext}>What should we call this list?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Tourist Attractions"
            placeholderTextColor={colors.black}
            style={styles.searchInput}
          />
        </View>
        {params?.sources && (
          <View style={styles.sorceContainer}>
            <Text style={styles.sorcelabel}>{'Sources (optional)'}</Text>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Add link"
                placeholderTextColor={'#3C3C4399'}
                style={styles.searchInput}
              />
            </View>
          </View>
        )}
      </View>
      {/* <FlatList
        data={categories}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => {
          return (
            <CategoryCard
              onCardPress={() => {
                navigateTo(SCREENS.TripTogolistsScreen);
              }}
              title={item?.title}
              Togolist={item?.category}
              Lists
              listCount={item?.places}
            />
          );
        }}
        ListFooterComponent={() => {
          return (
            <Button
              leftImg={IMAGES.addlist}
              type="outline"
              title="Add a new list"
              BtnStyle={styles.btn}
              // onPress={() => handlePresentModalPress()}
            />
          );
        }}
      /> */}
      <Button
        title="Next"
        BtnStyle={styles.btn}
        onPress={() => navigateTo(SCREENS.TripExplore)}
      />
      <View style={{height: 20}} />
    </SafeAreaView>
  );
};

export default AddTripTogolistsScreen;

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 11,
    height: 24,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  closeIcon: {
    width: 11,
    height: 24,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginBottom: hp(21),
    marginTop: 3,
    width: '100%',
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
    // marginBottom: 8,
  },
  bylineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: wp(24),
    height: wp(24),
    marginRight: 8,
  },
  bylineText: {
    ...commonFontStyle(700, 15, colors.black),
  },
  boldText: {
    ...commonFontStyle(600, 15, colors.black),
  },
  subtext: {
    marginTop: 16,
    ...commonFontStyle(600, 15, colors.black),
    marginBottom: 6,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#1B151533',
  },
  searchInput: {
    flex: 1,
    ...commonFontStyle(500, 18, colors.black),
    paddingVertical: hp(12),
  },

  btn: {
    marginVertical: hp(16),
    paddingVertical: hp(16),
    marginHorizontal: 20,
  },
  sorcelabel: {
    ...commonFontStyle(600, 16, colors.black),
  },
  sorceContainer: {
    marginTop: hp(16),
    gap: hp(6),
  },
});
