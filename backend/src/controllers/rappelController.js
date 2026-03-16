const pool = require("../config/db")

exports.createRappel = async (req,res)=>{

  const {lead_id,campagne_id,date_rappel} = req.body

  const result = await pool.query(
    "INSERT INTO rappel(lead_id,campagne_id,date_rappel,statut) VALUES($1,$2,$3,'PENDING') RETURNING *",
    [lead_id,campagne_id,date_rappel]
  )

  res.json(result.rows[0])

}