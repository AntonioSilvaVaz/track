export type nodeType = {
  id: string,
  position: { x: number, y: number },
  data: { label: string },
  type?: string,
  label?: string,
  conection?: string[],
  style?: {}
}

export type conectItems = {
  id: string,
  source: string,
  target: string,
  type: string,
  sourceHandle: string,
  targetHandle: string,
  markerEnd: any,
}

export type nodeSave = {
  background_color: string,
  position: { x: number, y: number },
  text: string,
  type: string
}