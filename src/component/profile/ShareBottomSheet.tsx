import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, Ref, memo, useState} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {IMAGES} from '../../assets/Images';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Button, GetCheckboxImage} from '..';
import ColorPicker, {HueSlider, Panel1, Preview} from 'reanimated-color-picker';
import {runOnJS} from 'react-native-reanimated';

type sheet = {
  bottomSheetModalRef?: Ref<BottomSheetModal>;
  handleSheetChanges?: (index: any) => void;
  contentContainer?: ViewStyle;
  children?: ReactNode;
  scrollviewStyle?: ViewStyle;
};

export const CustomBackground = ({style}) => {
  return (
    <View
      style={[
        style,
        {
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -4},
              shadowOpacity: 0.1,
              shadowRadius: 10,
            },
            android: {
              elevation: 10,
            },
          }),
        },
      ]}
    />
  );
};

const ShareBottomSheet: FC<sheet> = ({
  bottomSheetModalRef,
  handleSheetChanges = () => {},
  contentContainer,
  children,
  scrollviewStyle,
  maxDynamicContentSize
}) => {
  const [short, setshort] = useState(false);
  const [short1, setshort1] = useState(false);
  const [short2, setshort2] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColor, setShowColor] = useState('#f51212');

  const onSelectColor = ({hex}) => {
    'worklet';
    runOnJS(setShowColor)(hex); // <-- Use runOnJS if using inside worklet
    console.log(hex);
  };

  const CustomHandle = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => bottomSheetModalRef?.current?.close()}
      style={{
        alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          width: 40,
          height: 5,
          borderRadius: 3,
          backgroundColor: '#ccc',
        }}
      />
      {/* <Text>Tap to close</Text> */}
    </TouchableOpacity>
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        // index={1}
        maxDynamicContentSize={maxDynamicContentSize}
        // snapPoints={['90%', '100%']}
        backgroundComponent={CustomBackground}
        onChange={e => handleSheetChanges(e)}
        style={styles.modalStyle}>
        <BottomSheetScrollView
          style={scrollviewStyle}
          contentContainerStyle={[styles.contentContainer, contentContainer]}>
          <View style={styles.toplist}>
            <TouchableOpacity style={styles.row}>
              <Text style={styles.sheetlabel}>{'Share'}</Text>
              <Image source={IMAGES.send} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                setShowColorPicker(!showColorPicker);
              }}
              style={styles.row}>
              <Text style={styles.sheetlabel}>{'Pin Color'}</Text>
              <Image source={IMAGES.worldwide} style={[styles.icon]} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            {showColorPicker && (
              <ColorPicker
                style={styles.colorPicker}
                value="red"
                onComplete={onSelectColor}>
                <Panel1
                  style={styles.panel}
                  thumbSize={20}
                  thumbStyle={styles.thumbStyle}
                />
                <HueSlider
                  sliderThickness={10}
                  thumbStyle={styles.thumbStyle}
                  style={styles.HueSlider}
                  thumbSize={14}
                  thumbColor="#fff"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    bottom: 50,
                    marginHorizontal: 20,
                  }}>
                  <Text style={styles.hexText}>Hex</Text>
                  <View style={styles.boxView}>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        backgroundColor: showColor,
                      }}
                    />
                    <Text style={styles.hexText1}>{showColor}</Text>
                  </View>
                </View>
              </ColorPicker>
            )}
            {/* <View style={styles.divider1} /> */}
            <TouchableOpacity style={styles.row}>
              <Text style={styles.sheetlabel}>{'Edit Event'}</Text>
              <Image source={IMAGES.edit} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.event}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => setshort(!short)}>
              <Text style={styles.sheetlabel}>{'Show Been There'}</Text>
              <GetCheckboxImage
                onPress={() => setshort(!short)}
                value={short}
              />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => setshort1(!short1)}
              style={styles.row}>
              <Text style={styles.sheetlabel}>{'Sort by A-Z'}</Text>
              <GetCheckboxImage
                onPress={() => setshort1(!short1)}
                value={short1}
              />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => setshort2(!short2)}
              style={styles.row}>
              <Text style={styles.sheetlabel}>{'Sort by Date Added'}</Text>
              <GetCheckboxImage
                onPress={() => setshort2(!short2)}
                value={short2}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.sheetlabel}>{'Report an Issue'}</Text>
            <Image source={IMAGES.report} style={styles.icon} />
          </TouchableOpacity>
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
  modalStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
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
  hexText: {
    ...commonFontStyle(700, 16, colors.white),
    flex: 1,
    bottom: 10,
  },
  boxView: {
    width: 106,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    bottom: 10,
    flexDirection: 'row',
    gap: 5,
    borderRadius: 5,
  },
  hexText1: {
    ...commonFontStyle(500, 16, colors.white),
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
  colorPicker: {
    width: SCREEN_WIDTH - wp(64),
    alignSelf: 'center',
    margin: wp(7),
  },
  panel: {
    height: hp(422),
  },
  thumbStyle: {
    borderWidth: wp(11),
    borderRadius: 100,
  },
  HueSlider: {
    borderRadius: 100,
    bottom: 80,
  },
});
