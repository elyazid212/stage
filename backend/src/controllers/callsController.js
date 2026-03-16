const pool = require("../config/db")

exports.getCalls = async (req,res)=>{

  const result = await pool.query(
    "SELECT * FROM appel ORDER BY debut_appel DESC"
  )

  res.json(result.rows)

}

exports.createCall = async (req,res)=>{

  const {lead_id,campagne_id} = req.body

  const result = await pool.query(
   `INSERT INTO appel(
    lead_id,
    campagne_id,
    debut_appel,
    statut
   )
   VALUES($1,$2,NOW(),'INIT')
   RETURNING *`,
   [lead_id,campagne_id]
  )

  res.json(result.rows[0])

}