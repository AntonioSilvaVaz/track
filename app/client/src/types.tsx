export type nodeType = {
  id: string,
  position: { x: number, y: number },
  data: {},
  type?: string,
  label?: string,
  conection?: string[],
  style?: {},
  attributes?: {}
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
  id: number,
  text_color: string,
  background_color: string,
  positionX: number,
  positionY: number,
  text: string,
  type: string,
  img?: any,
}

export type initialProject = {
  title: string,
  description: string,
  _id: string,
  banner?: string,
}

export type DashboardType = {
  title: string,
  rightText: string,
  callback: any
}