import { format } from "mysql";
import { db } from "../connect_db.js";
import { query } from "express";

export const createMeeting = (req, res) => {
  
  if (req.role === "admin") {
    // Convert boolean allDay to integer 
    const allDay = req.body.allDay ? '1' : '0';
    let end = req.body.end ; 
    if(end) { 
      end = end.slice(0, 19).replace('T', ' ');
    }
    const start = req.body.start; 

    const sql =
      "INSERT INTO meeting (`start`, `end`, `title`, `description`, `id_resp`, `id_dir`, `allDay`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const newMeeting = [
      start.slice(0, 19).replace('T', ' '),
      end,
      req.body.title,
      req.body.description,
      req.body.id_resp,
      req.id, // Assuming req.id (log user) is the id_dir value 
      allDay,
    ];
    console.log(newMeeting); 
    db.query(sql, newMeeting, (err, result) => {
      if (err) {
        console.log(err); 
        if(err.errno == 1062){
          return res.status(500).json({error:"you can't add meet for same responsable"}); 
        }
        return res.status(500).json(err);
      }
      return res.status(200).json({ success: "New Meeting created" });
    });
  } else {
    res.status(403).json({ error: "You are not authorized" });
  }
};

export const editMeeting = (req, res) => {
  if (req.role === "admin") {
    
   q =
    "UPDATE meeting SET start=?,end=?,title=?, description=?,id_resp =?, id_dir=?  WHERE id_resp= ? ";
  const values = {
    Duree: req.body.duree,
    Description: req.body.description,
    id_Admin: req.body.id_Admin,
    id_resp: req.body.id_resp,
  };
  console.log(values); 
  db.query(q, values, (err, result) => {
    if (err) {
    
       return res.sendStatus(500)
    }
    return res.status(200).json(result);
  });} else {
    res.status(555).json({ error: "You are not authorized" });
  }
};
export const deleteMeeting = (req, res) => {
  if (req.role === "admin") {
  const { start, end, id_resp } = req.params;
  const startFormat = start.slice(0, 19).replace('T', ' ');
  const endFormat = end ? end.slice(0, 19).replace('T', ' ') : null;
  console.log(startFormat,end,id_resp,req.id);

   let  q = ""; 
   let queryParams = []; 
if(end) {
  q = "DELETE FROM meeting WHERE start = ? AND id_resp = ? AND id_dir = ?";
  queryParams = [startFormat, id_resp, req.id]; 
}else {
  q = "DELETE FROM meeting WHERE start = ? AND end = ? AND id_resp = ? AND id_dir = ?";
  queryParams = [startFormat,endFormat,id_resp, req.id];
} 
console.log(queryParams);
console.log(q);
  db.query(q, queryParams, (err, result) => {
    if (err) {
      console.error("Database query error: ", err);
      return res.sendStatus(500);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    return res.status(200).json({ success: "Meeting deleted successfully" });
  });} else {
    res.status(555).json({ error: "You are not authorized" });
  }
};
export const getMeetings = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  const { start, end, id_resp } = req.params;

  // Format start and end dates
  const startFormat = start ? start.slice(0, 19).replace('T', ' ') : null;
  const endFormat = end ? end.slice(0, 19).replace('T', ' ') : null;

  let q = "";
  let queryParams = [];

  if (userRole === "admin") {
    if (start && !end && id_resp) {
      q = "SELECT * FROM meeting WHERE start = ? AND end = ? AND id_resp = ? AND id_dir = ?";
      queryParams = [startFormat, endFormat, id_resp, userId];
    } else if (start && id_resp) {
      q = "SELECT * FROM meeting WHERE start = ? AND id_resp = ? AND id_dir = ?";
      queryParams = [startFormat, id_resp, userId];
    } else {
      q = "SELECT * FROM meeting WHERE id_dir = ?"; 
      queryParams = [userId]; 
    }
  } else if (userRole === "responsable") {
    if (start && !end && id_resp) {
      q = "SELECT * FROM meeting WHERE start = ? AND end = ? AND id_resp = ?";
      queryParams = [startFormat, endFormat, id_resp];
    } else if (start && id_resp) {
      q = "SELECT * FROM meeting WHERE start = ? AND id_resp = ?";
      queryParams = [startFormat, id_resp];
    } else {
      q = "SELECT * FROM meeting WHERE id_resp = ?"; 
      queryParams = [userId]; 
    }
  } else {
    return res.status(403).json("You are not authorized!");
  }
  console.log(q); 
  console.log(queryParams);
  db.query(q, queryParams, (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res.status(500).json("Cannot connect to database");
    }
    console.log(results);
    // Format the results
    const formattedResults = results.map((row) => ({
      ...row,
      start: row.start,
      end: row.end,
      user: {
        firstname: row.firstname,
        lastname: row.lastname
      },
      allDay: row.allDay === "0" ? false : true
    }));
    // console.log(formattedResults);
    return res.json(formattedResults);
  });
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
      DATE(m.start) = CURRENT_DATE()
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
        return mysqlDate;
      };

      const formattedResults = results.map((row) => ({
        ...row,
        start: formatDate(row.start),
        end: formatDate(row.end),
        user: {
          firstname:row.firstname,
          lastname:row.lastname
        },
        allDay:row.allDay === "0"?false: true, 
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


