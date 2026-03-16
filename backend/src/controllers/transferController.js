const pool = require("../config/db")

exports.transferCall = async (req,res)=>{

 const {appel_id, conseiller_id} = req.body

 const result = await pool.query(
  `INSERT INTO transfert_appel(
   appel_id,
   conseiller_id,
   date_transfert,
   statut
  )
  VALUES($1,$2,NOW(),'TRANSFERED')
  RETURNING *`,
  [appel_id, conseiller_id]
 )

 res.json(result.rows[0])

}