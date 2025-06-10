import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

interface ProgressRingChartProps {
  totalDays: number;
  completedDays: number;
  segmentDays?: number[];
  progressColor?: string;
  trackColor?: string;
  radius?: number;
  strokeWidth?: number;
  segmentBorderColor?: string;
  segmentBorderWidth?: number;
  centerIcon?: React.ReactNode;
  mainText?: string;
}

const ProgressRingChart: FC<ProgressRingChartProps> = ({
  totalDays,
  completedDays,
  segmentDays = [], // Now represents 'stayed day count' for each 'step'
  progressColor = '#BD2332', // Updated fill color
  trackColor = '#D9D9D9', // Updated empty color
  radius = 80,
  strokeWidth = 15,
  segmentBorderColor = '#FFFFFF', // White border color
  segmentBorderWidth = 1, // 1px white border
  centerIcon,
  mainText = 'Days',
}) => {
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;

  // State to manage the active (clicked) segment
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(null);

  // Combine main progress and segment days to form all parts of the circle
  // We'll treat `completedDays` as the first segment, and then add `segmentDays`.
  // If `segmentDays` are meant to be *in addition* to `completedDays` and *distinct*
  // segments, we handle them separately.
  // Given "show 3 staps in chart", it implies `segmentDays` defines the 3 steps,
  // or `completedDays` is one and `segmentDays` are the remaining two.
  // Let's assume `segmentDays` defines the total 'steps' including the initial completedDays.
  // For simplicity, let's assume `segmentDays` explicitly defines all the sections.
  // The user mentioned "i pass trip count 3 and add stayed day count".
  // This implies `segmentDays` should contain all the counts for the 3 trips.
  // So, let's use `segmentDays` as the primary source for defining slices.
  // If `segmentDays` is empty, we fall back to `completedDays`.

  const segmentsData =
    segmentDays.length > 0
      ? segmentDays
      : [completedDays, totalDays - completedDays];

  // Calculate percentages and angles for each segment
  let currentAngle = 0; // Start at 0 degrees (top of the circle)
  const segments = [];

  segmentsData.forEach((days, index) => {
    if (days <= 0 || totalDays <= 0) {
      // Skip if days are zero or totalDays is invalid
      return;
    }
    const angle = (days / totalDays) * 360;
    segments.push({
      index: index,
      days: days,
      percentage: days / totalDays,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
    });
    currentAngle += angle;
  });

  // If there's any remaining unallocated portion, fill it with track color
  // This helps when sum of segmentsData is less than totalDays
  if (currentAngle < 360) {
    segments.push({
      index: -1, // Denotes the remaining track
      days: totalDays - segments.reduce((sum, s) => sum + s.days, 0),
      percentage:
        (totalDays - segments.reduce((sum, s) => sum + s.days, 0)) / totalDays,
      startAngle: currentAngle,
      endAngle: 360,
    });
  }

  const centerX = diameter / 2;
  const centerY = diameter / 2;

  // Function to calculate path for an arc segment
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const startAngleRad = ((startAngle - 90) * Math.PI) / 180.0;
    const endAngleRad = ((endAngle - 90) * Math.PI) / 180.0;

    const start = {
      x: x + radius * Math.cos(endAngleRad),
      y: y + radius * Math.sin(endAngleRad),
    };
    const end = {
      x: x + radius * Math.cos(startAngleRad),
      y: y + radius * Math.sin(startAngleRad),
    };

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    // The inner arc for the border
    const innerRadius = radius - strokeWidth;
    const innerStart = {
      x: x + innerRadius * Math.cos(endAngleRad),
      y: y + innerRadius * Math.sin(endAngleRad),
    };
    const innerEnd = {
      x: x + innerRadius * Math.cos(startAngleRad),
      y: y + innerRadius * Math.sin(startAngleRad),
    };

    // Constructing path for a donut segment
    const pathData = [
      'M',
      start.x,
      start.y, // Move to start of outer arc
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y, // Draw outer arc
      'L',
      innerEnd.x,
      innerEnd.y, // Line to end of inner arc
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y, // Draw inner arc (swept opposite)
      'Z', // Close path
    ].join(' ');

    return pathData;
  };

  return (
    <View style={styles.container}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}>
        {/* Render each segment */}
        {segments.map((segment, index) => {
          // Determine color based on active segment
          const fillColor =
            activeSegmentIndex === segment.index
              ? progressColor // Fill color if active
              : trackColor; // Empty color if not active or track

          // For the border, we'll draw two arcs: one for the segment and one for the gap/border.
          // Or, simplify by rendering the main track with a slightly larger stroke and then the segments.
          // A simple approach for 1px white border is to draw a slightly larger circle in white first.
          // However, for distinct segments, we need proper paths.

          // Using Circles and strokeDashoffset for segments is visually simpler but makes
          // adding a *border between* segments tricky with standard SVG Circle properties.
          // To get a true border *between* segments, one might use `<Path>` elements
          // or render multiple circles with slight offsets.
          // The current `Circle` based approach for `strokeDashoffset` is for a continuous line.
          // For distinct segments, a different rendering approach is needed.

          // Let's re-evaluate the rendering for segments to support distinct segments with borders.
          // Using `Path` for each segment allows for precise shapes and borders.

          // For a donut segment with a border, we can draw the segment's filled path
          // and then a slightly larger path in white underneath it.
          // This requires careful calculation of the inner and outer radii for the border.

          // Let's stick with the simpler `Circle` approach but make them separate for click events.
          // To achieve the border, we can render the main track first with `strokeWidth + 2*segmentBorderWidth`,
          // then render the segments with `strokeWidth` on top, leaving a gap. This is complex.

          // A more direct way to show a border is to draw a segment circle with `strokeWidth + 2*segmentBorderWidth`
          // in `segmentBorderColor` and then draw the actual segment circle with `strokeWidth`
          // in its `fillColor` on top of it. This will create a border.

          // Let's create an arc for each segment for the fill and then draw the white border.
          const radiusWithBorder = radius + segmentBorderWidth;
          const strokeWidthWithBorder = strokeWidth + 2 * segmentBorderWidth;

          // Note: Svg.Circle's strokeDashoffset starts from 0 degrees (right side),
          // and its stroke starts from the top after rotation by -90.
          // `strokeDashoffset` applies to the *entire* circle. For distinct segments,
          // we should calculate individual arc paths.

          // Let's revert to the Path approach for segments with borders.

          // No need for a clickable component if we use the entire circle as a single element.
          // If we want each *segment* to be clickable, then each segment needs its own SVG element
          // and its own `TouchableWithoutFeedback`.

          // Given the request "when click 1 so fill this part with fill color and other one is empty",
          // it implies each segment is clickable.

          // For each segment:
          // 1. Calculate path data (outer arc, inner arc, lines to connect)
          // 2. Wrap it in a `TouchableWithoutFeedback` to capture clicks.
          // 3. Apply the correct fill color based on `activeSegmentIndex`.

          // Adjust radius for internal drawing of path to account for strokeWidth.
          // The Path should trace the *center* of the stroke.
          const pathRadius = radius - strokeWidth / 2;
          const innerPathRadius = radius - strokeWidth / 2; // Will be used for the inner edge of the stroke

          return (
            <TouchableWithoutFeedback
              key={`segment-${segment.index}`}
              onPress={() =>
                setActiveSegmentIndex(
                  segment.index === activeSegmentIndex ? null : segment.index,
                )
              }>
              <G>
                {/* Background segment (for border) */}
                <Circle
                  cx={centerX}
                  cy={centerY}
                  r={radius} // This r represents the outer edge of the stroke
                  stroke={segmentBorderColor}
                  strokeWidth={strokeWidth + 2 * segmentBorderWidth} // Thicker white stroke
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - circumference * segment.percentage
                  }
                  strokeLinecap="butt"
                  rotation={`${segment.startAngle - 90}`} // Rotate to start from top
                  origin={`${centerX}, ${centerY}`}
                />
                {/* Actual segment fill */}
                <Circle
                  cx={centerX}
                  cy={centerY}
                  r={radius} // This r represents the outer edge of the stroke
                  stroke={fillColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - circumference * segment.percentage
                  }
                  strokeLinecap="butt"
                  rotation={`${segment.startAngle - 90}`} // Rotate to start from top
                  origin={`${centerX}, ${centerY}`}
                />
              </G>
            </TouchableWithoutFeedback>
          );
        })}
      </Svg>
      <View style={styles.centerContent}>
        {centerIcon}
        <Text style={styles.completedDaysText}>
          {
            activeSegmentIndex !== null
              ? segmentsData[activeSegmentIndex] || 0 // Show days of active segment
              : completedDays // Show main completed days if no segment is active
          }
        </Text>
        <Text style={styles.mainText}>{mainText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 20,
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedDaysText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  mainText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProgressRingChart;
