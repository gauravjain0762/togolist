import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {commonFontStyle} from '../../theme/fonts';
import {colors} from '../../theme/colors';

const MOCK_RESULTS = [
  'Toronto, ON, Canada',
  'Tokyo, Japan',
  'Toledo, OH, United States',
];

const LocationSearch = ({value,onChangeText}) => {
  const [filteredResults, setFilteredResults] = useState(MOCK_RESULTS);
  const [autoFod, setAutoFod] = useState(false);

  const handleSearch = (text: string) => {
    setAutoFod(true)
    onChangeText(text);
    const filtered = MOCK_RESULTS.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredResults(filtered);
  };

  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity onPress={()=>{
      onChangeText(item.toString())
      setAutoFod(false)
    }} style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropdownContainer}>
      <TextInput
        value={value}
        onChangeText={handleSearch}
        placeholder="Location"
        style={styles.input}
        placeholderTextColor="#3C3C4399"
        onFocus={()=>{
          setAutoFod(true)
        }}
        onBlur={()=>{
           setAutoFod(false)
        }}
      />

      {(autoFod) && (
        <>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.item}>
            {/* <MaterialIcons name="my-location" size={18} color="#666" style={{ marginRight: 8 }} /> */}
            <Text style={styles.itemText}>Use Current Location</Text>
          </TouchableOpacity>

          <FlatList
            data={filteredResults}
            keyExtractor={item => item}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
  },
  input: {
    padding: 0,
    margin: 0,
    ...commonFontStyle(500, 18, colors.black),
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemText: {
        ...commonFontStyle(400, 18, "#3C3C4399"),
  },
});
