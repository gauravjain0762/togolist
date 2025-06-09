import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {commonFontStyle} from '../../theme/fonts';
import LinearView from '../common/LinearView';
import {colors} from '../../theme/colors';

const NotificationCard = ({
  image,
  name,
  time,
  message,
  description,
  buttons,
  selectedBtn,
  btnLabel,
}: any) => {
  return (
    <LinearView>
      <View style={styles.row}>
        {image && <Image source={{uri: image}} style={styles.avatar} />}
        <View style={styles.content}>
          <Text style={styles.message}>
            <Text style={styles.name}>{name}</Text> {message}
          </Text>

          {description ? (
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : null}

          {buttons?.length ? (
            <View style={styles.buttonRow}>
              {selectedBtn ? (
                <Text style={[styles.buttonText1]}>{btnLabel}</Text>
              ) : (
                buttons.map(btn => (
                  <TouchableOpacity
                    key={btn.label}
                    onPress={btn.onPress}
                    style={[
                      styles.button,
                      btn.type === 'outline'
                        ? styles.outlineBtn
                        : styles.fillBtn,
                    ]}>
                    <Text
                      style={[
                        styles.buttonText,
                        btn.type === 'outline'
                          ? styles.outlineText
                          : styles.fillText,
                      ]}>
                      {btn.label}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          ) : null}

          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </LinearView>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    padding: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  message: {
    ...commonFontStyle(400, 16, '#444444'),
    lineHeight: 20,
  },
  name: {
    ...commonFontStyle(700, 16, 'black'),
  },
  descriptionBox: {
    // backgroundColor: '#F4F4F4',
    marginHorizontal: 8,
    borderRadius: 8,
    marginTop: 8,
    borderLeftWidth: 2,
    paddingHorizontal: 8,
    borderLeftColor: '#D9D9D9',
  },
  description: {
    ...commonFontStyle(500, 14, '#444444'),
    lineHeight: 18,
  },
  time: {
    ...commonFontStyle(500, 12, '#999999'),
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.primary1,
  },
  fillBtn: {
    backgroundColor: colors.primary1,
  },
  outlineBtn: {
    // backgroundColor: '#fff',
  },
  buttonText: {
    ...commonFontStyle(500, 16, 'white'), // will override below if needed
  },
  buttonText1: {
    ...commonFontStyle(500, 16, colors.primary1), // will override below if needed
  },
  fillText: {
    ...commonFontStyle(500, 16, 'white'),
  },
  outlineText: {
    ...commonFontStyle(500, 16, colors.primary1),
  },
});

export default NotificationCard;
