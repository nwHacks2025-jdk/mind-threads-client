/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';

export default function MindMap() {
  const [graphData, setGraphData] = useState<{
    nodes: any[];
    links: any[];
  } | null>(null);

  useEffect(() => {
    // TODO: fetch data from the server
    fetch('/datasets/data.json')
      .then((res) => res.json())
      .then((data) => {
        const nodeDegreeMap: Record<string, number> = {};

        data.links.forEach((link: { source: string; target: string }) => {
          nodeDegreeMap[link.source] = (nodeDegreeMap[link.source] || 0) + 1;
          nodeDegreeMap[link.target] = (nodeDegreeMap[link.target] || 0) + 1;
        });

        // nodes based on size
        // TODO: change the weight factor based on node.count
        const updatedData = {
          ...data,
          nodes: data.nodes.map((node: any) => ({
            ...node,
            val:
              (node.text ? node.text.length * 0.01 : 1) +
              (nodeDegreeMap[node.id] || 0) * 0.1, // weight factor
          })),
        };

        setGraphData(updatedData);
      })
      .catch((error) => console.error('Error loading graph data:', error));
  }, []);

  console.log(graphData);
  if (!graphData) return <div>Loading...</div>;

  return (
    <ForceGraph3D
      graphData={graphData}
      backgroundColor="#FFFFFF"
      nodeLabel={(node) => `<div><b>${node.category}</div>`}
      nodeAutoColorBy="category"
      linkColor={() => 'rgba(14, 14, 14, 0.2)'}
      linkOpacity={1}
      linkWidth={0.5}
      nodeVal={(node) => node.val}
      onNodeClick={(node) => {
        console.log(node);
      }}
    />
  );
}
