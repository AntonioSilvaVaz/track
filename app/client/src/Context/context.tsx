import { createContext } from "react";

const defaults = {
  loggedIn: false,
  setLoggedIn: (set: boolean)=>{},
  showProject: false,
  setShowProject: (set: boolean)=>{},
  title: '',
  setProjectTitle: (set: string)=>{}
}

const Dashboard = {
  projects: [{ title: '', description: '', _id: '', banner: '' }],
  setProjects: (set: any)=>{},
  showCreateProject: false,
  setShowCreateProject: (set: boolean)=>{},
}

export const Context = createContext(defaults);
export const DashboardContext = createContext(Dashboard);