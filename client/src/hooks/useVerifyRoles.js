import { useContext } from "react";
import { ROLES_LIST } from "../config/roles";
import { AuthContext } from "../context/AuthContext";
const useVerifyRole = (allowedRoles) => {
  const { user } = useContext(AuthContext);
  console.log(user);
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
