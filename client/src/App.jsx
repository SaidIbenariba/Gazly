import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import Edit from "./pages/users/Edit";
import Users from "./pages/users/Users";
import Read from "./pages/users/Read";
import Create from "./pages/users/Create";
import Delete from "./pages/users/Delete";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/directeur/Dashboard";
import Notfound from "./Notfound";
import Home from "./pages/Home";
import Espaces from "./pages/Espaces";

import AdminLayout from "./pages/directeur/AdminLayout";
import { AdminRoutes } from "./pages/AdminRoutes";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Dashboard />,
//     children: [
//       {
//         path: "/users",
//         element: <Users />,
//       },
//       {
//         path: "/users/create",
//         element: <Create />,
//       },
//       {
//         path: "/users/read/:id",
//         element: <Read />,
//       },
//       {
//         path: "/users/edit/:id",
//         element: <Edit />,
//       },
//       {
//         path: "/users/delete/:id",
//         element: <Delete />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default App;
