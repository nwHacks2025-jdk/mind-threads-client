import { CardContent, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';

type BarTitleContainerProps = {
  height?: number;
  title: string;
  body?: string;
  children?: React.ReactNode;
};

export default function BarTitleContainer({
  height,
  title,
  body,
  children,
}: BarTitleContainerProps) {
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
        padding: 0,
        backgroundColor: '#FAFAFA'
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
            marginBottom: 3,
          }}
        >
          <Typography variant="h5" component="h2" sx={{fontWeight: 600}}>
            {title}
          </Typography>
        </Box>
        {body && (
          <Typography variant="body2" component="p">
            {body}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
