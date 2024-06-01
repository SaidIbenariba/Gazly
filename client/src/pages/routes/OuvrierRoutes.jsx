import { Route, Routes } from "react-router-dom";
import Tasks from "../../pages/Tasks";
import DashboardLayout from "../directeur/DashboardLayout";

export default function OuvrierRoutes() {
  return (
    <Route element={<DashboardLayout />}>
      <Route element={<Tasks />} path="tasks" />
    </Route>
  );
}
