import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../../hooks/useAuth";

const NavBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, logout } = useAuth();
  
  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out");
      // navigate("/login");
    } catch (err) {
      console.log("Logout error", err);
    }
  };

  const navList = (
    <ul className="mt-2 mb-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/about" className="flex items-center">
          About
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/contact" className="flex items-center">
          Contact
        </NavLink>
      </Typography>

      {user && (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to="/profile" className="flex items-center">
              Profile
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <Link to="/private" className="flex items-center">
              Dashboard
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );

  return (
    <div className="w-full flex justify-center items-center m-0">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4" shadow={false}>
        <div className="mx-10 flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a" 
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-bold text-4xl text-blue-500"
          >
            Gazly
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {user ? (
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={handleLogout}
                >
                  <span>Log out</span>
                </Button>
              ) : (
                <>
                  <NavLink to="/login">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span>Log In</span>
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      <span>Sign Up</span>
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {user ? (
              <Button fullWidth variant="text" size="sm" onClick={handleLogout}>
                <span>Log out</span>
              </Button>
            ) : (
              <>
                <NavLink to="/login">
                  <Button fullWidth variant="text" size="sm">
                    <span>Log In</span>
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button fullWidth variant="gradient" size="sm">
                    <span>Sign Up</span>
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavBar;
