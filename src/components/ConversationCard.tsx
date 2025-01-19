import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Tag from '../components/Tag';
import { Stack } from '@mui/material';
import { Grid } from '@mui/joy';
import { ConversationCardProp } from '../types/ConversationCard';

export default function ConversationCard({
  title,
  topic,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  messageAt,
}: ConversationCardProp) {
  const navigate = useNavigate();

  const formattedDate = messageAt
    ? messageAt.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : '';

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
      onClick={() => navigate(`/conversation/${title}`)}
    >
      <CardContent>
        <Stack>
          <Typography
            textColor="success.plainColor"
            sx={{ fontWeight: 'md', textAlign: 'left' }}
          >
            Conversation - {title}
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
          {tag1 && (
            <Grid xs={3}>
              <Tag text={tag1} />
            </Grid>
          )}
          {tag2 && (
            <Grid xs={3}>
              <Tag text={tag2} />
            </Grid>
          )}
          {tag3 && (
            <Grid xs={3}>
              <Tag text={tag3} />
            </Grid>
          )}
          {tag4 && (
            <Grid xs={3}>
              <Tag text={tag4} />
            </Grid>
          )}
          {tag5 && (
            <Grid xs={3}>
              <Tag text={tag5} />
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
        {topic && topic}
      </CardOverflow>
    </Card>
  );
}
