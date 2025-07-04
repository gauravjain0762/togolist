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
import React, {FC, memo} from 'react';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

const HeaderTextIcon: FC<button> = ({
  Togolist,
  title,
  Worldwide,
  Lists,
  onDownPress,
  onAddPress,
  showAddIcon,
  headerStyle,
  showDown = true,
  titleStyle,
  onPress,
  show,
}: any) => {
  return (
    <View style={[styles.headerView, headerStyle]}>
      <TouchableOpacity
        onPress={onDownPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={[commonFontStyle(700, 20, colors.black), titleStyle]}>
          {title}
        </Text>
        {showDown && (
          <Image
            source={IMAGES.down}
            style={[styles.downIcon, {transform: [{rotate: !show ? "270deg" : '0deg'}]}]}
          />
        )}
      </TouchableOpacity>
      {showAddIcon && (
        <TouchableOpacity onPress={onAddPress}>
          <Image source={IMAGES.add_icon} style={styles.addIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderTextIcon);

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },

  downIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  addIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
});
