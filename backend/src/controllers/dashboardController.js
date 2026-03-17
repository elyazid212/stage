const pool = require("../config/db")

exports.getStats = async (req, res) => {
  try {

    const leads = await pool.query("SELECT COUNT(*) FROM lead")
    const calls = await pool.query("SELECT COUNT(*) FROM appel")

    const interested = await pool.query(
      "SELECT COUNT(*) FROM resultat_appel WHERE intention_ia='INTERESSE'"
    )

    const cost = await pool.query("SELECT SUM(cout) FROM appel")

    res.json({
      total_leads: leads.rows[0].count,
      total_calls: calls.rows[0].count,
      interested: interested.rows[0].count,
      total_cost: cost.rows[0].sum
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}