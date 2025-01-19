import { CardContent, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';

type ContainerProps = {
  minHeight?: number;
  title: string;
  body?: string;
  children?: React.ReactNode;
};

export default function Container({
  minHeight = 100,
  title,
  body,
  children,
}: ContainerProps) {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: minHeight,
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
          }}
        >
          <Typography variant="h5" component="h2" style={{ paddingBottom: 5 }}>
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
