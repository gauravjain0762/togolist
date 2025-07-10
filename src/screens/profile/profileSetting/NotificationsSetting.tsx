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

const NotificationsSetting = (props: Props) => {
  const [likeNotifs, setLikeNotifs] = useState(true);
  const [commentNotifs, setCommentNotifs] = useState(false);
  const [savedNotifs, setSavedNotifs] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader  showBack={true} title="Settings" showSearch={false} showMore={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 16, flex: 1}}>
        <LinearView>
          <View style={{padding: 24}}>
            <Text style={styles.header}>Notifications</Text>
            <View style={styles.row}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Like Notifications</Text>
                <Text style={styles.subtitle}>Someone liked your list!</Text>
              </View>
              {/* <Switch
                value={likeNotifs}
                onValueChange={setLikeNotifs}
                trackColor={{false: '#ccc', true: '#b2182b'}}
                thumbColor="#fff"
              /> */}
              <CustomToggle value={likeNotifs} onValueChange={setLikeNotifs} />
            </View>

            <View style={styles.row}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Comment Notifications</Text>
                <Text style={styles.subtitle}>
                  Someone commented on your list!
                </Text>
              </View>

              <CustomToggle
                value={commentNotifs}
                onValueChange={setCommentNotifs}
              />
            </View>

            <View style={[styles.row, styles.lastRow]}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Saved Lists</Text>
                <Text style={styles.subtitle}>Someone saved your list!</Text>
              </View>

              <CustomToggle
                value={savedNotifs}
                onValueChange={setSavedNotifs}
              />
            </View>
          </View>
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsSetting;

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
    // borderBottomWidth: 0,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...commonFontStyle(700, 16, colors.black),
    marginBottom: 2,
  },
  subtitle: {
    ...commonFontStyle(400, 11, '#787878'),
  },
});
