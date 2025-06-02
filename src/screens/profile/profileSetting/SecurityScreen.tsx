import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
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
import CustomToggle from '../../../component/common/CustomToggle';

type Props = {};

const SecurityScreen = (props: Props) => {
  const [likeNotifs, setLikeNotifs] = useState(true);
  const [commentNotifs, setCommentNotifs] = useState(false);
  const [savedNotifs, setSavedNotifs] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader title="Settings" showSearch={false} showMore={false} />
      <ScrollView style={{marginHorizontal: 16, flex: 1}}>
        <LinearView>
          <View style={{padding: 24}}>
            <Text style={styles.header}>Security</Text>
            <View style={styles.row}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Request your personal data</Text>
              </View>

              <CustomToggle value={likeNotifs} onValueChange={setLikeNotifs} />
            </View>

            <View style={styles.row}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Third-party tools</Text>
              </View>

              <CustomToggle
                value={commentNotifs}
                onValueChange={setCommentNotifs}
              />
            </View>

            <View style={[styles.row]}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Appear in search</Text>
              </View>
              <CustomToggle
                value={savedNotifs}
                onValueChange={setSavedNotifs}
              />
            </View>
            <View style={[styles.row, styles.lastRow]}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Location Sharing</Text>
              </View>
              <CustomToggle
                value={savedNotifs}
                onValueChange={setSavedNotifs}
              />
            </View>
          </View>
        </LinearView>
        <TouchableOpacity style={styles.btnView}>
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  header: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...commonFontStyle(700, 16, colors.black),
  },
  subtitle: {
    ...commonFontStyle(400, 11, '#787878'),
  },

  btnView: {
    borderWidth: 1,
    borderColor: colors.primary1,
    paddingVertical: 15,
    marginTop:8,
    borderRadius:10
  },
  btnText: {
    ...commonFontStyle(700, 16, colors.primary1),
    textAlign:"center"
  },
});

