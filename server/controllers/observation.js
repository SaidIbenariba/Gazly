import { format } from "mysql";
import { db } from "../connect_db.js";
export const deleteObservation = (req, res) => { 
  const {date, id_ws, id_resp} = req.params; 
  if (req.role === "repensable"||req.role === "admin") {
    const sql = "DELETE FROM observation WHERE date = ? AND id_ws = ?  AND id_resp = ?"
  db.query(sql,[date,id_ws, id_resp],(err,result)=>{
    if(err) return res.sendStatus(400); 
    return res.json({succes:"observation was deleted"}) ;
  })}
}

export const getObservations = (req, res) => {
  const userId = req.id;
  const userRole = req.role;
  const status = req.params.status;
  const id_ws = req.params.id_ws;
  const id_resp = req.params.id_resp;
  console.log(req.params); 
  let sql="";
  let queryParams = [];
  if(status && id_ws && id_resp){
     sql = "SELECT o.* FROM observation o  WHERE status = ? AND id_ws = ? AND id_resp = ?";
    queryParams = [status,id_ws,id_resp];
  }else if(status){
    if (userRole === 'admin') {
      sql = "SELECT o.* FROM observation o  WHERE status = ? ";
      queryParams = [status];
    } else if (userRole === 'responsable') {
      sql = "SELECT o.* FROM observation o  WHERE status = ? AND id_resp=?";
      queryParams = [status,userId];
    }
  }else if(id_ws){
    if (userRole === 'admin') {
      sql = "SELECT o.* FROM observation o  WHERE id_ws = ?";
      queryParams = [id_ws];
    } else if (userRole === 'responsable') {
      sql = "SELECT o.* FROM observation o  WHERE id_ws = ? AND id_resp=?";
      queryParams = [id_ws,userId];
    }
    sql = "SELECT o.* FROM observation o  WHERE id_ws = ?";
   queryParams = [id_ws];
 }
    else{
      if (userRole === 'admin') {
        sql = "SELECT o.* FROM observation o ";
      } else if (userRole === 'responsable') {
        sql = "SELECT o.* FROM observation o WHERE id_resp=?";
        queryParams = [userId];
      }
  }
    db.query(sql,queryParams, (err, results) => {
      if (err) {
         
        return res.status(400).json("error mysql");
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
        date: formatDate(row.date),
        
      }));
      console.log("Observations : "); 
      console.log(formattedResults); 
      return res.json(formattedResults);
    });
  };
  export const getObservationsDash = (req, res) => {
    const sql = "SELECT o.* FROM observation o ORDER BY date ASC";
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json("Cannot connect to database:getObservationsDash");
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
        date: formatDate(row.date),
        
      })); 
      console.log("observations:"+formattedResults)
  
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
    console.log("create controller");   
    const userId = req.id;
    const userRole = req.role ; 
    const sql ="INSERT INTO observation (date,`feedback`,`id_ws`,`id_resp`,`status`) VALUE(?,?,?,?,?) ";
    if(userRole == "responsable") { 
    const newObservation = {  
      date: req.body.date,
      feedback: req.body.feedback,
      id_ws: req.body.id_ws,
      id_resp: userId,
      status: req.body.status,   
    };  
    console.log(newObservation); 
    db.query(sql, [...Object.values(newObservation)], (err, result) => {
      if (err) {console.log(err); return res.status(400).json(err);  }
      return res
        .status(200)
        .json({ succes: `New Meeting created ` });
    });
  } 
    };
    export const editObservation =(req,res) =>{
      if (req.role === "repensable") {
        let date =req.params.date;
        const dateFormat = date.slice(0, 19).replace('T',' ');
      const q =
          "UPDATE observation SET feedback = ?,status = ?  WHERE date = ? AND id_ws = ? AND id_resp = ?";
        const values = {
            feedback: req.body.feedback,
            status: req.body.status,
            date: dateFormat, 
            id_ws: req.params.id_ws,
            id_resp: req.params.id_resp,
          };

          console.log(values); 
        db.query(q, [...Object.values(values)], (err, result) => {
            if (err) {
              console.log(err) ;  
              return res.sendStatus(400); 
            }
            return res.status(200).json(result);
          });}else{
            return res.status(200).json('you are not autorized!');
          }
    }
    
