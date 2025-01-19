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
    <Box sx={{ width: '100%', maxWidth: 900, overflowX: 'hidden' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: sortedLabels }]}
        series={[
          {
            data: averageSeriesData,
            stack: 'total',
            color: 'rgba(255, 255, 0, 0.7)',
            label: 'Average Usage',
          },
          {
            data: individualSeriesData,
            stack: 'total',
            color: 'rgba(0, 128, 0, 0.9)',
            label: 'Individual Usage',
          },
        ]}
        width={isMobile ? 400 : 800}
        height={isMobile ? 300 : 400}
      />
    </Box>
  );
}
