import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {commonFontStyle} from '../../theme/fonts';
import ImageCropPicker from 'react-native-image-crop-picker';

const ImagePickerModal = ({actionSheet, setActionSheet}) => {
  const [image, setimage] = useState(undefined);

  const handleSelect = (action: string) => {
    console.log(`User selected: ${action}`);
    setActionSheet(false);
    // Add your logic here (e.g., open camera or image picker)
  };

  const closeActionSheet = () => setActionSheet(false);

  const openPicker = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
    }).then(image => {
      if (Platform.OS == 'android') {
        image.sourceURL = image.path;
      } else {
        if (image.sourceURL == null) {
          image.sourceURL = image.path;
        }
      }
      let temp = {...image, name: 'image_' + new Date().getTime() + '.png'};
      setimage(temp);

      closeActionSheet();
    });
  };
  const openGallery = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      if (Platform.OS == 'android') {
        image.sourceURL = image.path;
      } else {
        if (image.sourceURL == null) {
          image.sourceURL = image.path;
        }
      }
      let temp = {...image, name: image.path.split('/').pop()};
      setimage(temp);
      closeActionSheet();
    });
  };

  return (
    <>
      <Modal
        isVisible={actionSheet}
        onBackdropPress={() => setActionSheet(false)}
        style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.option1}>
            <TouchableOpacity
              style={styles.option2}
              onPress={() => openGallery('library')}>
              <Text style={styles.text}>Select From Library</Text>
            </TouchableOpacity>
            <View
              style={{borderWidth: 0.5, width: '100%', borderColor: '#ECECEC'}}
            />
            <TouchableOpacity
              style={styles.option2}
              onPress={() => openPicker('camera')}>
              <Text style={styles.text}>Take a photo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.option, styles.cancel]}
            onPress={() => setActionSheet(false)}>
            <Text style={[styles.text, {fontWeight: '600'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    padding: 16,
  },
  option1: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
  },
  option2: {
    backgroundColor: '#fff',
    paddingVertical: 21,
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
  },
  cancel: {
    marginTop: 8,
    backgroundColor: '#f9f9f9',
  },
  text: {
    ...commonFontStyle(600, 17, colors.black),
  },
});

export default ImagePickerModal;
