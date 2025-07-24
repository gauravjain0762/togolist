import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode, Ref, memo, useState} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Button, GetCheckboxImage} from '..';

type sheet = {
  bottomSheetModalRef?: Ref<BottomSheetModal>;
  handleSheetChanges?: (index: any) => void;
  contentContainer?: ViewStyle;
  children?: ReactNode;
  scrollviewStyle?: ViewStyle;
};

const EventBottomSheet: FC<sheet> = ({
  bottomSheetModalRef,
  handleSheetChanges = () => {},
  contentContainer,
  children,
  scrollviewStyle,
  maxDynamicContentSize,
  isVisible
}) => {
  const [pub, setPub] = useState(false);
  const [prv, setPrv] = useState(false);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        maxDynamicContentSize={maxDynamicContentSize}
        style={styles.modalStyle}
        onChange={e => handleSheetChanges(e)}>
        <BottomSheetScrollView
          style={scrollviewStyle}
          contentContainerStyle={[styles.contentContainer, contentContainer]}>
          <View style={styles.toplist}>
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Share'}</Text>
              <Image source={IMAGES.send} style={styles.icon} />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Add Admins'}</Text>
              <Image source={IMAGES.admin} style={styles.icon} />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Edit Event'}</Text>
              <Image source={IMAGES.edit} style={styles.icon} />
            </View>
          </View>
          <View style={styles.event}>
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Public Event'}</Text>
              <GetCheckboxImage onPress={() => setPub(!pub)} value={pub} />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Private Event'}</Text>
              <GetCheckboxImage onPress={() => setPrv(!prv)} value={prv} />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.sheetlabel}>{'Report an Issue'}</Text>
            <Image source={IMAGES.report} style={styles.icon} />
          </View>
          <Button
            onPress={() => bottomSheetModalRef.current?.dismiss()}
            title="Close"
            BtnStyle={styles.btnStyle}
          />
          <View style={{height:isVisible ? 80 :0}}/>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default memo(EventBottomSheet);

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
  icon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(17),
    paddingHorizontal: wp(16),
  },
  sheetlabel: {
    ...commonFontStyle(500, 18, colors.black),
  },
  divider1: {
    height: 0.5,
    backgroundColor: '#8080808C',
  },
  toplist: {
    borderBottomWidth: 8,
    borderColor: '#8080802E',
  },
  event: {
    borderBottomWidth: 8,
    borderColor: '#8080802E',
  },
  btnStyle: {
    backgroundColor: colors.black,
    marginVertical: hp(28),
  },
});
