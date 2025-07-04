import React, {useState} from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import LinearView from '../common/LinearView';
import {commonFontStyle} from '../../theme/fonts';

const CollectionModal = ({visible, onClose,title,subInput}) => {
  const [collectionName, setCollectionName] = useState('');

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Input */}
          <LinearView containerStyle={styles.inputContainer}>
            <TextInput
              placeholder={subInput}
              placeholderTextColor="#B0B0B0"
              style={styles.input}
              value={collectionName}
              onChangeText={setCollectionName}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Image
                source={IMAGES.camera1} // Replace with your icon
                style={{width: 32, height: 32,resizeMode:'contain'}}
              />
            </TouchableOpacity>
          </LinearView>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CollectionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '85%',
    padding: 16,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    ...commonFontStyle(500, 16, '#BD2332'),
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    // backgroundColor: '#F5F5F5',
    // borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: Platform.OS == 'ios' ? 8 : 0,
    alignItems: 'center',
    // marginBottom: 20,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    ...commonFontStyle(700, 24, 'rgba(0, 0, 0, 0.25)'),
  },
  cameraIcon: {
    paddingLeft: 8,
  },
  doneButton: {
    borderColor: '#BD2332',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  doneButtonText: {
    ...commonFontStyle(500, 16, '#BD2332'),
  },
});
