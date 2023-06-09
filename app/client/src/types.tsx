export type nodeType = {
  id: string,
  position: { x: number, y: number },
  data: { label: string },
  type: string
  label: string
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