export type nodeType = {
  id: string,
  position: { x: number, y: number },
  data: { label: string },
}

export type conectItems = {
  id: string,
  source: string,
  target: string
}