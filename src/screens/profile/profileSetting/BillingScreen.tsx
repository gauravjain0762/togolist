import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../../theme/appStyles';
import {CustomHeader, LinearView} from '../../../component';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {IMAGES} from '../../../assets/Images';

type Props = {};

const BillingScreen = (props: Props) => {
  const billingOptions = [
    {
      title: 'Payment methods',
      icon: IMAGES.payment_icon,
      onPress: () => {},
    },
    {
      title: 'Your payments',
      icon: IMAGES.yourPayment,
      onPress: () => {},
    },
    {
      title: 'Credit & coupons',
      icon: IMAGES.card_icon,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader  showBack={true} title="Settings" showSearch={false} showMore={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 16, flex: 1}}>
        <LinearView>
          <View style={{padding: 24}}>
            <Text style={styles.header}>Billing</Text>
            {billingOptions.map((item, index) => (
              <View key={item.title}>
                <TouchableOpacity style={styles.row} onPress={item.onPress}>
                  <Image
                    source={item?.icon}
                    style={{
                      width: 22,
                      height: 22,
                      resizeMode: 'contain',
                      marginRight: 12,
                    }}
                  />

                  <Text style={styles.title}>{item.title}</Text>
                  <Image
                    source={IMAGES.right_side}
                    style={{width: 7, height: 12}}
                  />
                </TouchableOpacity>
                {index == 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillingScreen;

const styles = StyleSheet.create({
  heading: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 20,
    marginTop: 8,
  },

  header: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    ...commonFontStyle(600, 16, colors.black),
    flex: 1,
  },
  chevron: {
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
  },
});
