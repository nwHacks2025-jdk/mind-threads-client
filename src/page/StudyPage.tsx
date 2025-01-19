import Container from '../components/ConversationCard';
import MenuBar from '../components/MenuBar';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';

function StudyPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
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
          {[...Array(9)].map((_, index) => (
            <Grid
              key={index}
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Container />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default StudyPage;
