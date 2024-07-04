import { db } from "../connect_db.js";  

export const createAffectation = (req, res) =>{ 
    const { start, end, id_ws, id_resp } = req.body;
  const query = 'INSERT INTO affectation (start, end, id_ws, id_resp) VALUES (?, ?, ?, ?)';
  db.query(query, [start, end, id_ws, id_resp], (err, result) => {
    if (err) {
        console.log("error occur in affectation"); 
        console.log(err); 
      return res.status(500).json({ error: err.message });
 
    }
    
    return res.json({ message: 'Affectation created successfully', result });
  });
}