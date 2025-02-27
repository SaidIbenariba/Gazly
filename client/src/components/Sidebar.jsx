import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import { BsArrowLeftCircle, BsArrow90DegLeft } from "react-icons/bs";
import { MdKeyboardDoubleArrowLeft, MdOutlineWork, MdSensorDoor } from "react-icons/md";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { AiFillPieChart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ImUsers } from "react-icons/im";
import Logo from "../components/ui/Logo";
import HamburgerButton from "./HamburgerMenuButton/HamburgerButton";
import { MagnetIcon, SidebarCloseIcon } from "lucide-react";
import { FaCalendarAlt, FaMap, FaTasks } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { FiWind } from "react-icons/fi";
import useVerifyRole from "../hooks/useVerifyRoles";
import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    console.log("logout");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("logout error", err);
    }
  };

  const isAdmin = useVerifyRole(["admin"]);
  const isResponsable = useVerifyRole(["responsable"]);
  const isOuvrier = useVerifyRole(["ouvrier"]);

  const adminMenus = [
    { title: "Dashboard", path: "dashboard", src: <AiFillPieChart /> },
    { title: "Users", path: "users", src: <ImUsers /> },
    { title: "Planning", path: "planning", src: <FaCalendarAlt /> },
    { title: "Missions", path: "missions", src: <MdOutlineWork /> },
    { title: "Espaces", path: "espaces", src: <FaMap /> },
    { title: "Measures", path: "measures", src: <FiWind /> },
    { title: "Sensors", path: "sensors", src: <MdSensorDoor /> },
    {
      title: "Profile",
      path: `/profile`,
      src: <CgProfile />,
      gap: "true",
    },
    {
      title: "Logout",
      path: "/logout",
      src: <SidebarCloseIcon />,
      gap: "true",
    },
  ];

  const responsableMenus = [
    { title: "Dashboard", path: "dashboard", src: <AiFillPieChart /> },
    { title: "Planning", path: "planning", src: <FaCalendarAlt /> },
    { title: "Missions", path: "missions", src: <MdOutlineWork /> },
    { title: "Tasks", path: "tasks", src: <FaTasks /> },
    // { title: "Espaces", path: "espaces", src: <FaMap /> },
    { title: "Observations", path: "observations", src: <MagnifyingGlassIcon className="h-5 w-5" /> },
    {
      title: "Profile",
      path: `/profile`,
      src: <CgProfile />,
      gap: "true",
    },
    {
      title: "Logout",
      path: "/logout",
      src: <SidebarCloseIcon />,
      gap: "true",
    },
  ];

  const ouvrierMenus = [
    { title: "Tasks", path: "tasks", src: <FaTasks /> },
    {
      title: "Profile",
      path: `/profile`,
      src: <CgProfile />,
      gap: "true",
    },
    {
      title: "Logout",
      path: "/logout",
      src: <SidebarCloseIcon />,
      gap: "true",
    },
  ];

  let Menus = [];
  if (isAdmin) Menus = adminMenus;
  if (isResponsable) Menus = responsableMenus;
  if (isOuvrier) Menus = ouvrierMenus;

  const isActive = (path) => {
    return location.pathname === "/admin/" + path;
  };

  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-fit"
        } hidden lg:block relative h-screen duration-300 text-text bg-sidebar border-r border-border dark:bg-sidebar p-4`}
      >
        <MdKeyboardDoubleArrowLeft
          className={`${
            !open && "rotate-180 left-[100px]"
          } absolute text-2xl bg-background/50 fill-slate-800 rounded-full cursor-pointer top-5 right-1 dark:fill-gray-400 dark:bg-background`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/private">
          <div
            className={`flex ${open && "gap-x-4"} items-center text-black dark:text-white`}
          >
            {<Logo />}{" "}
            {open && (
              <span className="text-xl font-medium whitespace-nowrap ">
                Admin{" "}
              </span>
            )}
          </div>
        </Link>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <>
              {menu.title === "Logout" ? (
                <li
                  key={index}
                  onClick={handleLogout}
                  className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
                    menu.gap ? "mt-9" : "mt-2"
                  } ${
                    isActive(menu.path)
                      ? "bg-active/20 dark:bg-active/40 text-text"
                      : ""
                  }`}
                >
                  <span className="text-2xl dark:text-text">{menu.src}</span>
                  <span
                    className={`${!open && "hidden"} origin-left duration-300 hover:block`}
                  >
                    {menu.title}
                  </span>
                </li>
              ) : (
                <Link to={menu.path} key={index}>
                  <li
                    className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      menu.gap ? "mt-9" : "mt-2"
                    } ${
                      isActive(menu.path)
                        ? "bg-active/20 dark:bg-active/40 text-text"
                        : ""
                    }`}
                  >
                    <span className="text-2xl dark:text-text">{menu.src}</span>
                    <span
                      className={`${!open && "hidden"} origin-left duration-300 hover:block`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              )}
            </>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div  ref={sidebarRef} className="pt-1 t-0">
        <HamburgerButton setMobileMenu={setMobileMenu} mobileMenu={mobileMenu} />
      </div>
      <div className="lg:hidden" >
        <div
          className={`${
            mobileMenu ? "flex" : "hidden"
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-[200px] left-6 right-6 dark:text-text bg-background dark:bg-background drop-shadow md rounded-xl justify-between`}
        >
          {Menus.map((menu, index) => (
            <>
              {menu.title === "Logout" ? (
                <li key={index} onClick={handleLogout}>
                  <span
                    className={`${
                      isActive(menu.path) && "bg-gray-200 dark:bg-gray-700"
                    } p-2 rounded-xl hover:bg-active dark:hover:bg-active`}
                  >
                    {menu.title}
                  </span>
                </li>
              ) : (
                <Link
                  to={menu.path}
                  key={index}
                  onClick={() => setMobileMenu(false)}
                >
                  <span
                    className={`${
                      isActive(menu.path) && "bg-gray-200 dark:bg-gray-700"
                    } p-2 rounded-xl hover:bg-active dark:hover:bg-active`}
                  >
                    {menu.title}
                  </span>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
