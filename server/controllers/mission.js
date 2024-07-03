import { db } from "../connect_db.js";

export const deleteMission = (req, res) =>{
  const {start, id_dir, id_resp} = req.params; 

  const sql = "DELETE FROM mission WHERE start = ? AND id_dir = ?  AND id_resp = ?"
  db.query(sql,[start,id_dir, id_resp],(err,result)=>{
    if(err) return res.sendStatus(400); 
    return res.json({succes:"missions was deleted"}) ;
  })
  console.log(req.params); 
}
export const getMissionCounts = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = `
    SELECT 
      status, 
      COUNT(*) AS count 
    FROM mission
  `;

  if (userRole == 'admin') {
    sql += " WHERE id_dir = ?";
  } else if (userRole == 'responsable') {
    sql += " WHERE id_resp = ?";
  }

  sql += " GROUP BY status";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    console.log('Query results:', results);

    const defaultCounts = {
      inProgress: 0,
      inReview: 0,
      onHold: 0,
      completed: 0,
    };

    if (results.length === 0) {
      return res.json(defaultCounts);
    }

    const counts = results.reduce((acc, row) => {
      console.log('Processing row:', row);
      acc[row.status] = row.count;
      return acc;
    }, { ...defaultCounts });

    res.json(counts);
  });
};

export const getMissions = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let sql = "";
  let queryParams = [];
  const status = req.params.status;
  const { start, id_dir, id_resp } = req.params;
  // params is mission id 
  if(start && id_dir && id_resp) { 
    console.log(start, id_dir, id_resp); 
    sql =
        "SELECT * FROM mission WHERE id_dir = ? AND start = ? AND id_resp = ? ";
        queryParams = [id_dir,start,id_resp]; 
  }else if (status) {
    if (userRole == "admin") {
      sql =
        "SELECT * FROM mission WHERE id_dir = ? AND status = ?";
    } else if (userRole == "responsable") {
      sql =
        "SELECT * FROM mission WHERE id_resp = ? AND status = ?";
    }
    queryParams = [userId, status];
  } else {
    console.log("get all Missions"); 
    if (userRole == "admin") {
      sql =
        "SELECT * FROM mission WHERE id_dir = ? ";
    } else if (userRole == "responsable") {
      sql =
        "SELECT * FROM mission WHERE id_resp = ? ";
    }
    queryParams = [userId];
  }
  db.query(sql, queryParams, (err, result) => {  
    if (err) {
      console.error("Database query error: ", result);
      return res.status(500).json({ error: "Cannot connect to database" });
    }
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const formattedResults = result.map((row) => ({
      ...row, 
      start: formatDate(row.start),
      end: formatDate(row.end),
    }));
      
    // console.log("missions : ");
    // console.log(formattedResults);
    return res.json(formattedResults);
  });
};


/*export const getMissions = (req, res) => {
  const userId = req.id;
  const userRole = req.role;

  let sql = "";
  if (userRole === 'admin') {
  sql = "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ?";
} else if (userRole === 'responsable') {
  sql = "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ?";
}
  const queryParams = [userRole];
console.log(userId)
  db.query(sql, queryParams, (err, results) => {  // Corrected from 'users' to 'results'
    if (err) {
      return res.status(500).json("Cannot connect to database");
    }
    console.log(userId);
    const formatDate = (mysqlDate) => {
      const jsDate = new Date(mysqlDate);
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      };
      return jsDate.toLocaleString('en-GB', options);
    };

    const formattedResults = results.map(row => ({
      ...row,
      start: formatDate(row.start),
      end: formatDate(row.end),
    }));

    return res.json(formattedResults);
  });
};*/
export const createMission = (req, res) => {
  const userId=req.id;
  // console.log(userId); 
  const sql = `
  INSERT INTO mission (start, end, title, description, id_dir, id_resp)
  VALUES (?, ?, ?, ?, ?, ?)
`;
const newMission = {
  start: req.body.start,
  end: req.body.end,
  title: req.body.title,
  description: req.body.description,
  id_dir: userId,
  id_resp: Number(req.body.id_resp),
}; 
   console.log('SQL Query:', newMission);

  db.query(sql, [...Object.values(newMission)], (err, result) => {
    if (err) {console.log(err);  return res.status(500).json(err); } 
    return res.status(200).json({ succes: `New Mission created ` });
    
  });
};
    export const editMission = (req, res) => {

        const q =
          "UPDATE mission SET end=?, description=?,title=?,status=?  WHERE id_dir = ? AND start = ? AND id_resp = ?";
        const values = {
            end: req.body.end,
            description: req.body.description,
            title:req.body.title,
            status: req.body.status,
            id_dir: req.params.id_dir,
            start: req.params.start, 
            id_resp: req.params.id_resp,
          };
          
          console.log([...Object.values(values)]); 
        db.query(q, [...Object.values(values)], (err, result) => {
            if (err) return res.status(400).json(err);  
            return res.status(200).json(result);
          });
    };
    export const missionSearch = (req, res) => {
      const userId = req.id;
      const userRole = req.role;
      let q = "";
      if (userRole === 'admin') {
      q = "SELECT * FROM mission WHERE id_dir = ? ";
    } else if (userRole === 'responsable') {
      q = "SELECT * FROM mission WHERE id_resp = ? ";
    }const queryParams = [userId];
    
      let conditions = [];
      if (req.params.searchBy === 'title') {
          conditions.push("title LIKE ?");
          queryParams.push(`%${req.params.values}%`);
      }
      if (req.params.searchBy === 'start') {
          conditions.push("start = ?");
          queryParams.push(req.params.values);
      }
      if (req.params.searchBy === 'end') {
          conditions.push("end = ?");
          queryParams.push(req.params.values);
      }
      /*if (req.params.searchBy === 'firstname') {
          conditions.push("r.firstname LIKE ?");
          queryParams.push(`%${req.params.values}%`);
      }
      if (req.params.searchBy === 'lastname') {
          conditions.push("r.lastname LIKE ?");
          queryParams.push(`%${req.params.values}%`);
      }*/
      if (conditions.length > 0) {
          q += " AND " + conditions.join(" AND ");
      }
    
      db.query(q, queryParams, (err, results) => {  // Corrected from 'users' to 'results'
        if (err) {
          return res.status(500).json("Cannot connect to database");
        }
    
        function formatDate(dateStr) {
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
    
    
        const formattedResults = results.map(row => ({
          ...row,
          start: formatDate(row.start),
          end: formatDate(row.end),
          
        }));
        console.log(formattedResults);
        return res.json(formattedResults);
      });
    };

export const defaultMissionSearch = (req, res) => {
  console.log("default search"); 
  const userId = req.id;
  const userRole = req.role;
  let q = "";
  if (userRole === 'admin') {
  q = "SELECT * FROM mission m WHERE id_dir = ?";
} else if (userRole === 'responsable') {
  q = "SELECT * FROM mission m WHERE id_resp = ?";
}const queryParams = [userId];
const searchValue = req.body;
  console.log("searchValue ");
  console.log(searchValue); 
  let conditions = [];

  // Check if the searchValue is a valid date
  const isDate = !isNaN(Date.parse(searchValue));

  if (isDate) {
    conditions.push("m.start = ? OR m.end = ?");
    queryParams.push(searchValue, searchValue);
  } else {
    conditions.push("m.title LIKE ? OR m.description LIKE ? OR m.status LIKE ?");
    queryParams.push(`%${searchValue}%`,`%${searchValue}%`,`%${searchValue}%`);
  }

  if (conditions.length > 0) {
    q += " AND (" + conditions.join(" OR ") + ")";
  }
  db.query(q, queryParams, (err, results) => {
    if (err) {
 return res.status(400).json(err);    }

    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const formattedResults = results.map(row => ({
      ...row,
      start: formatDate(row.start),
      end: formatDate(row.end),
      
    }));
    console.log(formattedResults);
    return res.json(formattedResults);
  });
};