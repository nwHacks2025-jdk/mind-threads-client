import { Grid, Box } from '@mui/joy';
import Container from '../components/Container';
import MenuBar from '../components/MenuBar';
import SimpleBarChart from '../components/BarChart';
import StackedBarChart from '../components/StackedBarChart';

export default function UserPage() {
  return (
    <>
      <MenuBar />
      <Box sx={{ p: 3 }}>
        <Container title="Hi, yoh30" />
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={5}
            columns={2}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: {
                xs: 'center',
                md: 'flex-start',
              },
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Grid
              xs={12}
              md={4}
              sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}
            >
              <Container title="Did you KNOW??" height={200} />
              <Container title="You are TOP 10% GPT user" height={200} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3 }}></Box>

        <Box sx={{ mt: 3 }}>
          <Container
            title="Daily Usage"
            body="Lorem epsum dolor sit amet"
            height={400}
          >
            <SimpleBarChart />
          </Container>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Container
            title="Among us"
            body="Lorem epsum dolor sit amet"
            height={400}
          >
            <StackedBarChart />
          </Container>
        </Box>
      </Box>
    </>
  );
}
