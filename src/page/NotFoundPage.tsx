import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, textAlign: 'center', width: '100%' }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Page Not Found
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <img
            src="/images/404.gif"
            alt="404"
            height={300}
            style={{ paddingBottom: 8 }}
          />
          <Typography variant="caption" component="i" gutterBottom>
            Oops! The page you're looking for doesn't exist.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/home')}
          sx={{ textTransform: 'none', padding: '8px 16px' }}
        >
          Go Back Home
        </Button>
      </Paper>
    </Container>
  );
}
