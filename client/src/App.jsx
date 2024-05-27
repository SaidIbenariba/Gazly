import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import Notfound from "./Notfound";
import Home from "./pages/Home";
// import {} from "./context/AuthContext";
import { AdminRoutes } from "./pages/routes/AdminRoutes";
// import UsersRoutes from "./pages/routes/UsersRoutes";
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default App;
