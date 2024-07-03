import { db } from "../connect_db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ROLES_LIST } from "../config/roles_list.js";
dotenv.config();
// import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  // CHECK USER IF EXISTS OR NOT
  // console.log("register");
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, req.body.email, (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ messsage: "Error mysql when select from users" + err });
    if (data.length > 0) {
      console.log("User already exits");
      return res.status(409).json("User already exists!");
    }
    // HERE SPECIFIC ROLE OF USER
    // DATA OBJECT EXAMPLE
    /*{
  firstname: 'ilyass',
  lastname: 'pfe',
  email: 'test@gmail.com',
  password: 'test',
  role: 'admin'
}*/
    // CREATE A NEW USER TO DATABASE USE UPDATE QUERY
    // HASH PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users (`firstname`,`lastname` ,`email`,`password`,`role`) VALUES(?) ";

    const newUser = {
      firstname: req.body.firstname,  
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };

    // console.log(newUser);
    db.query(q, [Object.values(newUser)], (err, result) => {
      if (err) return res.status(500).json(err);
    const nuserId = result.insertId;
    if(userRole=='admin'){
      const insertDirecteurQuery = 'INSERT INTO director(id) VALUES (?)';
    }else if (userRole=='responsable'){
      const insertDirecteurQuery = 'INSERT INTO responsable(id) VALUES (?)';
    }else{
      const insertDirecteurQuery = 'INSERT INTO ouvrier(id) VALUES (?)';
    }  db.query(insertDirecteurQuery, [nuserId], (err, result) => {
                  if (err) return res.status(500).json(err);
                  console.log(result); 
                });
             
    
    return res.status(200).json({ succes: `New User  created ` });

  }); 
  });
};
// autologin controllers
export const autologin = async (req, res) => {
  const { token } = req.body[0];
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);

    const userId = decoded.UserInfo.id;

    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, data) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Database query error", error: err });
      if (data.length === 0)
        return res.status(404).json({ message: "User not found" });

      const user = {
        id: data[0].id,
        email: data[0].email,
        firstName: data[0].firstname,
        lastName: data[0].lastname,
        role: data[0].role,
      };

      return res.status(200).json({ user });
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", error: err });
  }
};

export const login = async (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  // { userId: }
  db.query(sql, req.body.email, (err, data) => {
    if (err)  {
      console.log(err);       
      return res.status(500).json(err); }  
  
    if (data.length == 0) return res.status(404).json("Email not found !");
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!checkPassword) {
      return res.status(400).json("Wrong password");
    }
    // CREATE JWTS
    // USER WAS LOGIN
    const foundUser = {
      id: data[0].id,
      email: data[0].email,
      firstName: data[0].firstname,
      lastName: data[0].lastname,
      role: data[0].role,
      tokenrefresh: data[0].refreshToken,
    };

    // console.log(foundUser.role);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          role: ROLES_LIST[foundUser.role],
        },
      },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "1h", //// just for demo, in real app you need to increase it
      }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1day",
      }
    );
    //WE SELECT ALL USERS AND
    // REPLACE IT WITH UPDATE QUERY
    const q = `UPDATE users SET refreshToken = ? WHERE id = ${foundUser.id}`;
    // const values = [refreshToken, foundUser.id];
    // console.log(values);
    db.query(q, [refreshToken], (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
    // const q = "SELECT * FROM users WHERE id = ?";
    // db.query(q,foundUser.id ,(err, users) => {
    //   if (err) if (err) return res.status(500).json(err);
    //   if(users.length == 0 ) {
    //     const s = "INSERT INTO users(id,refreshToken)"
    //   }
    //   const othersUsers = users.filter((user) => user.id != foundUser.id);
    //   const currentUser = {...foundUser,refreshToken};
    //   othersUsers.forEach(element => {

    //   });
    // });
    // Send the token back to the client along with a success message
    // res.cookie("accesToken", token,{
    //     httpOnly:true,

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // req.setHeader("Authorization", "Bearer " + accessToken);
    res.json({ accessToken });

    // headers = {
    //   Authorization: "Bearer " + accessToken,
    // };
    // })
  });
};
export const logout = async (req, res) => {
  // On client(front end ), also delete the acces token

  //   const cookies = req.cookies;
  //   if (!cookies?.jwt) return res.sendStatus(204);
  //   const refreshToken = cookies.jwt;
  //   let foundUser = {};
  //   const q = "SELECT * FROM users WHERE refreshToken = ? ";
  //   db.query(q, refreshToken, (err, data) => {
  //     if (err) return json.status(500);
  //     if (data.length == 0) return res.sendStatus(403); // forbidden
  //     const foundUser = {
  //       id: data[0].id,
  //       email: data[0].email,
  //       firstName: data[0].firstname,
  //       lastName: data[0].lastname,
  //       role: data[0].role,
  //       tokenrefresh: data[0].refreshToken,
  //     };
  //     // Delete refresh Token in db
  //

  //     // evaluate jwt
  //   });
  //   res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  //   res.status(204);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  // let foundUser = {};
  const q = "SELECT * FROM users WHERE refreshToken = ? ";
  db.query(q, refreshToken, (err, data) => {
    if (err) return json.status(500);
    if (data.length == 0) return res.sendStatus(403); // forbidden
    //   const foundUser = {
    //     id: data[0].id,
    //     email: data[0].email,
    //     firstName: data[0].firstname,
    //     lastName: data[0].lastname,
    //     role: data[0].role,
    //     tokenrefresh: data[0].refreshToken,
    //   };
    const foundUser = data[0];
    // Delete refreshToken in db
    const SQL = "UPDATE users SET refreshToken = '' WHERE id= ?  ";
    db.query(SQL, foundUser.id, (err, result) => {
      if (err) return res.status(500).json(err);
      res.clearCookie("userId");
      res.clearCookie("userRole");
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.sendStatus(204);
    });
  });
};
