import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES_LIST } from "../config/roles";
const useVerifyRole = (allowedRoles) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    // null
    // User not logged in, you can handle this case as needed
    return false;
  }

  // Check if the user's role matches any of the allowed roles
  //   console.log(Object.values(ROLES_LIST));
  return allowedRoles.includes(ROLES_LIST[user.role]);
};

export default useVerifyRole;
