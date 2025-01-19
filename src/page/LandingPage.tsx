import { useState, useCallback } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');
      setLoading(true);

      try {
        const success = await login(email);

        if (success) {
          localStorage.setItem('email', email);
          authLogin();
          navigate('/home');
        } else {
          setError('Login failed. Please try again.');
        }
      } catch (err: unknown) {
        setError((err as Error).message || 'Failed to login');
      } finally {
        setLoading(false);
      }
    },
    [email, authLogin, navigate]
  );

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
        sx={{ padding: 4, textAlign: 'center', width: '100%', minWidth: 400 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            mt: 4,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
          <Typography variant="caption" component="i" gutterBottom>
            Thread Your Thoughts, Expand Your Mind
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          aria-label="Login form"
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            size="small"
            color="success"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email input field"
            disabled={loading}
          />
          {error && (
            <Typography color="error" aria-live="polite">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
