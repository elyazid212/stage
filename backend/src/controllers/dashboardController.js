const pool = require("../config/db")

exports.getStats = async (req,res)=>{

  const totalLeads = await pool.query("SELECT COUNT(*) FROM lead")

  const totalCalls = await pool.query("SELECT COUNT(*) FROM appel")

  const interested = await pool.query(
    "SELECT COUNT(*) FROM resultat_appel WHERE intention_ia='INTERESSE'"
  )

  const transfers = await pool.query(
    "SELECT COUNT(*) FROM transfert_appel"
  )

  const callbacks = await pool.query(
    "SELECT COUNT(*) FROM rappel"
  )

  const cost = await pool.query(
    "SELECT SUM(cout) FROM appel"
  )

  res.json({

    total_leads: totalLeads.rows[0].count,
    total_calls: totalCalls.rows[0].count,
    interested: interested.rows[0].count,
    transfers: transfers.rows[0].count,
    callbacks: callbacks.rows[0].count,
    total_cost: cost.rows[0].sum

  })

}