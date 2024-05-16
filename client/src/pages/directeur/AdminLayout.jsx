import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="flex flex-auto h-screen">
        <Sidebar />
        <div className="grow">
          <Navbar />
          <div className="m-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
