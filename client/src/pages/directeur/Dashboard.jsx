/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Sidbar from "../../components/Sidbar";
import Login from "../auth/Login";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  // const { isLoggedIn } = useAuth();
  // const nav = useNavigate();
  // useEffect(() => {
  //   if (isLoggedIn) nav(`/login`);
  // });
  return (
    <>
      <div>Chart.js</div>
    </>
  );
};

export default Dashboard;
