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

type Props = {};

const PersonalInformation = (props: Props) => {
  const initialData = [
    {key: 'name', title: 'Name', value: 'Emily'},
    {key: 'phone', title: 'Phone number', value: ''},
    {key: 'email', title: 'Email', value: 'r****y@gmail.com'},
    {key: 'address', title: 'Address', value: ''},
  ];

  const [info, setInfo] = useState(initialData);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (itemKey: string, currentValue: string) => {
    setEditingKey(itemKey);
    setTempValue(currentValue);
  };

  const handleSave = (itemKey: string) => {
    const updated = info.map(item =>
      item.key === itemKey ? {...item, value: tempValue} : item,
    );
    setInfo(updated);
    setEditingKey(null);
  };

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader  showBack={true} title="Settings" showSearch={false} showMore={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 16, flex: 1}}>
        <LinearView>
          <View style={{padding: 16}}>
            <Text style={styles.header}>Personal Information</Text>

            {info.map((item, index) => (
              <View key={item.key}>
                <View style={styles.row}>
                  <View style={{flex: 1}}>
                    <Text style={styles.title}>{item.title}</Text>
                    {editingKey === item.key ? (
                      <TextInput
                        style={styles.input}
                        value={tempValue}
                        onChangeText={setTempValue}
                        autoFocus
                        placeholder="Enter value"
                      />
                    ) : (
                      <Text style={styles.value}>
                        {item.value || 'Not provided'}
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      editingKey === item.key
                        ? handleSave(item.key)
                        : handleEdit(item.key, item.value)
                    }>
                    <Text style={styles.edit}>
                      {editingKey === item.key ? 'Save' : 'Edit'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {index !== 0 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal:16
  },
  title: {
    ...commonFontStyle(700, 16, colors.black),
    marginBottom:6
  },
  value: {
    ...commonFontStyle(400, 12, colors.gray),
    marginTop: 2,
  },
  input: {
    ...commonFontStyle(400, 12, colors.black),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 2,
    paddingVertical: 2,
  },
  edit: {
    ...commonFontStyle(600, 14, colors.black),
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 5,
  },
});
