import { BarChart } from '@mui/x-charts/BarChart';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 50 },
  { label: 'Mar', value: 80 },
  { label: 'Apr', value: 45 },
  { label: 'May', value: 70 },
];

export default function SimpleBarChart() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.map((item) => item.label) }]}
      series={[{ data: data.map((item) => item.value) }]}
      width={500}
      height={300}
    />
  );
}
