// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { MarkerType } from "reactflow";
import { nodeType, conectItems } from "../types";

let totalNodes: number = 0;

const currentText: { id: number, text: string }[] = [{ id: 0, text: 'text' }];
export let currentImages: {id: number, img: string}[] = [{id: 0, img: ''}];

export function pushToFiles(img: string, id: number){
  let itemPlaced = false;
  const newFiles = currentImages.map(item => {
    if (item.id === id) {
      itemPlaced = true;
      return { img, id }
    } else return item;
  });

  if (!itemPlaced) newFiles.push({ id, img });
  currentImages = newFiles;
}

// CREATES A NEW RECTANGLE NODE ITEM
export const createNewRectNode = (setNodes: any, x?: number, y?: number) => {
  totalNodes++;
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'rect_node',
      }
    ];
    return newNodesArr;
  });
}

// CREATES A NEW ROUND NODE ITEM
export const createNewRoundNode = (setNodes: any, x?: number, y?: number) => {
  totalNodes++
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'round_node',
      }
    ];
    return newNodesArr;
  });
}

// CREATES A NEW NODE IMAGE
export const createNewNodeImage = (setNodes: any, x?: number, y?: number) => {
  totalNodes++
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "" },
        type: 'img_node',
      }
    ];
    return newNodesArr;
  });
}

// GETS AN ARRAY WITH THE INITIAL NODES
export function giveInitialItems(arr: any) {

  const data = arr[0].items;
  const endArr: nodeType[] = [];

  data.forEach((item: any, index: number) => {
    if (index === data.length - 1) totalNodes = Number(item.id + 1);

    currentText.push({ id: item.id, text: item.text});
    currentImages.push({id: item.id, img: item.file})

    endArr.push({
      id: item.id,
      label: item.id,
      position: { x: item.positionX, y: item.positionY },
      data: {
        label: item.text,
      },
      type: item.type,
      style: {
        color: item.text_color,
        backgroundColor: item.background_color
      },
    });

  });

  return endArr;
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
export function connectInitialItems(): conectItems[] {
  const endArr: conectItems[] = [];
  // savedItems.forEach((item: nodeType) => {
  //   item.conection && item.conection.forEach((node: string) => {
  //     endArr.push({
  //       id: item.id + '-' + node,
  //       source: item.id,
  //       target: node,
  //       sourceHandle: 'c',
  //       targetHandle: 'a',
  //       type: 'floating',
  //       markerEnd: { type: MarkerType.ArrowClosed },
  //     });
  //   });
  // });
  return endArr;
}

// CHANGES THE TEXT THE THE TEXT THAT WAS SAVED
export function findMyText(node: Element) {
  const parentNode: any = node.parentNode;
  const id = parentNode.getAttribute("data-id");
  const text = currentText.filter((item) => item.id === id);
  return text[0]?.text;
}

export function findMyImage(node: Element) {
  const parentNode: any = node.parentNode;
  const id = parentNode.getAttribute("data-id");
  const text = currentImages.filter((item) => item.id === id);
  return text[0]?.img;
}