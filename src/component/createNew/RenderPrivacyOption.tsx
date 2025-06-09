import React, {FC, memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';

interface RenderPrivacyOptionProps {
  type: 'public' | 'private';
  selected: 'public' | 'private';
  setSelected: React.Dispatch<React.SetStateAction<'public' | 'private'>>;
}

const RenderPrivacyOption: FC<RenderPrivacyOptionProps> = ({
  type,
  selected,
  setSelected,
}) => {
  const isSelected = selected === type;
  const icon = type === 'public' ? IMAGES.public : IMAGES.lock;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.privacyOption}
      onPress={() => setSelected(type)}>
      <Image
        source={icon}
        style={[
          styles.privacyIcon,
          {tintColor: isSelected ? '#fff' : '#D1D1D1'},
        ]}
      />
      <Text style={[styles.label, {color: isSelected ? '#fff' : '#D1D1D1'}]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
      <View
        style={[
          styles.radioOuter,
          {borderColor: isSelected ? colors.primary1 : '#D1D1D1'},
        ]}>
        <View
          style={[
            styles.radioInner,
            {backgroundColor: isSelected ? colors.primary1 : '#D1D1D1'},
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(RenderPrivacyOption);

const styles = StyleSheet.create({
  privacyOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  label: {
    marginLeft: 8,
    flex: 1,
    ...commonFontStyle(600, 16, colors.white),
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
