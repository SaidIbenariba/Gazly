import { Route, Routes } from "react-router-dom";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import UsersRoutes from "../routes/UsersRoutes";
import Missions from "../Missions/Missions";
import Planning from "../Planning";
// import Observations from "../Observations";
import DashboardLayout from "../directeur/DashboardLayout";
import CreateMissionForm from "../Missions/CreateMissionForm";
import EditMissionForm from "../Missions/EditMissionForm";
import ObservationsTable from "../observations/ObservationsTable";
// import EditObservationForm from "../observations/EditObservationForm";
import CreateObservationForm from "../observations/CreateObservationForm";
import MeasuresTable from "../measures/MeasuresTable";
import SensorTable from "../Sensors/SensorsTable";
import EditObservationModal from "../observations/EditObservationModal";
import Notfound from "../../Notfound"; 
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="espaces" element={<Espaces />} />
        <Route path="users/*" element={<UsersRoutes />} />
        <Route path="missions" element={<Missions />} />
        <Route path="missions/:status" element={<Missions />} />
        <Route path="missions/create" element={<CreateMissionForm />} />
        <Route path="missions/edit/:start/:id_dir/:id_resp" element={<EditMissionForm />} />
        {/* <Route path="observations" element={<Observations/>}/> */}
        <Route path="observations" element={<ObservationsTable/>} />
        <Route path="observations/create" element={<CreateObservationForm/>} />
        <Route path="observations/edit/:date/:id_ws/:id_resp" element={<EditObservationModal/>} />
        <Route path="observations/*" element={<ObservationsTable />} />
        {/* measures routes */}
        <Route path="measures/*" element={<MeasuresTable/>} />
        {/* Sensors routes */}
        <Route path="sensors/*" element={<SensorTable/>}/>
        {/* tasks Routes */}
        {/* <Route path="tasks" element={<TasksTable/>}/>
        <Route path="tasks/create" element={<CreateTaskForm/>} />
        <Route path="tasks/edit/:date/:id_resp/:id_ouv" element={<EditTaskForm/>} /> */}
        {/* <Route path="tasks/*" element={<TasksTable />} /> */}
        <Route path="planning" element={<Planning />} />
        <Route path="*" element={<Notfound/>}/>
      </Route>
    </Routes>
  );
}
