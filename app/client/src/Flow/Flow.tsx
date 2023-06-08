import { useCallback, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, Position } from "reactflow";
import 'reactflow/dist/style.css';
import { nodeType, conectItems } from "../types";
import './Flow.css';

const savedItem = [
  { position: { x: 200, y: 100 }, data: { label: 'id 1' }, conection: ['2'], id: '1' },
  { position: { x: 200, y: 200 }, data: { label: 'id 2' }, conection: [], id: '2' }
]

function Flow() {

  let currId = 0;
  const [labels, setLabels]: [string[], any] = useState([]);
  const extraOptions = {
    targetPosition: 'top',
    sourcePosition: 'bottom'
  }

  // RETURNS AN ARRAY WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODES
  function getAllitems(): nodeType[] {
    const endArr: nodeType[] = [];
    currId++;
    savedItem.forEach((item: { position: { x: number, y: number }, data: { label: string }, id: string }) => {
      endArr.push({ id: item.id, position: item.position, data: item.data, ...extraOptions })
    });
    return endArr;
  }

  // RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
  function connectInitialItems(): conectItems[] {
    const endArr: conectItems[] = [];
    savedItem.forEach((item: {id: string, conection: string[]}) => {
      item.conection.forEach((node: string) => {
        endArr.push({id: item.id + node + '_connected', source: item.id, target: node})
      });
    });
    return endArr;
  }

  // CHECK https://reactflow.dev/docs/quickstart/
  // BEFORE LOOKING TO THIS CODE

  const initialNodes: nodeType[] = getAllitems();
  const initialEdges = connectInitialItems();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Creates a new node and updates the last id
  const handleClick = useCallback(() => {
    setNodes((currNodes: nodeType[]) => {
      const newNodesArr: nodeType[] = [
        ...currNodes,
        {
          // by some reason the id needs to be a string
          id: currId + '',
          position: { x: 500, y: 400 },
          data: { label: "yo" }
        }
      ];

      currId++;
      return newNodesArr;
    })
  }, [])


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button onClick={handleClick}>Test click</button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />

    </div>
  )
}

export default Flow;