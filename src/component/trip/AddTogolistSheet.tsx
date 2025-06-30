import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, Ref} from 'react';
import {Button, CommonSheet, SocialBtn} from '..';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

type sheet = {
  bottomSheetModalRef?: Ref<BottomSheetModal>;
  handleSheetChanges?: (index: any) => void;
  onPress?: () => void;
  contentContainer?: ViewStyle;
  children?: ReactNode;
  scrollviewStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
};

const AddTogolistSheet: FC<sheet> = ({
  bottomSheetModalRef,
  children,
  contentContainer,
  handleSheetChanges = () => {},
  scrollviewStyle,
  headerStyle,
  onPress,
  title,
  titleStyle,
}) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        maxDynamicContentSize={450}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetView style={[styles.contentContainer, contentContainer]}>
          <View style={[styles.header, headerStyle]}>
            <Text style={[styles.title, titleStyle]}>{'Add to Togolist'}</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}>
              <Image source={IMAGES.close} style={styles.close} />
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Create trip manually"
              leftImg={IMAGES.upload}
              BtnStyle={styles.trip}
              onPress={onPress}
            />
            <SocialBtn
              title="Sync Apple calendar"
              img={IMAGES.apple}
              btnStyle={styles.social}
            />
            <SocialBtn
              title="Sync Google calendar"
              img={IMAGES.googleOutline}
              btnStyle={styles.social}
              imgStyle={{tintColor: colors.black}}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default AddTogolistSheet;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: wp(16),
  },
  header: {
    paddingBottom: hp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  trip: {
    backgroundColor: colors.primary,
    paddingVertical: hp(16),
  },
  social: {
    borderWidth: 1,
  },
  btnContainer: {
    gap: hp(16),
    marginVertical: hp(16),
  },
});
