import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../directeur/AdminLayout";
import Dashboard from "../directeur/Dashboard";
import Espaces from "../Espaces";
import UsersRoutes from "../routes/UsersRoutes";
import Missions from "../Missions";
import Planning from "../Planning";
import Observations from "../Observations";
import useVerifyRole from "../../hooks/useVerifyRoles";

export function AdminRoutes() {
  const isAdmin = useVerifyRole(["admin"]);

  if (!isAdmin) {
    // Redirect to a different page or show a message for unauthorized users
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="espaces" element={<Espaces />} />
        <Route path="users/*" element={<UsersRoutes />} />
        <Route path="missions/*" element={<Missions />} />
        <Route path="observations/*" element={<Observations />} />
        <Route path="planning" element={<Planning />} />
        <Route path="espaces" element={<Espaces />} />
      </Route>
    </Routes>
  );
}
