const pool = require("../config/db")

exports.createResult = async (req, res) => {
  try {

    const { appel_id, intention_ia, commentaire } = req.body

    if (!appel_id || !intention_ia) {
      return res.status(400).json({ message: "Champs manquants" })
    }

    const result = await pool.query(
      `INSERT INTO resultat_appel(appel_id,intention_ia,commentaire)
       VALUES($1,$2,$3) RETURNING *`,
      [appel_id, intention_ia, commentaire]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}