import { format } from "mysql";
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
        return res.status(500).json(err);
      }
      return res.status(200).json({ success: "New Meeting created" });
    });
  } else {
    res.status(403).json({ error: "You are not authorized" });
  }
};

export const editMeeting = (req, res) => {
  const {start,end,id_resp} = req.params; 
  const startFormat = start.slice(0, 19).replace('T', ' ');
  const endFormat =       end.slice(0, 19).replace('T', ' '); 
  const q =
    "UPDATE meeting SET title=?, description=?,id_resp = ?, id_dir = ?  WHERE start = ? AND end = ? AND id_resp = ?  ";
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
  const { start, id_resp } = req.params;
  console.log("no formated date"); 
  
  const startFormat = start.slice(0, 19).replace('T', ' ');
  console.log(startFormat);  
  console.log(id_resp);
  const q = "DELETE FROM meeting WHERE start = ? AND id_resp = ?";
  db.query(q, [startFormat, id_resp], (err, result) => {
    if (err) {
      console.error("Database query error: ", err);
      return res.sendStatus(500);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    return res.status(200).json({ success: "Meeting deleted successfully" });
  });
};
export const getMeetings = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = `SELECT * FROM meeting WHERE`;
  
  if (userRole == "admin") {
    sql += " id_dir = ?";
  } else if (userRole == "responsable") {
    sql += " id_resp = ?";
  }

  if (userId) {
    db.query(sql, [userId], (err, results) => {  // Passed userId as an array
      if (err) {
        console.error("Database query error: ", err);
        return res.status(500).json("Cannot connect to database");
      }
  
      const formattedResults = results.map((row) => ({
        ...row,
        allDay: row.allDay == "0"?false:true,
        // user: `${row.firstname || ''} ${row.lastname || ''}`.trim(),
      }));
      console.log(results); 
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
function formatDateString(dateString) {
  const options = {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
  
  const convertedDate = formatter.format(dateString);
 
  return convertedDate;
}