import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Tag from '../components/Tag';
import { Stack } from '@mui/material';
import { Grid } from '@mui/joy';
import { ConversationCardProps } from '../types/Notes';

export default function ConversationCard({ note }: ConversationCardProps) {
  const navigate = useNavigate();

  // Convert the numerical timestamp to a Date object
  const messageDate = new Date(note.messageAt);

  // Format the date as desired
  const formattedDate = messageDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{
        width: 350,
        cursor: 'pointer',
        boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
        },
      }}
      onClick={() =>
        navigate(`/conversation/${note.title}`, { state: { note } })
      }
    >
      <CardContent>
        <Stack>
          <Typography
            textColor="success.plainColor"
            sx={{ fontWeight: 'md', textAlign: 'left' }}
          >
            Conversation - {note.title}
          </Typography>
          {formattedDate && (
            <Typography
              level="body-xs"
              sx={{ textAlign: 'left', color: 'text.secondary' }}
            >
              {formattedDate}
            </Typography>
          )}
        </Stack>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          {note.tag2 && (
            <Grid xs={3}>
              <Tag text={note.tag2} />
            </Grid>
          )}
          {note.tag3 && (
            <Grid xs={3}>
              <Tag text={note.tag3} />
            </Grid>
          )}
          {note.tag4 && (
            <Grid xs={3}>
              <Tag text={note.tag4} />
            </Grid>
          )}
          {note.tag5 && (
            <Grid xs={3}>
              <Tag text={note.tag5} />
            </Grid>
          )}
        </Grid>
      </CardContent>

      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: 'vertical-rl',
          justifyContent: 'center',
          fontSize: 'xs',
          fontWeight: 'xl',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        {note.tag1}
      </CardOverflow>
    </Card>
  );
}
