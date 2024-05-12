import React from "react";
import Sidbar from "../../components/Sidbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <>
      <div className="container h-[100vh] flex flex-row">
        <Sidbar />
        <main className=" overflow-hidden mx-auto">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
