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
        minHeight: 150,
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
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={1}>
          <Typography
            textColor="success.plainColor"
            sx={{ fontWeight: 'md', textAlign: 'left' }}
          >
            {note.title}
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
          {[note.tag2, note.tag3, note.tag4, note.tag5].map((tag, index) => (
            <Grid xs={5} key={index}>
              <Tag text={tag} />
            </Grid>
          ))}
        </Grid>
      </CardContent>

      <CardOverflow
        variant="soft"
        // color="warning"
        sx={{
          px: 0.2,
          backgroundColor: '#F9D66C',
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
