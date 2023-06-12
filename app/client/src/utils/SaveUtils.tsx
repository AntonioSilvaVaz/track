import { ChangeEvent } from "react";
import { nodeSave } from "../types";
import { currentImages, pushToFiles } from "./FlowUtils";

export async function saveFile() {

  const allRectNodes = document.getElementsByClassName('rect_node');
  const allRoundNodes = document.getElementsByClassName('round_node');
  const allImageNodes = document.getElementsByClassName('img_node');
  // const paths = document.getElementsByClassName('react-flow__edge-path');

  const allInfoRectNodes = await createNode(allRectNodes);
  const allInfoRoundNodes = await createNode(allRoundNodes);
  const allInfoImageNodes = await createNode(allImageNodes, true);

  const endArr = [
    ...allInfoRectNodes,
    ...allInfoRoundNodes,
    ...allInfoImageNodes
  ];

  return fetch('http://localhost:3001/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(endArr),
  });

}

export async function addToFiles(event: ChangeEvent<HTMLInputElement>, node: Element) {

  const inputFiles = event.target.files;
  const selectedFile = inputFiles && inputFiles[0];
  const img = await convertToBase64(selectedFile) + '';

  const child: any = node.childNodes[0];
  const id: number = child.getAttribute('data-nodeid');

  pushToFiles(img, id);
}

function createNode(arrNodes: HTMLCollectionOf<Element>, isImgNode?: boolean) {

  const endArr: any[] = [];

  Array.from(arrNodes).forEach((node) => {
    if (!isImgNode) {
      const newNode = handleItemNodes(node);
      endArr.push(newNode);
    } else {
      const newNode = handleImageNode(node);
      endArr.push(newNode);
    }
  });

  return endArr;
}

function handleItemNodes(node: any): nodeSave {
  // node styles
  const nodeInfo = window.getComputedStyle(node);
  // node position
  const pos = node.getBoundingClientRect();
  // node inputchild
  const inputChild = node.getElementsByClassName('input_text')[0];

  // GETS THE ELEMENT ID
  const child: any = node.childNodes[0];
  const id: number = child.getAttribute('data-nodeid');

  const text_color = (inputChild as HTMLInputElement).style.color;

  return {
    id,
    text_color,
    background_color: nodeInfo.backgroundColor,
    position: { x: pos.x, y: pos.y },
    text: (inputChild as HTMLInputElement).value,
    type: node.classList[0]
  }
}

function handleImageNode(node: Element): nodeSave {

  const child: any = node.childNodes[0];
  const pos = node.getBoundingClientRect();
  const id: number = child.getAttribute('data-nodeid');

  const img = currentImages.filter((file: any) => {
    if (file.id === id) return file;
  });

  return {
    id: id,
    text_color: '',
    background_color: 'transparent',
    position: { x: pos.x, y: pos.y },
    text: '',
    type: 'img_node',
    img: img[0].img,
  }
}

async function convertToBase64(img: any): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (err) => reject(err);
  });
}