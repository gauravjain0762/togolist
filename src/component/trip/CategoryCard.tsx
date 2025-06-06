import {
  Image,
  ImageBackground,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';

type card = {
  Togolist?: string;
  title: string;
  viewValue: string;
  Worldwide?: string;
  Lists?: boolean;
  onCardPress: () => void;
  listCount?: number;
  BgImgStyle?: ImageStyle;
  BGStyle?: ImageStyle;
};

const CategoryCard: FC<card> = ({
  Togolist,
  title,
  Worldwide,
  Lists,
  onCardPress,
  listCount,
  BgImgStyle,
  BGStyle,
  viewValue,
  showAddList
}: any) => {
  return (
    <TouchableOpacity onPress={onCardPress}>
      <ImageBackground
        source={IMAGES.bg1} // Replace with actual pyramid image URL
        style={[styles.container, BGStyle]}
        imageStyle={[styles.image, BgImgStyle]}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.bottomRow}>
          <View style={[styles.bottomRow, {flex: 1}]}>
            {Togolist && (
              <ImageBackground
                source={IMAGES.bg5}
                resizeMode="cover"
                imageStyle={styles.image1}
                style={styles.chip}>
                <Image
                  source={IMAGES.ToglistCircleIcon}
                  style={styles.forIcon}
                />
                <Text style={styles.chipText}>{Togolist}</Text>
              </ImageBackground>
            )}

            {Lists && (
              <ImageBackground
                source={IMAGES.bg5}
                resizeMode="cover"
                imageStyle={styles.image1}
                style={styles.chip}>
                <Text style={styles.chipText}>{listCount} Places</Text>
              </ImageBackground>
            )}
          </View>

          {showAddList && (
            <TouchableOpacity onPress={onCardPress} style={styles.button}>
              <Text style={styles.buttonText}>Add to List</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(CategoryCard);

const styles = StyleSheet.create({
  container: {
    height: 116,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 12,
  },
  image: {
    borderRadius: 18,
  },
  image1: {
    borderRadius: 8,
  },
  title: {
    ...commonFontStyle(700, 24, colors.white),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 4,
  },
  chip: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
  },
  chipText: {
    marginLeft: 6,
    ...commonFontStyle(500, 13, '#FAE8D1'),
  },
  viewText: {
    marginLeft: 6,
    ...commonFontStyle(600, 16, 'rgba(255, 255, 255, 0.75)'),
  },

  heartIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  forIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  forIcon1: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  button: {
    alignSelf: 'flex-start',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  buttonText: {
    ...commonFontStyle(500, 12, colors.white),
  },
});
