// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { nodeType, conectItems } from "../types";

let currentNodeID: string = '0';
let totalNodes: number = 0;
const extraOptions = {
  targetPosition: 'top',
  sourcePosition: 'bottom'
}

const savedItems = [
  { position: { x: 200, y: 100 }, data: { label: 'id 1' }, conection: ['2'], id: '1' },
  { position: { x: 200, y: 200 }, data: { label: 'id 2' }, conection: [], id: '2' }
]

export const createNewNode = (setNodes: any) => {
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        position: { x: 500, y: 400 },
        data: { label: "yo" }
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

export function createLabels(): string[] {
  const allLabels: any = [];
  savedItems.forEach((item: any) => {
    allLabels[Number(item.id) - 1] = item.data.label;
  })
  return allLabels
}

// RETURNS AN ARRAY WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODES
export function getAllitems(): nodeType[] {
  const endArr: nodeType[] = [];
  savedItems.forEach((item: { position: { x: number, y: number }, data: { label: string }, id: string }) => {
    totalNodes++;
    endArr.push({ id: item.id, position: item.position, data: { label: item.data.label }, ...extraOptions });
  });
  return endArr;
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
export function connectInitialItems(): conectItems[] {
  const endArr: conectItems[] = [];
  savedItems.forEach((item: { id: string, conection: string[] }) => {
    item.conection.forEach((node: string) => {
      endArr.push({ id: item.id + node + '_connected', source: item.id, target: node })
    });
  });
  return endArr;
}

export function handleNodeClick(setCurrentText: any, node: any) {
  const { data } = node;
  setCurrentText(data.label);
  currentNodeID = node.id;
}

export function changeNodeText(newText: string, nodes: any, setNodes: any) {
  const newArr = nodes.map((node: any) => {
    if (node.id === currentNodeID)
      return {
        ...node,
        data: {
          ...node.data,
          label: newText,
        }
      };
    return node;
  })
  setNodes(newArr);
}
