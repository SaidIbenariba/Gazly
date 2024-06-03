import { db } from "../connect_db.js";
export const respSearch = (req, res) => {
  // console.log(req.params);
  const q = `SELECT * FROM meeting WHERE id_Admin = ? `;
  db.query(q, [req.params.id_Admin], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const createMeeting = (req, res) => {
  const sql =
    "INSERT INTO meeting (`start`,`end`,`title`,`description`,`id_resp`,`id_Adir`,`allDay`) VALUE(?,?,?,?,?,?,?) ";
  const newTache = {
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    Description: req.body.description,
    id_resp: req.body.id_resp,
    id_dir: req.body.id_dir,
    allDay: req.body.allDay,
  };
  db.query(sql, [Object.values(newTache)], (err, res) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ succes: `New Meeting created ` });
  });
};
export const editMeeting = (req, res) => {
  const q =
    "UPDATE meeting SET start=?,end=?,title=?, description=?,id_resp =?, id_dir=?  WHERE id_resp= ? ";
  const values = {
    Duree: req.body.duree,
    Description: req.body.description,
    id_Admin: req.body.id_Admin,
    id_resp: req.body.id_resp,
  };
  db.query(q, values, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const deleteMeeting = (req, res) => {
  const q = "DELETE FROM meeting WHERE id_resp= ? ";
  db.query(q, req.params.id_resp, (err, result) => {
    if (err) return res.sendStatus(500);
    return res.status(200).json(result);
  });
};
export const getMeetings = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = `SELECT m.*, r.firstname, r.lastname FROM meeting m INNER JOIN users r ON m.id_resp = r.id WHERE DATE(m.start) = CURDATE()`;
  
  if (userRole == "admin") {
    sql += " AND id_dir = ?";
  } else if (userRole == "responsable") {
    sql += " AND id_resp = ?";
  }

  if (userId) {
    db.query(sql, [userId], (err, results) => {  // Passed userId as an array
      if (err) {
        console.error("Database query error: ", err);
        return res.status(500).json("Cannot connect to database");
      }

      const formatDate = (mysqlDate) => {
        const jsDate = new Date(mysqlDate);
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 24-hour format
        };
        return jsDate.toLocaleString("en-GB", options);
      };

      const formattedResults = results.map((row) => ({
        ...row,
        start: formatDate(row.start),
        end: formatDate(row.end),
        user: `${row.firstname} ${row.lastname}`,
      }));
      
      return res.json(formattedResults);
    });
  } else {
    return res.status(400).json("Missing required parameter: id_dir or id_resp");
  }
};

export const Meetings = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = `
    SELECT 
      m.*, 
      r.firstname, 
      r.lastname 
    FROM 
      meeting m 
    INNER JOIN 
      users r 
    ON 
      m.id_resp = r.id 
    WHERE 
      DATE(m.start) = CURDATE()
  `;
  
  if (userRole === "admin") {
    sql += " AND id_dir = ?";
  } else if (userRole === "responsable") {
    sql += " AND id_resp = ?";
  }

  if (userId) {
    db.query(sql, [userId], (err, results) => { // Pass userId as an array for query parameters
      if (err) {
        console.error("Database query error: ", err);
        return res.status(500).json("Cannot connect to database");
      }

      const formatDate = (mysqlDate) => {
        const jsDate = new Date(mysqlDate);
        return jsDate.toString(); // Format the date to the desired string representation
      };

      const formattedResults = results.map((row) => ({
        ...row,
        start: formatDate(row.start),
        end: formatDate(row.end),
        user: {
          firstname:row.firstname,
          lastname:row.lastname
        }
      }));

      console.log(formattedResults);
      return res.json(formattedResults);
    });
  } else {
    return res.status(400).json("Missing required parameter: id_dir or id_resp");
  }
};

export const getAllMeetingsById = (req, res) => {
  let sql =
    "SELECT m.*, r.firstname, r.lastname FROM meeting m INNER JOIN users r ON m.id_resp = r.id ";

  let value;
  if (req.params.id_dir) {
    sql += "WHERE id_dir = ?";
    value = req.params.id_dir;
  } else if (req.params.id_resp) {
    sql += "WHERE id_resp = ?";
    value = req.params.id_resp;
  }

  if (value) {
    db.query(sql, [value], (err, users) => {
      if (err) return res.status(500).json("Cannot connect to database");
      return res.json(users);
    });
  } else {
    return res
      .status(400)
      .json("Missing required parameter: id_dir or id_resp");
  }
};
