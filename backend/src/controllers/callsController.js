const pool = require("../config/db")

exports.createCall = async (req, res) => {
  try {

    const { lead_id, campagne_id } = req.body

    if (!lead_id || !campagne_id) {
      return res.status(400).json({ message: "Champs manquants" })
    }

    const result = await pool.query(
      `INSERT INTO appel(
        lead_id,campagne_id,debut_appel,statut
      ) VALUES($1,$2,NOW(),'INIT') RETURNING *`,
      [lead_id, campagne_id]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

exports.getCalls = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM appel ORDER BY debut_appel DESC"
    )

    res.json(result.rows)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}