import { db } from "../connect_db.js";  
export const stopAffectation = (req, res) => {
  const { start, id_ws, id_resp } = req.params;
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Check if the start date is valid
  db.query('SELECT * FROM affectation WHERE start = ? AND id_ws = ? AND id_resp = ?', [start, id_ws, id_resp], (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error checking affectation.", error });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "Affectation not found or start date is invalid." });
      }

      // Update the end date to the current date
      db.query('UPDATE affectation SET end = ? WHERE start = ? AND id_ws = ? AND id_resp = ?', [currentDate, start, id_ws, id_resp], (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ message: "Error stopping affectation.", error });
          }

          res.status(200).json({ message: "Affectation stopped successfully." });
      });
  });
};
export const createAffectation = (req, res) =>{ 
  const { start, end, id_ws, id_resp } = req.body;
const query = 'INSERT INTO affectation (start, end, id_ws, id_resp) VALUES (?, ?, ?, ?)';
db.query(query, [start, end, id_ws, id_resp], (err, result) => {
  if (err) {
    console.log("error occur in affectation"); 
    console.log(err); 
  return res.status(500).json({ error: err.message });

}
// check if this work space have already a responsable 
// if already have send res.status(400).json({message:"workspace already have a reponsable "})
// same with responsable can affected to a workspace, if he was already responsable  


return res.json({ message: 'Affectation created successfully', result });
})}; 

export const getAffectations = (req, res) =>{
  let q ='';
  if(req.role=='admin'){
    q='SELECT a.*,u.firstname,u.lastname FROM affectation a LEFT JOIN users u on id_resp=id WHERE id_ws=?'
  db.query(q,req.params.id_ws, (err, result) => {
    if (err) {
       return res.status(500).json(err);
    } 
    
    return res.status(200).json(result);
  });}
} 
