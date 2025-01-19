/* eslint-disable @typescript-eslint/no-explicit-any */ // fix later
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForceGraph3D } from 'react-force-graph';
import { getTopic } from '../api/getTopic';
import { Link, Node } from '../types/MindMap';

export default function MindMap() {
  const [graphData, setGraphData] = useState<{
    nodes: Node[];
    links: Link[];
  } | null>(null);
  const graphRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTopic('test@email.com')
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
      })
      .catch((error) => console.error('Error loading graph data:', error));
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

  if (!graphData) return <div>Loading...</div>;

  return (
    <ForceGraph3D
      ref={graphRef}
      graphData={graphData}
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
