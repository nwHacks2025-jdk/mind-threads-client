import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/joy';
import { StackedBarChartProps } from '../types/MemberStats';
import { getSortedUniqueDates, createDataMap } from '../util/userStats';

export default function StackedBarChart({
  individualData,
  averageData,
}: StackedBarChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sortedLabels = getSortedUniqueDates(individualData, averageData);

  const individualDataMap = createDataMap(individualData, 'count');
  const averageDataMap = createDataMap(averageData, 'averageUsage');

  const individualSeriesData = sortedLabels.map(
    (label) => individualDataMap.get(label) ?? 0
  );
  const averageSeriesData = sortedLabels.map(
    (label) => averageDataMap.get(label) ?? 0
  );

  return (
    <Box sx={{ width: '100%', maxWidth: 900, overflowX: 'auto' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: sortedLabels }]}
        series={[
          {
            data: averageSeriesData,
            stack: 'total',
            color: '#D6E6C1',
            label: 'Global Average',
          },
          {
            data: individualSeriesData,
            stack: 'total',
            color: '#F9D66C',
            label: 'You',
          },
        ]}
        style={{ width: '100%', height: '50vh', color: 'black' }}
      />
    </Box>
  );
}
