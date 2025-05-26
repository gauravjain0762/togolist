import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Share,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import CustomHeader from '../../component/common/CustomHeader';
import {navigationRef} from '../../navigation/RootContainer';
import {colors} from '../../theme/colors';
import {commonFontStyle, SCREEN_WIDTH} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import {useRoute} from '@react-navigation/native';

const PanditProfileScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const {params} = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const fullText = params?.item?.bio;
  const previewText = fullText.slice(0, 80) + '...';

  const shareContent = async (item: any) => {
    try {
      const result = await Share.share({
        title: params?.item?.name,
        message: params?.item?.bio,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ' + result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.mainColor} />
      <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
        <CustomHeader
          onBack={() => navigationRef.goBack()}
          onShare={() => shareContent('Share via WhatsApp')}
        />
        <ScrollView style={styles.container}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{
                // uri: params?.item?.image,
                uri:"https://as1.ftcdn.net/v2/jpg/06/51/52/56/1000_F_651525680_DERm3VNypYv6Sav4cmeZZuQoZ6YN8Ksq.jpg"
              }}
              style={styles.photo}
            />
            <View style={styles.profileText}>
              <Text style={styles.name}>{params?.item?.name}</Text>
              <TouchableOpacity onPress={()=>{
                setModalVisible(true)
              }}>
                <Image
                  source={IMAGES.qr}
                  style={{width: 100, height: 100, alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Introduction */}
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.text}>
            {expanded ? fullText : previewText}
            <TouchableOpacity style={{}} onPress={() => setExpanded(!expanded)}>
              <Text style={styles.seeMore}>
                {expanded ? 'See less' : 'See more'}
              </Text>
            </TouchableOpacity>
          </Text>

          {/* Services */}
          <Text style={styles.sectionTitle}>Service Offerings</Text>
          <Text style={styles.text}>
            • Griha Pravesh{'\n'}• Satyanarayan Pooja{'\n'}• Marriage Rituals
            {'\n'}• Havan and Homam
          </Text>
        </ScrollView>
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondary]}>
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            <Image
              source={IMAGES.qr}
              style={styles.fullImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Image
              source={IMAGES.close}
              style={{width:20,height:20}}
              resizeMode="contain"
            />
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  header: {alignItems: 'flex-end', marginBottom: 8},
  profileSection: {
    // flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {width: '100%', height: 200, borderRadius: 12, alignSelf: 'center'},
  profileText: {flex: 1},
  name: {...commonFontStyle(600, 22, colors.black), marginVertical: 12},
  qr: {width: 60, height: 60, alignSelf: 'flex-start'},
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    ...commonFontStyle(600, 18, colors.black),
  },
  text: {...commonFontStyle(600, 14, '#333')},
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#008080',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  secondary: {backgroundColor: colors.mainColor},
  buttonText: {...commonFontStyle(600, 16, colors.white)},
  seeMore: {
    color: colors.mainColor,
    fontWeight: '600',
    top: 5,
  },


  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeText: {
    color: 'white',
    fontSize: 24,
  },
});

export default PanditProfileScreen;
