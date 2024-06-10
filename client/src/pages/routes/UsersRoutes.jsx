import { Route, Routes } from "react-router-dom";
import Users from "../users/Users";
import Edit from "../users/Edit";
import View from "../users/Read";
import Create from "../users/Create";

export default function UsersRoutes() {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="edit/:id" element={<Edit />} />
      {/* <Route path="delete/:id" element={<Delete />} /> */}
      <Route path="view/:id" element={<View />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
}
