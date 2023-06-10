// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { MarkerType } from "reactflow";
import { nodeType, conectItems } from "../types";

let totalNodes: number = 0;

const savedItems: nodeType[] = [
  // { position: { x: 200, y: 100 }, data: { label: 'id 1' }, conection: ['2'], id: '1' },
  { position: { x: 200, y: 200 }, data: { label: 'id 2' }, conection: [], id: '2' }
]

// CREATES A NEW RECTANGLE NODE ITEM
export const createNewRectNode = (setNodes: any, x?: number, y?: number) => {
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'rectNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// CREATES A NEW ROUND NODE ITEM
export const createNewRoundNode = (setNodes: any, x?: number, y?: number) => {
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'roundNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// CREATES A NEW NODE IMAGE
export const createNewNodeImage = (setNodes: any, x?: number, y?: number) => {

  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "" },
        type: 'imageNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// RETURNS AN ARRAY WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODES
export function getAllitems(): nodeType[] {
  const endArr: nodeType[] = [];
  savedItems.forEach((item: nodeType) => {
    totalNodes++;
    endArr.push({
      id: item.id,
      label: item.id,
      position: item.position,
      data: { label: item.data.label },
      type: 'rectNode',
    });
  });
  return endArr;
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
export function connectInitialItems(): conectItems[] {
  const endArr: conectItems[] = [];
  savedItems.forEach((item: nodeType) => {
    item.conection && item.conection.forEach((node: string) => {
      endArr.push({
        id: item.id + '-' + node,
        source: item.id,
        target: node,
        sourceHandle: 'c',
        targetHandle: 'a',
        type: 'floating',
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    });
  });
  return endArr;
}
