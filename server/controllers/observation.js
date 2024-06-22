import { format } from "mysql";
import { db } from "../connect_db.js";
export const deleteObservation = (req, res) => { 
  const {date, id_ws, id_resp} = req.params; 
  console.log(date);
  const sql = "DELETE FROM observation WHERE date = ? AND id_ws = ?  AND id_resp = ?"
  db.query(sql,[date,id_ws, id_resp],(err,result)=>{
    if(err) return res.sendStatus(400); 
    return res.json({succes:"observation was deleted"}) ;
  })
  console.log(req.params); 
}

export const getObservations = (req, res) => {
  const status = req.params.status;
  const id_ws = req.params.id_ws;
  const id_resp = req.params.id_resp;
  let sql="";
  let queryParams = [];
  if(status && id_ws && id_resp){
     sql = "SELECT o.* FROM observation o  WHERE status=? AND id_ws=? AND id_resp=?";
    queryParams = [status,id_ws,id_resp];
  }else if(status){
     sql = "SELECT o.* FROM observation o  WHERE status=? ";
    queryParams = [status,id_ws,id_resp];
  }else if(id_ws){
    sql = "SELECT o.* FROM observation o  WHERE id_ws=?";
   queryParams = [status,id_ws,id_resp];
 }
    else{
     sql = "SELECT o.* FROM observation o  ";

  }
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(400).json("error mysql");
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
        
        observations:[{
          user: {
         firstname:row.firstname,
         lastname:row.lastname,
        },
        feedback:row.feedback,
        }],
        
        date: formatDate(row.date),
        
      }));
      console.log("Observations : "); 
      console.log(formattedResults); 
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
  // export const getObservationsOfWorkSpace = (req, res) => {
  //   const sql = `SELECT o.*, ws.name AS workspace_name, ws.x, ws.y, u.firstname, u.lastname 
  //                FROM observation o 
  //                INNER JOIN workspace ws ON o.id_WS = ws.id 
  //                INNER JOIN users u ON o.id_resp = u.id 
  //                WHERE ws.id = ?`;
  
  //   db.query(sql, [req.params.id_ws], (err, results) => {
  //     if (err) {
  //       return res.status(500).json("Cannot connect to database");
  //     }
  
  //     const formatDate = (mysqlDate) => {
  //       const jsDate = new Date(mysqlDate);
  //       const options = {
  //         weekday: 'short',
  //         year: 'numeric',
  //         month: 'short',
  //         day: '2-digit',
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit',
  //         timeZoneName: 'short',
  //       };
  //       return jsDate.toLocaleString('en-GB', options);
  //     };
  
  //     // Group observations by workspace
  //     const workspaceMap = results.reduce((acc, row) => {
  //       const workspaceId = row.id_WS;
  //       if (!acc[workspaceId]) {
  //         acc[workspaceId] = {
  //           id: workspaceId,
  //           name: row.workspace_name,
  //           position: [row.x, row.y],
  //           observations: [],
  //         };
  //       }
  //       acc[workspaceId].observations.push({
  //         user: {
  //           firstname: row.firstname,
  //           lastname: row.lastname,
  //         },
  //         feedback: row.feedback,
  //       });
  //       return acc;
  //     }, {});
  
  //     const finalResults = Object.values(workspaceMap);
  
  //     // Log observations for each workspace
  //     finalResults.forEach(workspace => {
  //       console.log(`Workspace: ${workspace.name},position:  ${workspace.position},id:  ${workspace.id}, Observations:`, workspace.observations);
  //     });
  //     return res.json(finalResults);
  //   });
  // };
  
  
  export const createObservation = (req, res) => {
    const sql ="INSERT INTO observation (date,`feedback`,`id_WS`,`id_resp`,`status`) VALUE(?,?,?,?,?) ";
    const newObservation = {
      date: req.body.date,
      feedback: req.body.feedback,
      id_WS: req.body.id_WS,
      id_resp: req.body.id_resp,
      status: req.body.status,
    };
    db.query(sql, [...Object.values(newObservation)], (err, result) => {
      if (err) return res.status(500).json(err);
      return res
        .status(200)
        .json({ succes: `New Meeting created ` });
    });
    };
    export const editObservation =(req,res) =>{
      const q =
          "UPDATE observation SET feedback=?,status=?  WHERE date=? AND id_ws=? AND id_resp=?";
        const values = {
            feedback: req.body.feedback,
            status: req.body.status,
            date: req.params.date, 
            id_dir: req.params.id_ws,
            id_resp: req.params.id_resp,
          };
        db.query(q, [Object.values(values)], (err, result) => {
            if (err) return res.sendStatus(500);
            return res.status(200).json(result);
          });
    }
    
