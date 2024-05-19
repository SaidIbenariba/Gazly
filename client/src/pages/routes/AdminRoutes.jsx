import { Route, Routes } from "react-router-dom";
import AdminLayout from "../directeur/AdminLayout";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import UsersRoutes from "../routes/UsersRoutes";
import Missions from "../Missions";
import Planning from "../Planning";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="espaces" element={<Espaces />} />
          <Route path="users/*" element={<UsersRoutes />} />
          <Route path="missions" element={<Missions />} />
          <Route path="planning" element={<Planning />} />
          <Route path="espaces" element={<Espaces />} />
        </Route>
      </Routes>
    </>
  );
}
