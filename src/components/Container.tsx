import { CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';

type ContainerProps = {
  height?: number;
  title: string;
  body?: string;
  children?: React.ReactNode;
};

export default function Container({
  height,
  title,
  body,
  children,
}: ContainerProps) {
  return (
    <Card
      sx={{
        width: '100%',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rounded: 'xl',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {body}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
