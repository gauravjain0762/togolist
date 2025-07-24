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
import CustomTabBar from '../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import Reanimated from 'react-native-reanimated';
import {navigationRef} from '../../navigation/RootContainer';

const {width} = Dimensions.get('window');

const NotificationDetails = () => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );

  const [flatListReady, setFlatListReady] = useState(false);
  const flatListRef = useRef(null);

  let initialIndex = 1;
  useEffect(() => {
    // Only scroll if initialIndex is found and FlatListRef exists
    if (flatListRef.current && initialIndex !== -1) {
      // Small timeout to allow shared element transition to start
      const timer = setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        setFlatListReady(true); // Mark FlatList as ready
      }, 50); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [initialIndex]);

  const [activeIndex, setActiveIndex] = useState(0);

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
      <View
        style={[
          styles.paginationContainer,
          {marginBottom: isVisible ? 18 : 0},
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigationRef.goBack();
          }}>
          <Image
            source={IMAGES.map1}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[1.2].map((_, index) => {
            return <View key={index} style={getDotStyle(index)} />;
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigationRef.goBack();
          }}>
          <Image
            source={IMAGES.menu1}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title="Trips"
      />

      {initialIndex !== -1 && ( // Only render FlatList if initial item is found
       
          <FlatList
            ref={flatListRef}
            data={[1, 2]}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={[{gap: hp(8)}]}
            renderItem={({item}) => {
              return (
                <Reanimated.ScrollView
                        onScroll={scrollHandler}
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
                      multiline
                      numberOfLines={2}
                      textAlignVertical="top"
                      placeholder="Looking for a guide to show us around Toronto! Interests are sports, breweries and shopping."
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
                    <View
                      style={[styles.row, {justifyContent: 'space-between'}]}>
                      <Text style={styles.dateText}>April 3–5, 2025</Text>
                      <View style={[styles.row, {gap: wp(4)}]}>
                        {/* <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>Fixed</Text>
              </TouchableOpacity> */}
                        <TouchableOpacity
                          style={[styles.tag, styles.redBorder]}>
                          <Text style={styles.tagTextRed}>Dates Flexible</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.divider} />

                    {/* LENGTH OPTIONS */}
                    <Text style={styles.label}>Interests</Text>
                    <View style={styles.rowWrap}>
                      {['Breweries', 'Sports', 'Shopping'].map(
                        (item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.disabledTag}>
                            <Text style={styles.disabledText}>{item}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>

                    <View style={styles.divider} />

                    {/* LENGTH OPTIONS */}
                    <Text style={styles.label}>Tags</Text>
                    <View style={styles.rowWrap}>
                      {['Full Day', 'Half Day', 'Small Group'].map(
                        (item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.disabledTag}>
                            <Text style={styles.disabledText}>{item}</Text>
                          </TouchableOpacity>
                        ),
                      )}
                    </View>
                  </LinearView>
                  <Button
                    onPress={() =>
                      navigateTo(SCREEN_NAMES.ExperienceScreen, {submit: true})
                    }
                    BtnStyle={{paddingVertical: 15}}
                    title="Apply to be a Guide"
                  />
                  <View style={{height:100}}/>
                </Reanimated.ScrollView>
              );
            }}
            keyExtractor={item => item?.id}
            horizontal
            pagingEnabled // Enables snapping to full pages
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex is set when component mounts via useEffect
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            style={flatListReady ? {} : {opacity: 0}} // Hide FlatList until ready
            onScroll={Animated.event(
              // Capture scroll events for dot animation
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}, // 'useNativeDriver: true' not supported for 'onScroll' with 'Animated.event' by default
            )}
            scrollEventThrottle={16} // Update scroll position frequently
          />
       
      )}
      {renderPaginationDots()}
      {isVisible && <SafeAreaView edges={['top']} />}
      <Reanimated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Reanimated.View>
    </SafeAreaView>
  );
};

export default NotificationDetails;

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
    width: 22,
    height: 22,
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
    marginTop: hp(10),
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
    marginBottom: 6,
  },
  valueContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
    gap: hp(10),
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

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 30, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
