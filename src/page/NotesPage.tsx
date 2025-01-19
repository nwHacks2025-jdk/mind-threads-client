import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getThreadByTag } from '../api/getThreads';
import { Note } from '../types/Notes';
import Container from '../components/ConversationCard';
import MenuBar from '../components/MenuBar';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';

export default function ThreadsPage() {
  const { tag } = useParams<{ tag: string }>();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (tag) {
      getThreadByTag('test@email.com', tag)
        .then((response) => {
          console.log(response, 'reponse data heheh');
          setNotes(response);
        })
        .catch((error) => console.error('API Error:', error));
    }
  }, [tag]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <MenuBar />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
        }}
      >
        <Grid
          container
          spacing={5}
          columns={12}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: 'center',
          }}
        >
          {notes.map((note) => (
            <Grid
              key={note.id}
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Container
                title={note.title}
                topic={note.tag1}
                tag1={note.tag2}
                tag2={note.tag3}
                tag3={note.tag4}
                tag4={note.tag5}
                messageAt={new Date(note.messageAt)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
