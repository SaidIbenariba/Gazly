export const verifyRoles = (role) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401);
    const userRole = role;

    if (userRole != req.role)
      return res
        .status(403)
        .json({ message: "You are not authorized to access this resource" });
    next();
  };
};
