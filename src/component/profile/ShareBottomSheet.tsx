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

const ShareBottomSheet: FC<sheet> = ({
  bottomSheetModalRef,
  handleSheetChanges = () => {},
  contentContainer,
  children,
  scrollviewStyle,
}) => {
  const [short, setshort] = useState(false);
  const [short1, setshort1] = useState(false);
  const [short2, setshort2] = useState(false);
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
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
              <Text style={styles.sheetlabel}>{'Pin Color'}</Text>
              <Image source={IMAGES.worldwide} style={styles.icon} />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Edit Event'}</Text>
              <Image source={IMAGES.edit} style={styles.icon} />
            </View>
          </View>
          <View style={styles.event}>
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Show Been There'}</Text>
              <GetCheckboxImage
                onPress={() => setshort(!short)}
                value={short}
              />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Sort by A-Z'}</Text>
              <GetCheckboxImage
                onPress={() => setshort1(!short1)}
                value={short1}
              />
            </View>
            <View style={styles.divider1} />
            <View style={styles.row}>
              <Text style={styles.sheetlabel}>{'Sort by Date Added'}</Text>
              <GetCheckboxImage
                onPress={() => setshort2(!short2)}
                value={short2}
              />
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
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default memo(ShareBottomSheet);

const styles = StyleSheet.create({
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
