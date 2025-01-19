import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Tag from './Tag';
import { Stack } from '@mui/material';
import { Grid } from '@mui/joy';

export default function ConversationCard() {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: 350, cursor: 'pointer' }}
      onClick={() => (window.location.href = 'conversation')}
    >
      <CardContent>
        <Stack>
          {/* TODO: update conversation title */}
          <Typography
            textColor="success.plainColor"
            sx={{ fontWeight: 'md', textAlign: 'left' }}
          >
            Conversation
          </Typography>
          {/* TODO: update date and time */}
          <Typography level="body-xs" sx={{ textAlign: 'left' }}>
            Date/Time
          </Typography>
        </Stack>

        {/* TODO: update tags */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid xs={3}>
            <Tag text="Tag#1" />
          </Grid>
          <Grid xs={3}>
            <Tag text="Tag#2" />
          </Grid>
          <Grid xs={3}>
            <Tag text="Tag#3" />
          </Grid>
          <Grid xs={3}>
            <Tag text="Tag#4" />
          </Grid>
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
        Topic
      </CardOverflow>
    </Card>
  );
}
