import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Button, CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const {width} = Dimensions.get('window');

const PostRequest = ({route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
 const flatListRef = useRef(null);
   const [flatListReady, setFlatListReady] = useState(false);
 
  useEffect(() => {
    const listener = scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setActiveIndex(index);
    });

    return () => scrollX.removeListener(listener);
  }, []);

  const getDotStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);

    // Shrink size and opacity with distance from activeIndex
    const size = 8 - distance * 1.2; // main: 8, second: 6.8, third: 5.6, etc.
    const clampedSize = Math.max(size, 2); // minimum size
    const opacity = 1 - distance * 0.15; // main: 1, then reduce

    return {
      width: clampedSize,
      height: clampedSize,
      borderRadius: clampedSize / 2,
      marginHorizontal: 6.5,
      backgroundColor: `#E3E3E3`,
    };
  };

  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position
  const renderPaginationDots = () => {
    const dotPosition = Animated.divide(scrollX, width); // Calculate active dot position
    return (
      <View style={styles.paginationContainer}>
        <Image
          source={IMAGES.map1}
          style={{width: 17, height: 17, resizeMode: 'contain'}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[1, 3].map((_, index) => {
            return <View key={index} style={getDotStyle(index)} />;
          })}
        </View>
        <Image
          source={IMAGES.menu1}
          style={{width: 17, height: 17, resizeMode: 'contain'}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer,{paddingBottom:10}]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showBack={true}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />

      {true && ( // Only render FlatList if initial item is found
        <FlatList
          ref={flatListRef}
          data={[1,2]}
          renderItem={({item}) => {
            return (
              <ScrollView
                contentContainerStyle={styles.Scrollcontainer}
                style={styles.scroll}
                showsVerticalScrollIndicator={false}>
                <ImageBackground
                  source={IMAGES.bbq}
                  imageStyle={styles.placeimges}
                  style={styles.place}>
                  <Text style={styles.placeTitle}>{'Guide to Toronto'}</Text>
                  <View style={styles.location}>
                    <Image source={IMAGES.wordWide} style={styles.pin} />
                    <Text style={styles.address}>{'Toronto, Canada'}</Text>
                  </View>
                  <Text style={styles.rate}>{'Hourly $20 USD'}</Text>
                </ImageBackground>
                <LinearView containerStyle={styles.valueContainer}>
                  <Text style={styles.headerTitle}>{'About'}</Text>
                  <TextInput
                    style={styles.valueinput}
                    placeholder="Add a short description..."
                  />
                </LinearView>
                <LinearView
                  containerStyle={[
                    styles.valueContainer,
                    {paddingBottom: hp(16)},
                  ]}>
                  <Text style={styles.headerTitle}>{'Details'}</Text>
                  {/* WHEN */}
                  <Text style={styles.label}>When</Text>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Text style={styles.dateText}>April 3–5, 2025</Text>
                    <View style={[styles.row, {gap: wp(4)}]}>
                      <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Fixed</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.tag, styles.redBorder]}>
                        <Text style={styles.tagTextRed}>Dates Flexible</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* LENGTH OPTIONS */}
                  <Text style={styles.label}>Select Length Options</Text>
                  <View style={styles.rowWrap}>
                    {['Multiday', 'Full Day', 'Half Day', 'Half Day'].map(
                      (item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.disabledTag}>
                          <Text style={styles.disabledText}>{item}</Text>
                        </TouchableOpacity>
                      ),
                    )}
                  </View>

                  {/* GROUP SIZE */}
                  <Text style={styles.label}>Group Size</Text>
                  <Text style={styles.actionText}>4-6 Guests</Text>

                  <View style={styles.divider} />

                  {/* INTERESTS */}
                  <Text style={styles.label}>Interests (Max 3)</Text>
                  <Text style={styles.actionText}>Set Interests</Text>
                </LinearView>
                <Button
                  onPress={() =>
                    navigateTo(SCREEN_NAMES.ExperienceScreen, {submit: true})
                  }
                  BtnStyle={{paddingVertical: hp(15)}}
                  title="Submit Request"
                />
              </ScrollView>
            );
          }}
          keyExtractor={(_,index) => index.toString()}
          horizontal
          pagingEnabled // Enables snapping to full pages
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex is set when component mounts via useEffect
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          // style={flatListReady ? {} : {opacity: 0}} // Hide FlatList until ready
          onScroll={Animated.event(
            // Capture scroll events for dot animation
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}, // 'useNativeDriver: true' not supported for 'onScroll' with 'Animated.event' by default
          )}
          scrollEventThrottle={16} // Update scroll position frequently
        />
      )}

      {renderPaginationDots()}
    </SafeAreaView>
  );
};

export default PostRequest;

const styles = StyleSheet.create({
  back: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: undefined,
  },
  more: {
    tintColor: undefined,
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  header: {
    paddingHorizontal: wp(16),
  },
  scroll: {
    paddingHorizontal: wp(16),
     width: width,
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    marginTop: hp(8),
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: hp(4),
    paddingVertical: hp(38),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(4),
  },
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  rate: {
    ...commonFontStyle(400, 14, colors.white),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  valueinput: {
    ...commonFontStyle(400, 14, colors._5A5757),
  },
  valueContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
    gap: hp(10),
    paddingBottom: hp(6),
  },
  title: {
    ...commonFontStyle(700, 20, colors.black),
    marginBottom: hp(12),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  dateText: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: wp(10),
    borderColor: colors._D9D9D9,
    borderWidth: 1,
    padding: wp(6),
  },
  redBorder: {
    borderWidth: 1,
    borderColor: colors._BD2332,
    backgroundColor: 'transparent',
  },
  tagText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  tagTextRed: {
    ...commonFontStyle(500, 13, colors._BD2332),
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(6),
  },
  disabledTag: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(12),
    borderRadius: wp(18),
    borderWidth: 1,
    borderColor: colors._D9D9D9,
  },
  disabledText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  actionText: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1B151533',
    marginVertical: hp(8),
  },
  Scrollcontainer: {
    gap: hp(8),
  },

  // Styles for the pagination dots
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 30, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 16,
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: '#D3D3D3',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  activeDot: {
    backgroundColor: '#000', // black for active dot
    width: 10,
    height: 10,
  },
  mainDot: {
    backgroundColor: '#E3E3E3',
    width: 8,
    height: 8,
  },
  secondDot: {
    backgroundColor: '#BEBEBE',
    width: 8,
    height: 8,
  },
  thirdDot: {
    backgroundColor: '#CDCDCD',
    width: 8,
    height: 8,
  },
});
