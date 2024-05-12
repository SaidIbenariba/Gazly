import { Sidebar } from "flowbite-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "../assets/logo.svg";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
export default function Sidbar() {
  return (
    <div className="w-[300px] h-[100vh] shadow-md">
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className="w-full"
      >
        <Sidebar.Logo href="/">Admin</Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <NavLink
              to={`users`}
              className={`bg-blue-400`}
              style={({ isActive }) => {
                return isActive
                  ? { color: "red", backgroundColor: "black" }
                  : { backgroundColor: "blue" };
              }}
            >
              {" "}
              Users
            </NavLink>
            <Sidebar.Item href="dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="espaces" icon={HiInbox}>
              Espaces
            </Sidebar.Item>

            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
