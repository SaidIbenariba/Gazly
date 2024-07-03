import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import Notfound from "./Notfound";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
// import {} from "./context/AuthContext";
import useVerifyRole from "./hooks/useVerifyRoles";
import { useAuth } from "./hooks/useAuth";
import OuvrierRoutes from "./pages/routes/OuvrierRoutes";
import ResponsableRoutes from "./pages/routes/ResponsableRoutes";
import AdminRoutes from "./pages/routes/AdminRoutes";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route element={<PrivateRoutes />} path="/private/*" /> */}
      <Route path="/profile" element={<Profile/>}   />
       {/* <PrivateRoutes/> */}
      <Route path="/private/*" element={PrivateRoutes()}/>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
const PrivateRoutes = () => {
  const { user } = useAuth();
  const isAdmin = useVerifyRole(["admin"]);
  const isResponsable = useVerifyRole(["responsable"]);
  const isOuvrier = useVerifyRole(["ouvrier"]);
  console.log("private routes");
  console.log(user);
  if (!user) {
    // console.log(user);
     <Navigate to="/login" />;
  }
  if(isAdmin) return <AdminRoutes />
  if(isResponsable) return <ResponsableRoutes />
  if(isOuvrier) return <OuvrierRoutes />
};

export default App;
