import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = () => {
  return (
    <>
      <div className=" flex flex-auto h-screen w-full grid-cols-2 ">
        <Sidebar />
        <div className="grow overflow-y-scroll">
          <Navbar />
          <main className="relative">
            <div className="m-5">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
