import React, {memo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Image,
} from 'react-native';
import {commonFontStyle} from '../../theme/fonts';
import {useTheme} from '@react-navigation/native';
import {IMAGES} from '../../assets/Images';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  showToggle?: boolean;
  errorMsg?: string;
  onToggleSecure: any;
  isSecureVisible: any;
  secureTextEntry: any;
  keyValue: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  required = false,
  errorMsg,
  showToggle,
  isSecureVisible,
  onToggleSecure,
  secureTextEntry,
  keyValue,
  value,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getGlobalStyles({colors}), [colors]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: errorMsg ? 1 : 1,
          borderColor: errorMsg ? '#BD2332CC' : '#fff',
          backgroundColor: errorMsg ? '#FFF2F2' : '#fff',
        },
      ]}>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholderTextColor="#3C3C4399"
          secureTextEntry={passwordVisible}
          value={value}
          style={[styles.input]}
          {...rest}
        />
        {keyValue == 'username' && value?.length !== 0 && (
          <View>
            <Image source={IMAGES.right} style={{width: 22, height: 22}} />
          </View>
        )}
        {showToggle && (
          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!passwordVisible);
            }}>
            <Image
              source={
                passwordVisible ? IMAGES.visibility : IMAGES.visibility_off
              }
              style={{width: 22, height: 22, tintColor: '#AFAEAE'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getGlobalStyles = (props: any) => {
  const {colors} = props;
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginHorizontal: 20,
      borderRadius: 14,
      padding: 16,
    },
    errorText: {
      ...commonFontStyle(500, 13, colors.error),
      marginBottom: 7,
    },
    required: {
      color: 'red',
    },
    input: {
      padding: 0,
      margin: 0,
      ...commonFontStyle(500, 18, colors.black),
      flex: 1,
    },
  });
};

export default memo(CustomTextInput);
