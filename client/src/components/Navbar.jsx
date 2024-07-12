import React, { useState } from "react";
import Toggle from "./ThemeToggle";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-sidebar border-border mx-2 px-4 py-3 rounded-lg shadow-none dark:bg-background ">
      <div className="flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <span className="text-2xl font-semibold text-gray-800 dark:text-white"></span>
        </div>

        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <button
              className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={handleDropdownToggle}
            >
              Menu
              <svg
                className={`ml-1 w-5 h-5 inline transition-transform transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button> */}
            {/* {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </a>
              </div>
            )}
       </div>*/}  
{/* 
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-700 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Search..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div> */}

          <div className="flex justify-end">
            <Toggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
