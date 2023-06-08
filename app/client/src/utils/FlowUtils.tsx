// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { nodeType, conectItems } from "../types";

let currentID: number = 1;
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
        id: currentID + '',
        position: { x: 500, y: 400 },
        data: { label: "yo" }
      }
    ];
    return newNodesArr;
  });
  return currentID++;
}

// RETURNS AN ARRAY WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODES
export function getAllitems(): nodeType[] {
  const endArr: nodeType[] = [];
  savedItems.forEach((item: { position: { x: number, y: number }, data: { label: string }, id: string }, index: number) => {
    currentID++;
    endArr.push({ id: item.id, position: item.position, data: item.data, ...extraOptions })
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