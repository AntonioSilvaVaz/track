import { createContext } from "react";

const defaults: any = {}
const Dashboard: any = {}
const Flow: any = {}

export const Context = createContext(defaults);
export const DashboardContext = createContext(Dashboard);
export const FlowContext = createContext(Flow);