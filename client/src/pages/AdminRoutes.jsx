import { Route, Routes } from "react-router-dom";
import AdminLayout from "./directeur/AdminLayout";
import Dashboard from "./directeur/Dashboard";
import Users from "./users/Users";
import Espaces from "./Espaces";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="espaces" element={<Espaces />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}
