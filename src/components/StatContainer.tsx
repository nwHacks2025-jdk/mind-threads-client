import { CardContent, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';

type StatContainerProps = {
  height?: number;
  value: number;
  body?: string;
  children?: React.ReactNode;
};

export default function StatContainer({
  height,
  value,
  children,
}: StatContainerProps) {
  return (
    <Card
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        boxShadow: 3,
        padding: 2,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: '32px',
              color: 'primary.main',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '8px 0',
            }}
          >
            {value} days this week
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
