import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode, Ref} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Button} from '..';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';

type sheet = {
  bottomSheetModalRef?: Ref<BottomSheetModal>;
  handleSheetChanges?: (index: any) => void;
  contentContainer?: ViewStyle;
  children?: ReactNode;
  scrollviewStyle?: ViewStyle;
};

const FollowBottomSheet: FC<sheet> = ({
  bottomSheetModalRef,
  children,
  contentContainer,
  handleSheetChanges = () => {},
  scrollviewStyle,
}) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={styles.modalStyle}
        maxDynamicContentSize={450}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetView style={[styles.contentContainer, contentContainer]}>
          <Text style={styles.title}>
            {"'You’re following “BBQ Festival”'"}
          </Text>
          <Text style={styles.label}>{'Profile display options'}</Text>
          <Button title={'Public'} leftImg={IMAGES.world} />
          <Button title={'Private'} leftImg={IMAGES.lock} />
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default FollowBottomSheet;

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
    // alignItems: 'center',
    paddingHorizontal: wp(21),
  },
  label: {
    ...commonFontStyle(400, 16, colors.black),
  },
  title: {
    ...commonFontStyle(600, 18, colors.black),
    marginVertical: hp(14),
  },
});
