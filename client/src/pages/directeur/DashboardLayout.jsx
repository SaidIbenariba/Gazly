import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  console.log("dashboardLayout");
  return (
    <>
      <div className=" flex flex-auto h-screen w-full grid-cols-2 ">
        <Sidebar />
        <div className="grow overflow-y-scroll">
          <Navbar />
          <main className="relative">
            <div className="m-5">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
