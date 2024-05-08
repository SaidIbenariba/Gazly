import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Edit from "./pages/users/Edit";
import Users from "./pages/users/Users";
import Read from "./pages/users/Read";
import Create from "./pages/users/Create";
import Delete from "./pages/users/Delete";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/create",
    element: <Create />,
  },
  {
    path: "/users/read/:id",
    element: <Read />,
  },
  {
    path: "/users/edit/:id",
    element: <Edit />,
  },
  {
    path: "/users/delete/:id",
    element: <Delete />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
