import {
  FlatList,
  Image,
  ImageBackground,
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
import {SCREEN_HEIGHT, SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {Button, CommonSheet, GetCheckboxImage, LinearView} from '..';
import ColorPicker, {HueSlider, Panel1, Preview} from 'reanimated-color-picker';
import {runOnJS} from 'react-native-reanimated';
import DiscoverNewSpotsCard from '../explore/DiscoverNewSpotsCard';
import HeaderTextIcon from './HeaderTextIcon';
import CollectionModal from '../explore/CollectionModal';

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

const AddToListBottomSheet: FC<sheet> = ({
 bottomSheetModalRef
}) => {

  const [showPersonal, setShowPersonal] = useState(true);
   const [showCollections, setShowCollections] = useState(true);
   const [showCalendar, setShowCalendar] = useState(false);
   const [showSavedCollections, setShowSavedCollections] = useState(false);
   const [collectionModal, setCollectionModal] = useState(false);
   const [newListShow, setNewListShow] = useState(false);
   const [newListShowTitle, setNewListShowTitle] = useState('');

   const AddListCard = () => {
     const [check, setCheck] = useState(false);
     return (
       <TouchableOpacity onPress={() => setCheck(!check)} style={styles.card}>
         <ImageBackground
           source={IMAGES.bg1}
           imageStyle={styles.imgStyle}
           resizeMode="cover"
           style={styles.bg}>
           <Text style={styles.cardTitle}>{'Tourist Attractions'}</Text>
           <Image
             source={check ? IMAGES.check_icon : IMAGES.add_icon1}
             style={styles.addicon}
           />
         </ImageBackground>
       </TouchableOpacity>
     );
   };

  return (
    <CommonSheet
        title="Add To List"
        bottomSheetModalRef={bottomSheetModalRef}
        maxDynamicContentSize={SCREEN_HEIGHT - hp(150)}
        children={
          <View>
            <DiscoverNewSpotsCard
              showInfo={false}
              showAddToList={true}
              showRating={false}
              isShowOptions={false}
              imageStyle={{marginHorizontal: Platform.OS == 'ios' ? 0 : 16}}
            />
            <View style={styles.optionContainer}>
              <View style={styles.row}>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.addpin} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.plain} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.container} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={styles.icons} source={IMAGES.book} />
                </TouchableOpacity>
              </View>
              <LinearView
                containerStyle={styles.containerStyle}
                linearViewStyle={styles.listContainer}>
                <View>
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Personal Lists'}
                    headerStyle={styles.headerstyle}
                    show={showPersonal}
                    onDownPress={() => {
                      setShowPersonal(!showPersonal);
                    }}
                  />
                  {showPersonal && (
                    <FlatList
                      data={[1, 2,]}
                      keyExtractor={(_,index)=>index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp(4)}} />
                      )}
                      ListFooterComponent={() => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setCollectionModal(true);
                              setNewListShow(true);
                              setNewListShowTitle('Personal Lists');
                            }}
                            style={styles.addNewListBtn}>
                            <Text style={styles.addNewListBtnText}>
                              New List
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      renderItem={({item, index}) => {
                        return <AddListCard />;
                      }}
                    />
                  )}
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Guide to LA'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showCollections}
                    onDownPress={() => {
                      setShowCollections(!showCollections);
                    }}
                  />
                  {showCollections ? (
                    <FlatList
                      data={[1, 2,]}
                      keyExtractor={(_,index)=>index.toString()}
                      ItemSeparatorComponent={() => (
                        <View style={{height: hp(4)}} />
                      )}
                      ListFooterComponent={() => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setCollectionModal(true);
                              setNewListShow(true);
                              setNewListShowTitle('Guide to LA');
                            }}
                            style={styles.addNewListBtn}>
                            <Text style={styles.addNewListBtnText}>
                              New List
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      renderItem={({item, index}) => {
                        return <AddListCard />;
                      }}
                    />
                  ): null}
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Golf Courses'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showCalendar}
                    onDownPress={() => {
                      setShowCalendar(!showCalendar);
                    }}
                  />
                  <HeaderTextIcon
                    titleStyle={styles.titleStyle}
                    title={'Cool Architecture'}
                    headerStyle={[styles.headerstyle, {marginTop: 10}]}
                    show={showSavedCollections}
                    onDownPress={() => {
                      setShowSavedCollections(!showSavedCollections);
                    }}
                  />
                </View>
              </LinearView>
            </View>
            <Button
              type="outline"
              BtnStyle={styles.btn}
              title="New Collection"
              onPress={() => {
                setCollectionModal(true);
                setNewListShow(false);
              }}
            />
            <Button type="outline" BtnStyle={styles.btn} title="Done" />
            <CollectionModal
              visible={collectionModal}
              title={
                newListShow ? `New List: ${newListShowTitle}` : 'New Collection'
              }
              subInput={newListShow ? 'List Name' : 'Collection Name'}
              onClose={() => {
                setCollectionModal(false);
              }}
            />
          </View>
        }
      />
  );
};

export default memo(AddToListBottomSheet);

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
    borderTopWidth:2,
    borderColor:"red"
  },
  contentContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: wp(21),
  },

    icons: {
    width: wp(26),
    height: wp(26),
    resizeMode: 'contain',
  },

   optionContainer: {
    backgroundColor: '#4444441A',
    borderRadius: 16,
    marginTop: hp(16),
    overflow: 'hidden',
    marginBottom: hp(8),
  },
  listContainer: {
    borderRadius: 0,
  },
  titleStyle: {
    ...commonFontStyle(600, 14, colors.black),
  },
  containerStyle: {
    padding: wp(16),
  },
  bg: {
    flex: 1,
    paddingVertical: hp(11),
    paddingHorizontal: wp(8),
  },
  icon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
    titleStyle: {
    ...commonFontStyle(600, 14, colors.black),
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


  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imgStyle: {
    flex: 1,
  },
  cardTitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    alignSelf: 'flex-end',
    // tintColor: colors.white,
  },
  headerstyle: {
    paddingBottom: hp(9),
    marginTop: 0,
  },
  btn: {
    marginTop: hp(8),
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    padding: wp(16),
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
    marginBottom: 10,
  },
  placeholder: {
    ...commonFontStyle(500, 18, '#3C3C4399'),
  },
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(12),
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 4,
  },
  icon1: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
  },
  cardText: {
    ...commonFontStyle(500, 14, '#3C3C4399'),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '62%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.5,
    marginRight: 10,
  },
  BGcard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    // paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '32%',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 0.4,
  },
  Eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(8),
  },
  guiderow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(12),
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  guideTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  headerlabel: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  list: {
    flex: 1,
  },
  earnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    marginTop: hp(12),
    height: hp(280),
    gap: hp(8),
  },
  earntitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  earnImg: {
    borderRadius: 20,
  },
  discription: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
  },
  hostbtn: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  hosttitle: {
    ...commonFontStyle(600, 12, colors._444444),
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
  },
  location: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(16),
  },
  eventTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  locationHeaderText: {
    ...commonFontStyle(500, 15, '#444444'),
  },
  locationHeaderText1: {
    ...commonFontStyle(400, 15, '#444444'),
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  subscribeBtn: {
    marginTop: 10,
    backgroundColor: colors.primary1,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  subscribeText: {
    ...commonFontStyle(700, 16, colors.white),
  },
  addNewListBtn: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#787878',
  },
  addNewListBtnText: {
    ...commonFontStyle(600, 13, '#787878'),
  },
});
