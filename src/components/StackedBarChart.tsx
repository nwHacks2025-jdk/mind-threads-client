import { BarChart } from '@mui/x-charts/BarChart';

const data = [
  { label: 'Jan 12', values: [60, 50] },
  { label: 'Jan 13', values: [60, 30] },
  { label: 'Jan 14', values: [60, 20] },
  { label: 'Jan 15', values: [40, 30] },
  { label: 'Jan 16', values: [60, 20] },
  { label: 'Jan 17', values: [70, 10] },
  { label: 'Jan 18', values: [90, 0] },
];

export default function StackedBarChart() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.map((item) => item.label) }]}
      series={[
        {
          data: data.map((item) => item.values[0]),
          stack: 'total',
          color: '#333',
        },
        { data: data.map((item) => item.values[1]), stack: 'total' },
      ]}
      width={500}
      height={300}
    />
  );
}
