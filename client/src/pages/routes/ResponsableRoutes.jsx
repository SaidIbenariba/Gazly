import { Route, Routes } from "react-router-dom";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import Missions from "../Missions/Missions";
import Planning from "../Planning";
import Observations from "../observations/ObservationsTable";
import DashboardLayout from "../directeur/DashboardLayout";
import ObservationsTable from "../observations/ObservationsTable";

export default function ResponsableRoutes() {
  return (
    <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />  
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="espaces" element={<Espaces />} />
      <Route path="missions/*" element={<Missions />} />
      <Route path="observations/*" element={<ObservationsTable />} />
      <Route path="planning" element={<Planning />} />
    </Route>
    </Routes>
  );
}
