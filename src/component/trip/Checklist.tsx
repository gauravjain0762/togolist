import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

type List = {
  data?: ChecklistItem[];
};

const initialItems: ChecklistItem[] = [
  {id: '1', label: 'Three Day Mountain Trek', checked: false},
  {id: '2', label: 'Pet a Lama', checked: false},
];

const Checklist: FC<List> = ({data}) => {
  const [items, setItems] = useState<ChecklistItem[]>(data || initialItems);

  const toggleCheck = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? {...item, checked: !item.checked} : item,
    );
    setItems(updatedItems);
  };

  const renderItem = ({item}: {item: ChecklistItem}) => (
    <TouchableOpacity style={styles.item} onPress={() => toggleCheck(item.id)}>
      {/* <MaterialIcons
        name={item.checked ? 'check-box' : 'check-box-outline-blank'}
        size={22}
        color={item.checked ? colors._BD2332 : '#8A8A8A'}
      /> */}
      <Image
        source={item.checked ? IMAGES.Checkboxfill : IMAGES.Checkbox}
        style={{width: wp(20), height: wp(20)}}
      />
      <Text style={[styles.label, item.checked && styles.checkedLabel]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.addText}>Add Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checklist;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginLeft: 10,
    ...commonFontStyle(500, 14, '#787878'),
  },
  checkedLabel: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  addText: {
    ...commonFontStyle(500, 14, colors.primary1),
    marginTop: 8,
  },
});
