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
import TextField from '@mui/material/TextField';  // <--- Import a TextField
import Tag from '../components/Tag';

export default function ThreadsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [displayNotes, setDisplayNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // NEW: State for the search input
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch notes by tag from the server (or all if no tag in URL).
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

// Create a filtered version of displayNotes
  const filteredNotes = displayNotes.filter((note) => {
    // Convert the search term to lowercase
    const lowerSearch = searchTerm.toLowerCase();

    // Filter by tag1 only.
    // Make sure to handle the case where tag1 might be empty or undefined.
    return note.tag1?.toLowerCase().includes(lowerSearch);
  });

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

      <Box sx={{ display: 'flex', maxWidth: 400, marginBottom: 2 }}>
        <TextField
          label="Search for tags"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
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
        ) : filteredNotes.length > 0 ? (
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
            {filteredNotes.map((note) => (
              <Grid
                key={note.id}
                xs={12}
                sm={6}
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