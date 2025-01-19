import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTopic } from '../api/getTopic';
import MenuBar from '../components/MenuBar';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import FolderIcon from '../assets/FolderIcon.png';
import TitleTag from '../components/TitleTag.tsx';

export type TopicItem = {
  nodes: Array<{
    category: string;
    count: number;
    subcategory: string[];
  }>;
  links: Array<{
    source: number | string;
    target: number | string;
    value?: number;
  }>;
};

export default function ThreadsBookPage() {
  const navigate = useNavigate();

  // For single TopicItem
  const [topic, setTopic] = useState<TopicItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const email = localStorage.getItem('email') || '';
    setIsLoading(true);

    getTopic(email)
      .then((data: TopicItem) => {
        setTopic(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API Error (getTopic):', error);
        setIsLoading(false);
      });
  }, []);

  const handleTopicClick = (category: string) => {
    navigate(`/threads/${category}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <MenuBar />

      <Box sx={{ flexGrow: 1, padding: 1 }}>
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
        ) : topic && topic.nodes.length > 0 ? (
          <Grid
            container
            spacing={0}
            columns={12}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'stretch',
            }}
          >
            {topic.nodes
              .slice() // create a shallow copy so we don't mutate the original array
              .sort((a, b) => b.count - a.count) // sort descending by count
              .map((node, index) => (
                <Grid
                  key={`${node.category}-${index}`}
                  xs={8}
                  sm={6}
                  md={4}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  onClick={() => handleTopicClick(node.category)}
                >
                  <Box
                    sx={{
                      width: '90%',
                      minHeight: '240px',

                      cursor: 'pointer',
                      textAlign: 'center',

                      // Background settings
                      backgroundImage: `url(${FolderIcon})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain',

                      // Optional: overlay text
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <TitleTag large text={node.category} />
                    <Typography level="body2">
                      {node.count} notes
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography>No topics found</Typography>
        )}
      </Box>
    </Box>
  );
}