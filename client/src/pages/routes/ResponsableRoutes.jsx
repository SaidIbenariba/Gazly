import { Route, Routes } from "react-router-dom";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import Missions from "../Missions/Missions";
import Planning from "../Planning";
import Observations from "../Observations";
import DashboardLayout from "../directeur/DashboardLayout";

export default function ResponsableRoutes() {
  return (
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="espaces" element={<Espaces />} />
      <Route path="missions/*" element={<Missions />} />
      <Route path="observations/*" element={<Observations />} />
      <Route path="planning" element={<Planning />} />
    </Route>
  );
}
