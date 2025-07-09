import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import HeaderTextIcon from '../common/HeaderTextIcon';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

interface Props {
  title: string;
  show: boolean;
  setShow: (value: boolean) => void;
  data: any[];
  onAddPress: () => void;
  headerStyle?: any;
  titleStyle?: any;
  addButtonText?: string;
}

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

const ExpandableListSection: React.FC<Props> = ({
  title,
  show,
  setShow,
  data,
  onAddPress,
  headerStyle,
  titleStyle,
  addButtonText = 'New List',
}) => {
  const [showPersonal, setShowPersonal] = useState(true);

  return (
    <View style={headerStyle}>
      <HeaderTextIcon
        title={title}
        show={showPersonal}
        titleStyle={styles.titleStyle}
        headerStyle={styles.headerstyle}
        onDownPress={() => setShowPersonal(!showPersonal)}
      />

      {showPersonal && (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{height: hp(4)}} />}
          ListFooterComponent={() => {
            if (data?.length == 0) {
              return null;
            }
            return (
              <TouchableOpacity
                onPress={onAddPress}
                style={styles.addNewListBtn}>
                <Text style={styles.addNewListBtnText}>{addButtonText}</Text>
              </TouchableOpacity>
            );
          }}
          renderItem={({item, index}) => <AddListCard />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    ...commonFontStyle(600, 14, colors.black),
  },
  headerstyle: {
    paddingBottom: hp(9),
    marginTop: 0,
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
  bg: {
    flex: 1,
    paddingVertical: hp(11.5),
    paddingHorizontal: wp(8),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    alignSelf: 'flex-end',
    // tintColor: colors.white,
  },
});

export default ExpandableListSection;
