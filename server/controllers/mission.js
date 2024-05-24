import { db } from "../connect_db.js";
export const missionsInProgress = (req, res) => {
    const sql = "SELECT COUNT(*) AS InProgressnumber FROM mission WHERE status ='In Progress'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissionsInProgress = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id     WHERE m.status = 'In Progress'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const missionsInReview = (req, res) => {
    const sql = "SELECT COUNT(*) FROM mission WHERE status ='In Review'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissionsInReview = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id  WHERE m.status = 'In Review'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const missionsOnHold = (req, res) => {
    const sql = "SELECT COUNT(*) FROM mission WHERE status ='On Hold'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissionsOnHold = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.status = 'On Hold'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const missionsCompleted = (req, res) => {
    const sql = "SELECT COUNT(*) FROM mission WHERE status ='Completed'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissionsCompleted = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.status = 'Completed'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const missionsExpired = (req, res) => {
    const sql = "SELECT COUNT(*) FROM mission WHERE status ='Expired'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissionsExpired = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id WHERE m.status = 'Expired'";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const getMissions = (req, res) => {
    const sql = "SELECT m.*,r.firstname,r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id";
    db.query(sql, (err, users) => {
      if (err) res.status(500).json("Can not connect to database");
      return res.json(users);
    });
  };
  export const createMission = (req, res) => {
    const sql ="INSERT INTO mission (`startdate`,`duree`,`title`,`description`,`id_dir`,`id_resp`) VALUES(NOW(),?,?,?,?) ";
    const newTache = {
      Duree: req.body.duree,
      title: req.body.title,
      Description: req.body.description,
      id_ouv: req.body.id_dir,
      id_resp: req.body.id_resp,
    };
    db.query(sql, [Object.values(newTache)], (err, result) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ succes: `New Mission created ` });
    });
    };
    export const adminMissionSearch = (req, res) => {
      let q = "SELECT m.*, r.firstname, r.lastname FROM mission m INNER JOIN users r ON m.id_resp = r.id";
      const queryParams = [];
    
      let conditions = [];
      if (req.query.title) {
        conditions.push("m.title LIKE ?");
        queryParams.push(`%${req.query.title}%`);
      }
      if (req.query.startdate) {
        conditions.push("m.startdate = ?");
        queryParams.push(req.query.startdate);
      }
      if (req.query.enddate) {
        conditions.push("m.enddate = ?");
        queryParams.push(req.query.enddate);
      }
      if (req.query.firstname) {
        conditions.push("r.firstname LIKE ?");
        queryParams.push(`%${req.query.firstname}%`);
      }
      if (req.query.lastname) {
        conditions.push("r.lastname LIKE ?");
        queryParams.push(`%${req.query.lastname}%`);
      }
      if (conditions.length > 0) {
        q += " WHERE " + conditions.join(" AND ");
      }
      db.query(q, queryParams, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
      });
    };
    
   