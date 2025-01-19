import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/joy';
import { MemberStat } from '../types/MemberStats';
interface SimpleBarChartProps {
  data: MemberStat[];
}

export default function SimpleBarChart({ data }: SimpleBarChartProps) {

  const labels = data.map((item) => {
    const [year, month, day] = item.date;
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  });

  const counts = data.map((item) => item.count);

  return (
    <Box sx={{ width: '100%', maxWidth: 700, overflowX: 'auto' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[{ data: counts, color: '#F9D66C' }]}
        style={{ width: '100%', height: '40vh', color: 'black' }}
      />
    </Box>
  );
}
