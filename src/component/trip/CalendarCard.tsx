import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '../../assets/Images';
import { commonFontStyle, wp } from '../../theme/fonts';
import { colors } from '../../theme/colors';

const CalendarCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={IMAGES.calnder} // put calendar icon here
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Add from Calendar</Text>
        <Text style={styles.subtitle}>
          Sync your calendar to plan trips{'\n'}and stay organized
        </Text>
      </View>
      <View style={styles.radioCircle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    width: wp(40),
    height: wp(40),
    resizeMode: 'contain',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...commonFontStyle(700, 13, "#1B1515"), // You specified this
    marginBottom: 4,
    marginTop:2
  },
  subtitle: {
    ...commonFontStyle(400, 12, "#A6A6A6"), // example for subtitle
    lineHeight: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1B1515',
    alignSelf:"flex-start"
  },
});

export default memo(CalendarCard);

