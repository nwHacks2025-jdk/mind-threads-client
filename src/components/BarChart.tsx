import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/joy';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 50 },
  { label: 'Mar', value: 80 },
  { label: 'Apr', value: 45 },
  { label: 'May', value: 70 },
];

export default function SimpleBarChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', maxWidth: 700, overflowX: 'auto' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map((item) => item.label) }]}
        series={[{ data: data.map((item) => item.value) }]}
        width={isMobile ? 300 : 600}
        height={isMobile ? 250 : 300}
      />
    </Box>
  );
}
