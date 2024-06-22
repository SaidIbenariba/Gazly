import { db } from "../connect_db.js";


export const getTasksForResp = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM Task WHERE id_resp = ?`;
    db.query(q, req.params.id_resp, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const getTasksForOuvrier = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM Task WHERE id_ouv = ?`;
    db.query(q, req.params.id_ouv, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const respSearch = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM task WHERE id_ouv = ? `;
    db.query(q, [req.params.id_ouv], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const ouvSearch = (req, res) => {
    // console.log(req.params);
    const q = `SELECT * FROM Task WHERE id_resp = ? `;
    db.query(q, [req.params.date], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(result);
    });
  };
  export const createTask = (req, res) => {
    const sql ="INSERT INTO Task (date,`duree`,`description`,`id_ouv`,`id_resp`) VALUES(NOW(),?,?,?,?) ";
    const newTache = {
      Duree: req.body.duree,
      Description: req.body.description,
      id_ouv: req.body.id_ouv,
      id_resp: req.body.id_resp,
    };
    db.query(sql, [Object.values(newTache)], (err, result) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ succes: `New tache created ` });
    });
    };
    export const editTask = (req, res) => {
        const q =
          "UPDATE Task SET duree=?, description=?, WHERE id_ouv= ? AND id_resp= ?";
        const values = {
            Duree: req.body.duree,
            Description: req.body.description,
            id_ouv: req.params.id_ouv,
            id_resp: req.params.id_resp,
          };
        db.query(q, values, (err, result) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(result);
          });
    };
    export const deleteTask = (req, res) => {
        const q = "DELETE FROM Task WHERE id_ouv= ? ";
        db.query(q, req.params.id_ouv, (err, result) => {
          if (err) return res.sendStatus(500);
          return res.status(200).json(result);
        });
    };
    export const getTasks = (req, res) => {
      const userId = req.id;
  const userRole = req.role;
  let sql = "";
  let queryParams = [];
  const status = req.params.status;
  const { date, id_ouv, id_resp } = req.params;
  if(date && id_ouv && id_resp) { 
    sql =
        "SELECT * FROM task WHERE id_ouv = ? AND date = ? AND id_resp = ? ";
        queryParams = [id_ouv,date,id_resp]; 
  }else if (status) {
    if (userRole == "responsable") {
      sql =
        "SELECT * FROM task WHERE id_resp = ? AND status = ?";
    } else if (userRole == "ouvrier") {
      sql =
        "SELECT * FROM task WHERE id_ouv = ? AND status = ?";
    }
    queryParams = [userId, status];
  } else {
    if (userRole == "responsable") {
      sql =
        "SELECT * FROM task WHERE id_resp = ? ";
    } else if (userRole == "ouvrier") {
      sql =
        "SELECT * FROM task WHERE id_ouv = ? ";
    }
    queryParams = [userId];
  }
      db.query(sql, (err, tasks) => {
        if (err) {
          console.error("Database query error: ", err);
          return res.status(500).json({ error: "Cannot connect to database" });
        }
    
        const formatDate = (mysqlDate) => {
          const jsDate = new Date(mysqlDate);
          const year = jsDate.getFullYear();
          const month = String(jsDate.getMonth() + 1).padStart(2, '0');
          const day = String(jsDate.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
    
        const formattedTasks = tasks.map((task) => ({
          ...task,
          date: task.date ? formatDate(task.date) : null,
        }));
    
        console.log("tasks:");
        console.log(formattedTasks);
        return res.json(formattedTasks);
      });
    };
    
