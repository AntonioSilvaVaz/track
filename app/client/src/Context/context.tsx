import { createContext } from "react";

const defaults = {
  loggedIn: false,
  setLoggedIn: (set: boolean) => { },
  showProject: false,
  setShowProject: (set: boolean) => { },
  title: '',
  setProjectTitle: (set: string) => { }
}

const Dashboard = {
  projects: [{ title: '', description: '', _id: '', banner: '' }],
  setProjects: (set: any) => { },
  showCreateProject: false,
  setShowCreateProject: (set: boolean) => { },
}

const Flow = {
  nodes: [],
  setNodes: (node: any)=>{},
  onNodesChange: ()=>{},
  edges: [],
  setEdges: (edge: any)=>{},
  onEdgesChange: ()=>{},
  saved: '',
  setSaved: (value: string)=>{},
  showExport: false,
  setShowExport: (newVal: boolean)=>{}
}

export const Context = createContext(defaults);
export const DashboardContext = createContext(Dashboard);
export const FlowContext = createContext(Flow);