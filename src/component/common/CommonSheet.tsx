import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, Ref, memo} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
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
  maxDynamicContentSize?: number | undefined;
};

const CommonSheet: FC<sheet> = ({
  bottomSheetModalRef,
  handleSheetChanges = () => {},
  contentContainer,
  children,
  scrollviewStyle,
  headerStyle,
  title = 'Hi',
  titleStyle,
  maxDynamicContentSize = 450,
}) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        maxDynamicContentSize={maxDynamicContentSize}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetScrollView
          style={scrollviewStyle}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.contentContainer, contentContainer]}>
          <SafeAreaView edges={['bottom']}>
            <View style={[styles.header, headerStyle]}>
              <Text style={[styles.title, titleStyle]}>{title}</Text>
              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current?.dismiss()}>
                <Image source={IMAGES.close} style={styles.close} />
              </TouchableOpacity>
            </View>
            {children}
          </SafeAreaView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default memo(CommonSheet);

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
});
