import { db } from "../connect_db.js";
export const editMission = (req,res) =>{ 
  
}
export const getMissionCounts = (req, res) => {
  console.log(`getMissionCounts controller start`);
  const userId = req.id;
  const userRole = req.role;
  let sql = `
    SELECT 
      status, 
      COUNT(*) AS count 
    FROM mission
  `;

  if (userRole == "admin") {
    sql += " WHERE id_dir = ?";
  } else if (userRole == "responsable") {
    sql += " WHERE id_resp = ?";
  }

  sql += " GROUP BY status";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    console.log("Query results:", results);

    const defaultCounts = {
      inProgress: 0,
      inReview: 0,
      onHold: 0,
      completed: 0,
    };

    if (results.length === 0) {
      return res.json(defaultCounts);
    }

    const counts = results.reduce(
      (acc, row) => {
        console.log("Processing row:", row);
        acc[row.status] = row.count;
        return acc;
      },
      { ...defaultCounts }
    );

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
  }else if (status) {
    if (userRole === "admin") {
      sql =
        "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ? AND m.status = ?";
    } else if (userRole === "responsable") {
      sql =
        "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ? AND m.status = ?";
    }
    queryParams = [userId, status];
  } else {
    if (userRole === "admin") {
      sql =
        "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ?";
    } else if (userRole === "responsable") {
      sql =
        "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ?";
    }
    queryParams = [userId];
  }
  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error("Database query error: ", err);
      return res.status(500).json({ error: "Cannot connect to database" });
    }

    const formatDate = (mysqlDate) => {
      const jsDate = new Date(mysqlDate);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      return jsDate.toLocaleString("en-GB", options);
    };

    const formattedResults = results.map((row) => ({
      ...row,
      start: formatDate(row.start),
      end: formatDate(row.end),
    }));
    console.log("missions : ");
    console.log(formattedResults);
    return res.json(formattedResults);
  });
};

// export const getMissions = (req, res) => {
//   const userId = req.id;
//   const userRole = req.role;

//   let sql = "";
//   if (userRole === "admin") {
//     sql =
//       "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ?";
//   } else if (userRole === "responsable") {
//     sql =
//       "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ?";
//   }
//   const queryParams = [userRole];
//   console.log(userId);
//   db.query(sql, queryParams, (err, results) => {
//     // Corrected from 'users' to 'results'
//     if (err) {
//       return res.status(500).json("Cannot connect to database");
//     }
//     console.log(userId);
//     const formatDate = (mysqlDate) => {
//       const jsDate = new Date(mysqlDate);
//       const options = {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         timeZoneName: "short",
//       };
//       return jsDate.toLocaleString("en-GB", options);
//     };

//     const formattedResults = results.map((row) => ({
//       ...row,
//       start: formatDate(row.start),
//       end: formatDate(row.end),
//     }));

//     return res.json(formattedResults);
//   });
// };
export const createMission = (req, res) => {
  const sql =
    "INSERT INTO mission (`start`,`end`,`title`,`description`,`id_dir`,`id_resp`) VALUES(?,?,?,?,?,?) ";
  const newTache = {
    start: req.body.start,
    end: req.body.end,
    title: req.body.title,
    Description: req.body.description,
    id_ouv: req.body.id_dir,
    id_resp: req.body.id_resp,
  };
  console.log(newTache); 
  db.query(sql, [Object.values(newTache)], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ succes: `New Mission created ` });
  });
};
export const missionSearch = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let q = "";
  if (userRole === "admin") {
    q =
      "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ? ";
  } else if (userRole === "responsable") {
    q =
      "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ?";
  }
  const queryParams = [userId];

  let conditions = [];
  if (req.params.searchBy === "title") {
    conditions.push("m.title LIKE ?");
    queryParams.push(`%${req.params.values}%`);
  }
  if (req.params.searchBy === "startdate") {
    conditions.push("m.startdate = ?");
    queryParams.push(req.params.values);
  }
  if (req.params.searchBy === "enddate") {
    conditions.push("m.enddate = ?");
    queryParams.push(req.params.values);
  }
  if (req.params.searchBy === "firstname") {
    conditions.push("r.firstname LIKE ?");
    queryParams.push(`%${req.params.values}%`);
  }
  if (req.params.searchBy === "lastname") {
    conditions.push("r.lastname LIKE ?");
    queryParams.push(`%${req.params.values}%`);
  }
  if (conditions.length > 0) {
    q += " AND " + conditions.join(" AND ");
  }

  db.query(q, queryParams, (err, results) => {
    // Corrected from 'users' to 'results'
    if (err) {
      return res.status(500).json("Cannot connect to database");
    }

    const formatDate = (mysqlDate) => {
      const jsDate = new Date(mysqlDate);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      return jsDate.toLocaleString("en-GB", options);
    };

    const formattedResults = results.map((row) => ({
      ...row,
      start: formatDate(row.start),
      end: formatDate(row.end),
      user: [row.firstname, row.lastname],
    }));

    return res.json(formattedResults);
  });
};

export const defaultMissionSearch = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  let q = "";
  if (userRole === "admin") {
    q =
      "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as directeur FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.id_dir = ? ";
  } else if (userRole === "responsable") {
    q =
      "SELECT m.*, CONCAT(r.firstname, ' ', r.lastname) as responsable FROM mission m INNER JOIN users r ON m.id_dir = r.id WHERE m.id_resp = ?";
  }
  const queryParams = [userId];
  const searchValue = req.params.values;

  let conditions = [];

  // Check if the searchValue is a valid date
  const isDate = !isNaN(Date.parse(searchValue));

  if (isDate) {
    conditions.push("m.start = ? OR m.end = ?");
    queryParams.push(searchValue, searchValue);
  } else {
    conditions.push(
      "m.title LIKE ? OR m.discription LIKE ? OR m.status LIKE ? OR r.firstname LIKE ? OR r.lastname LIKE ?"
    );
    queryParams.push(
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`
    );
  }

  if (conditions.length > 0) {
    q += " AND (" + conditions.join(" OR ") + ")";
  }
  db.query(q, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json("Cannot connect to database");
    }

    const formatDate = (mysqlDate) => {
      const jsDate = new Date(mysqlDate);
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      };
      return jsDate.toLocaleString("en-GB", options);
    };

    const formattedResults = results.map((row) => ({
      ...row,
      start: formatDate(row.start),
      end: formatDate(row.end),
      user: [row.firstname, row.lastname],
    }));

    return res.json(formattedResults);
  });
};
