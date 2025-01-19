import { Typography, Box } from '@mui/joy';
import MenuBar from '../components/MenuBar';
import MindMap from '../components/MindMap';

export default function LandingPage() {
  return (
    <>
      <MenuBar />
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          left: 0,
          width: '100%',
          textAlign: 'center',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 100,
        }}
      >
        <Typography level="body-md">
          The Mind Map below helps you visually organize your thoughts, ideas,
          and connections. <br /> Click on a node to explore detailed
          conversations and insights related to that topic.
        </Typography>
      </Box>
      <MindMap />
    </>
  );
}
