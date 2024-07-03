import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../directeur/DashboardLayout";
import TasksTable from "../tasks/TasksTable";

export default function OuvrierRoutes() {
  return (
    <Routes> 
    <Route element={<DashboardLayout />}>
    <Route index element={<TasksTable/>}/>
    <Route  element={<TasksTable />} path="tasks" />
    </Route>
    </Routes>
  );
}
