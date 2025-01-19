/* eslint-disable @typescript-eslint/no-explicit-any */ // fix later
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForceGraph3D } from 'react-force-graph';
import { getTopic } from '../api/getTopic';
import { Link, Node } from '../types/MindMap';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function MindMap() {
  const [graphData, setGraphData] = useState<{
    nodes: Node[];
    links: Link[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const graphRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = 'test@email.com';
    setIsLoading(true);
    setError(null);

    getTopic(email)
      .then((data) => {
        if (!data || !data.nodes || !data.links) {
          throw new Error('Invalid graph data format');
        }

        const nodes: Node[] = data.nodes.map((node: any) => ({
          id: node.category,
          label: node.category,
          val: node.count,
          group: node.subcategory.length,
        }));

        const nodeIds = new Set(nodes.map((n) => n.id));
        const links: Link[] = data.links
          .filter(
            (link: any) => nodeIds.has(link.source) && nodeIds.has(link.target)
          )
          .map((link: any) => ({
            source: link.source,
            target: link.target,
          }));

        setGraphData({ nodes, links });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading graph data:', error);
        setError('Failed to load mind map. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (graphRef.current) {
        setTimeout(() => {
          graphRef.current.zoomToFit(1000);
        }, 200);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <CircularProgress color="success" aria-label="Loading mind map" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Typography color="error" variant="h6" aria-live="assertive">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={graphData!}
      backgroundColor="#FFFFFF"
      nodeLabel={(node) => `<div><b>${node.label}</b></div>`}
      nodeAutoColorBy="id"
      linkColor={() => 'rgba(14, 14, 14, 0.2)'}
      linkOpacity={1}
      linkWidth={0.5}
      nodeVal={(node) => node.val}
      onNodeClick={(node) => {
        navigate(`/threads/${node.label}`);
      }}
    />
  );
}
