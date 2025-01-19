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
        padding: 2,
        backgroundColor: '#FAFAFA',
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
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontSize: '4rem',
                color: '#32E57E',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {value}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontSize: '3rem',
                color: '#32E57E',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              %
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: '1.5rem',
              color: '#1F2937',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Global Top 🏅
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}
