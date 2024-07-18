import { db } from "../connect_db.js";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
  const q = `SELECT firstname, lastname, email, role, refreshToken FROM users WHERE id = ?`;
  db.query(q, [req.params.userId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const search = (req, res) => {
  // console.log(req.params);
  console.log("search box"); 
  const q = `SELECT * FROM users WHERE firstname LIKE ? `;
  db.query(q, [req.params.text], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const searchByRole = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM users WHERE role = ?`;
  db.query(q, [req.params.role], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};
export const createUser = (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, req.body.email, (err, data) => {
    if (err) { 
      console.log(err);
      return res
        .status(500)
        .json({ messsage: "Error mysql when select from users" + err });
    } 
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
    const userRole= req.body.role
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
    
    const userId = result.insertId;
    let insertDirecteurQuery='';
      if(userRole=="admin"){
        insertDirecteurQuery = 'INSERT INTO director(id) VALUES (?)';
      }else if(userRole=="responsable"){
         insertDirecteurQuery = 'INSERT INTO respensable(id) VALUES (?)';
      }else{
         insertDirecteurQuery = 'INSERT INTO ouvrier(id) VALUES (?)';
      }
                db.query(insertDirecteurQuery, [userId], (err, result) => {
                  if (err) return res.status(500).json(err);
                  
                });  
          return res.status(200).json({ succes: `New User  created `,id:userId });
      
  

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
  // const sql = "SELECT * FROM users WHERE email = ?";
  // db.query(sql, req.body.email, (err, data) => {
  //   if (err)
  //     return res
  //       .status(500)
  //       .json({ messsage: "Error mysql when select from users" + err });
  //   if (data.length > 0) {
  //     console.log("User already exits");
  //     return res.status(409).json("User already exists!");
  //   }
  //   // HERE SPECIFIC ROLE OF USER

  //   // CREATE A NEW USER TO DATABASE USE UPDATE QUERY
  //   // HASH PASSWORD
  //   const salt = bcrypt.genSaltSync(10);
  //   const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  //   const q =
  //     "INSERT INTO users (`firstname`,`lastname`,`email`,`password`,`role`) VALUE(?) ";
  //   const newUser = {
  //     firstname: req.body.firstname,
  //     lastname: req.body.lastname,
  //     email: req.body.email,
  //     password: req.body.password,
  //     role: req.body.role,
  //   };
  //   db.query(q, [Object.values(newUser)], (err, result) => {
  //     if (err) return res.status(500).json(err);
  //     return res
  //       .status(200)
  //       .json({ succes: `New User ${newUser[0]} created ` });
  //   });
  // });
};
export const editUser = (req, res) => {
  const q =
    "UPDATE users SET firstname=?, lastname=?, email=?, role=?  WHERE id= ? ";
  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.role,
    req.params.userId,
  ];
  db.query(q, values, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id= ? ";
  db.query(q, req.params.userId, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const users = (req, res) => {
  // console.log(req);
  console.log(req.id);
  const sql = "SELECT * FROM users";
  db.query(sql, (err, users) => {
    if (err) res.status(500).json("Can not connect to database");
    return res.status(200).json(users);
  });
};
