import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import MenuBar from '../components/MenuBar';
import Tag from '../components/Tag';
import { LocationState } from '../types/Notes';
import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ConversationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const note = state?.note;

  if (!note) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        p={3}
      >
        <MenuBar />
        <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No conversation data available.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
    >
      <MenuBar />

      <Box
        display="flex"
        width="100%"
        maxWidth={800}
        alignItems="center"
        mb={2}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          color="success"
        >
          Back
        </Button>
      </Box>

      <Paper elevation={3} sx={{ width: '100%', maxWidth: 800, padding: 3 }}>
        <Container title={note.title} />

        <Stack
          direction="row"
          spacing={{ xs: 0.5, sm: 1 }}
          flexWrap="wrap"
          justifyContent="center" // Center align tags on mobile
          sx={{
            gap: { xs: 0.5, sm: 1 }, // Control spacing responsively
          }}
        >
          {note.tag1 && <Tag text={note.tag1} medium />}
          {note.tag2 && <Tag text={note.tag2} medium />}
          {note.tag3 && <Tag text={note.tag3} medium />}
          {note.tag4 && <Tag text={note.tag4} medium />}
          {note.tag5 && <Tag text={note.tag5} medium />}
        </Stack>

        <Box mt={3}>
          <Container title="Summary" body={note.summary} />
        </Box>

        <Box mt={3}>
          <Container title="Real Conversation" body={note.gptResponse} />
        </Box>
      </Paper>
    </Box>
  );
}
