import { db } from "../connect_db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  let foundUser = {};
  const q = "SELECT * FROM users WHERE refreshToken = ? ";
  db.query(q, refreshToken, (err, data) => {
    if (err) return json.status(500);
    if (data.length == 0) return res.status(403).json(data); //Forbidden
    const foundUser = {
      id: data[0].id,
      email: data[0].email,
      firstName: data[0].firstname,
      lastName: data[0].lastname,
      role: data[0].role,
      tokenrefresh: data[0].refreshToken,
    };
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: decoded.id,
              role: foundUser.role,
            },
          },
          process.env.ACCES_TOKEN_SECRET,
          { expiresIn: "1h" } // just for demo, in real app you need to increase it
        );
        res.json({ accessToken });
      }
    );
  });

  // evaluate jwt
};
