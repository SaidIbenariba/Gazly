import { Route, Routes } from "react-router-dom";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import UsersRoutes from "../routes/UsersRoutes";
import Missions from "../Missions/Missions";
import Planning from "../Planning";
import Observations from "../Observations";
import DashboardLayout from "../directeur/DashboardLayout";
import CreateMissionForm from "../Missions/CreateMissionForm";
import EditMissionForm from "../Missions/EditMissionForm";

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
        <Route path="observations" element={<Observations/>}/>
        <Route path="observations/*" element={<Observations />} />
        <Route path="planning" element={<Planning />} />
      </Route>
    </Routes>
  );
}
