import {StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {colors} from '../../theme/colors';

type chart = {
  pieData?: any;
  radius?: number;
  innerRadius?: number;
  initialAngle?: number;
  centerLabelComponent?: ReactNode;
};

const ProgressRingChart: FC<chart> = ({
  pieData,
  radius = 40,
  innerRadius = 28,
  initialAngle = -0.7,
  centerLabelComponent,
}) => {
  return (
    <View>
      <PieChart
        donut
        radius={radius}
        innerRadius={innerRadius}
        innerCircleColor={'rgba(243,243,243,1)'}
        showTextBackground
        innerCircleBorderColor={colors.white}
        innerCircleBorderWidth={1}
        data={pieData}
        strokeWidth={1}
        strokeColor={colors.white}
        initialAngle={initialAngle}
        centerLabelComponent={() => centerLabelComponent}
      />
    </View>
  );
};

export default ProgressRingChart;

const styles = StyleSheet.create({});
