import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getThreadByTag } from '../api/getThreads';
import { Note } from '../types/Notes';
import ConversationCard from '../components/ConversationCard';
import MenuBar from '../components/MenuBar';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Tag from '../components/Tag';

export default function ThreadsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [displayNotes, setDisplayNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const email = localStorage.getItem('email') || '';
    setIsLoading(true);

    if (tag) {
      getThreadByTag(email, tag)
        .then((response) => {
          setDisplayNotes(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API Error (getThreadByTag):', error);
          setIsLoading(false);
        });
    } else {
      getThreadByTag(email)
        .then((response) => {
          setDisplayNotes(response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API Error (getThreadByTag):', error);
          setIsLoading(false);
        });
    }
  }, [tag]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MenuBar />
      <div style={{ display: 'flex', paddingTop: 20, paddingBottom: 30 }}>
        <Tag large text={tag || 'All'} />
      </div>
      <Box
        sx={{
          flexGrow: 1,
          // overflowY: 'auto',
          padding: 2,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
            }}
          >
            <CircularProgress color="success" />
          </Box>
        ) : displayNotes.length > 0 ? (
          <Grid
            container
            spacing={5}
            columns={12}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'stretch',
            }}
          >
            {displayNotes.map((note) => (
              <Grid
                key={note.id}
                xs={12}
                md={4}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ConversationCard note={note} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No conversations found</Typography>
        )}
      </Box>
    </Box>
  );
}
