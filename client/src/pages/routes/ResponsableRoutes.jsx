import { Route, Routes } from "react-router-dom";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import Missions from "../Missions/Missions";
import Planning from "../Planning";
import Observations from "../observations/ObservationsTable";
import DashboardLayout from "../directeur/DashboardLayout";
import ObservationsTable from "../observations/ObservationsTable";
import TasksTable from "../tasks/TasksTable";
import CreateObservationForm from "../observations/CreateObservationForm";
import EditObservationModal from "../observations/EditObservationModal";
import EditMissionForm from "../Missions/EditMissionForm";
export default function ResponsableRoutes() {
  return (
    <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />  
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="espaces" element={<Espaces />} />
      <Route path="missions/*" element={<Missions />} />
      <Route path="missions/edit/:start/:id_dir/:id_resp" element={<EditMissionForm />} />
      <Route path="observations" element={<ObservationsTable/>} />
        <Route path="observations/create" element={<CreateObservationForm/>} />
        <Route path="observations/edit/:date/:id_ws/:id_resp" element={<EditObservationModal/>} />
        <Route path="observations/*" element={<ObservationsTable />} />
      <Route path="planning" element={<Planning />} />
      {/* tasks Routes */}
        <Route path="tasks" element={<TasksTable/>}/>
        <Route path="tasks/*" element={<TasksTable />} />
    </Route>
    </Routes>
  );
}
