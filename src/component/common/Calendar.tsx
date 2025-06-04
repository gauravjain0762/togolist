import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';
import {commonFontStyle, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs('2025-04-01'));
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev =>
      direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month'),
    );
    setSelectedDates([]);
  };

  const toggleDate = (date: dayjs.Dayjs) => {
    const exists = selectedDates.some(d => d.isSame(date, 'date'));
    setSelectedDates(prev =>
      exists ? prev.filter(d => !d.isSame(date, 'date')) : [...prev, date],
    );
  };

  const generateDays = () => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startWeekday = (startOfMonth.day() + 6) % 7; // Monday = 0

    const days: {date: dayjs.Dayjs; isCurrentMonth: boolean}[] = [];

    // Previous month
    const prevMonth = currentDate.subtract(1, 'month');
    const prevMonthEnd = prevMonth.endOf('month');
    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = prevMonthEnd.subtract(i, 'day');
      days.push({date, isCurrentMonth: false});
    }

    // Current month
    for (let i = 1; i <= endOfMonth.date(); i++) {
      const date = currentDate.date(i);
      days.push({date, isCurrentMonth: true});
    }

    // Next month (fill remaining cells to make 35 total)
    const nextMonth = currentDate.add(1, 'month');
    let nextDay = 1;
    while (days.length < 35) {
      const date = nextMonth.date(nextDay++);
      days.push({date, isCurrentMonth: false});
    }

    // Ensure exactly 35 days (5 rows)
    return days.slice(0, 35);
  };

  const days = generateDays();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>{currentDate.format('MMMM YYYY')}</Text>
        <View style={{flexDirection: 'row', gap: 16}}>
          <TouchableOpacity onPress={() => changeMonth('prev')}>
            <Text style={styles.arrow}>{'‹'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeMonth('next')}>
            <Text style={styles.arrow}>{'›'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Weekdays */}
      <View style={styles.weekRow}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      <FlatList
        data={days}
        numColumns={7}
        keyExtractor={(_, i) => i.toString()}
        scrollEnabled={false}
        renderItem={({item}) => {
          const isSelected = selectedDates.some(d =>
            d.isSame(item.date, 'date'),
          );
          return (
            <TouchableOpacity
              style={[
                styles.dayCell,
                !item.isCurrentMonth && styles.selectedDayCell,
                isSelected && styles.selectedDayCell1,
              ]}
              onPress={() => toggleDate(item.date)}>
              <Text
                style={[
                  styles.dayText,
                  !item.isCurrentMonth && styles.disabledDay,
                  isSelected && styles.selectedDayText,
                ]}>
                {item.date.date()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical:20,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3C3C4399',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    paddingHorizontal: wp(10),
    ...commonFontStyle(400, 26, '#333'),
  },
  monthTitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginTop: 10,
  },
  weekDay: {
    width: wp(32),
    textAlign: 'center',
    ...commonFontStyle(600, 16, colors.black),
  },
  dayCell: {
    width: wp(32),
    height: wp(32),
    marginHorizontal: wp(8),
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D5D4DF',
  },
  selectedDayCell: {
    backgroundColor: '#E3E3E3',
  },
  selectedDayCell1: {
    backgroundColor: colors.primary1,
  },
  dayText: {
    ...commonFontStyle(400, 14, colors.black),
  },
  selectedDayText: {
    ...commonFontStyle(400, 14, colors.white),
  },
  disabledDay: {
    ...commonFontStyle(400, 14, colors.black),
  },
});

export default memo(Calendar);
