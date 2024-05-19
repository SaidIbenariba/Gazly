import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className=" flex flex-auto h-screen w-full grid-cols-2 ">
        <Sidebar />
        <div className="grow">
          <Navbar />
          <main className="flex relative justify-center">
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
