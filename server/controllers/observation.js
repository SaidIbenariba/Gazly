import { db } from "../connect_db.js";
export const editObservation = (req, res) =>{ 
  
}

export const getObservations = (req, res) => {
    const sql = "SELECT o.*,ws.name,ws.x,ws.y,ws.id,u.id,u.firstname,u.lastname FROM observation o INNER JOIN workspace ws ON o.id_WS = ws.id INNER JOIN Users u ON ws.id_resp = u.id WHERE DATE(o.date) = CURDATE()";
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json("Cannot connect to database");
      }
  
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
        position:[
          row.x,
          row.y,
        ],
        observations:[{
          user: {
         firstname:row.firstname,
         lastname:row.lastname,
        },
        feedback:row.feedback,
        }],
        
        date: formatDate(row.date),
        
      }));

      return res.json(formattedResults);
    });
  };
  export const getObservationsDash = (req, res) => {
    const sql = "SELECT o.*,concat(u.firstname,' ',u.lastname) AS responsable FROM observation o INNER JOIN users u ON o.id_resp = u.id WHERE DATE(o.date) = CURDATE()";
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json("Cannot connect to database");
      }
  
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
        date: formatDate(row.date),
        
      }));
      console.log(formattedResults)
  
      return res.json(formattedResults);
    });
  };
 
export const createObservation = (req, res) => {
  const userRole = req.role ; 
  if(userRole == "responsable")  {
  const sql =
    "INSERT INTO observation (date,`feedback`,`id_WS`,`id_resp`,`status`) VALUE(NOW(),?,?,?,?) ";
  const newTache = {
    feedback: req.body.feedback,
    id_WS: req.body.id_WS,
    id_resp: req.body.id_resp,
    status: req.body.status,
  };
  db.query(sql, [Object.values(newTache)], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ succes: `New Meeting created ` });
  });
}else if ( userRole == "admin") { 
    
}
};
 