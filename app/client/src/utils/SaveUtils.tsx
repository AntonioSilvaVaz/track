import { ChangeEvent } from "react";
import { nodeSave } from "../types";
import { currentImages, pushToFiles } from "./FlowUtils";

export async function saveFile(edges: any, currentProjectId: string) {

  const allRectNodes = document.getElementsByClassName('rect_node');
  const allRoundNodes = document.getElementsByClassName('round_node');
  const allImageNodes = document.getElementsByClassName('img_node');

  const allInfoRectNodes = createNode(allRectNodes);
  const allInfoRoundNodes = createNode(allRoundNodes);
  const allInfoImageNodes = createNode(allImageNodes, true);

  let currentEdges = edges.map((edge: any) => ({
    sourceId: edge.source,
    targetId: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.tagetHandle
    }));

  const endArr = [
    [
      ...allInfoRectNodes,
      ...allInfoRoundNodes,
      ...allInfoImageNodes
    ],
    [
      ...currentEdges
    ],
    {
      user_id: "648749d95aeb8afb07c57725",
      project_id: currentProjectId
    }
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
    positionX: pos.x,
    positionY: pos.y,
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

  const imgSelected = img[0] ? img[0].img : 'http://localhost:3000/static/media/cat.77aaf5376cc1173fc38e.jpg';


  return {
    id: id,
    text_color: '',
    background_color: 'transparent',
    positionX: pos.x,
    positionY: pos.y,
    text: '',
    type: 'img_node',
    img: imgSelected,
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