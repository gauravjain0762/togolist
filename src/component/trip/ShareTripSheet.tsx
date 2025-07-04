import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, Ref} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {SCREEN_HEIGHT, commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

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

const ShareTripSheet: FC<sheet> = ({
  bottomSheetModalRef,
  children,
  contentContainer,
  handleSheetChanges = () => {},
  headerStyle,
  scrollviewStyle,
  title,
  titleStyle,
}) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
         style={styles.modalStyle}
        maxDynamicContentSize={SCREEN_HEIGHT * 0.8}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetView style={[styles.contentContainer, contentContainer]}>
          <View style={[styles.header, headerStyle]}>
            <Text style={[styles.headertitle, titleStyle]}>{'Share Trip'}</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <Image source={IMAGES.close} style={styles.close} />
            </TouchableOpacity>
          </View>
          <SafeAreaView edges={['bottom']} style={styles.container}>
            <TouchableOpacity style={styles.outlinedBtn}>
              <Image source={IMAGES.addIcon1} style={styles.addicon} />
              <Text style={styles.outlinedBtnText}>Add friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlinedBtn}>
              <Image source={IMAGES.link} style={styles.addicon} />
              <Text style={styles.outlinedBtnText}>Copy invite link</Text>
            </TouchableOpacity>

            <View style={styles.socialRow}>
              <Image source={IMAGES.send} style={styles.send} />
              <Text style={styles.socialText}>Share on social media</Text>
            </View>

            <View style={styles.cardContainer}>
              <ImageBackground
                source={{
                  uri: 'https://images.unsplash.com/photo-1586576782138-19304c43d0e1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={styles.image}>
                <View style={styles.cardContent}>
                  <Text style={styles.tagText}>Upcoming Trip</Text>
                  <TouchableOpacity style={styles.heartIcon}>
                    <Image source={IMAGES.newList} style={styles.badge} />
                  </TouchableOpacity>
                </View>
                <View style={styles.titleBlock}>
                  <Text style={styles.title}>Canada Experience</Text>
                  <Text style={styles.subtitle}>Starts in 60 Days</Text>
                  <Text style={styles.dateRange}>April 20 → April 24</Text>
                </View>
              </ImageBackground>
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default ShareTripSheet;

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
  contentContainer: {},
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
  headertitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  outlinedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: wp(14),
    paddingVertical: hp(17),
    paddingHorizontal: wp(24),
    marginBottom: hp(10),
    gap: wp(10),
  },
  outlinedBtnText: {
    ...commonFontStyle(700, 18, colors.black),
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(14),
    marginLeft: wp(4),
  },
  socialText: {
    ...commonFontStyle(700, 18, colors.primary),
    marginLeft: wp(8),
  },
  cardContainer: {
    borderRadius: wp(20),
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginTop: hp(10),
  },
  image: {
    height: hp(370),
    resizeMode: 'cover',
    justifyContent: 'space-between',
    paddingVertical: hp(28),
    paddingHorizontal: wp(20),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagText: {
    ...commonFontStyle(600, 14, colors.white),
  },
  heartIcon: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
  titleBlock: {},
  title: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: hp(6),
  },
  subtitle: {
    ...commonFontStyle(600, 14, colors.white),
    marginBottom: hp(2),
  },
  dateRange: {
    ...commonFontStyle(500, 14, colors.white),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  send: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  badge: {
    width: wp(16),
    height: wp(22),
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  container: {
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
  },
});
