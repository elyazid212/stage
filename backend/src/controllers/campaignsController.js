const pool = require("../config/db")

exports.createCampaign = async (req, res) => {
  try {

    const {
      nom,
      date_debut,
      date_fin,
      heure_debut_appel,
      heure_fin_appel,
      script_id
    } = req.body

    if (!nom || !date_debut || !date_fin || !script_id) {
      return res.status(400).json({ message: "Champs manquants" })
    }

    const result = await pool.query(
      `INSERT INTO campagne(
        nom,date_debut,date_fin,
        heure_debut_appel,heure_fin_appel,script_id
      ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        nom,
        date_debut,
        date_fin,
        heure_debut_appel,
        heure_fin_appel,
        script_id
      ]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

exports.getCampaigns = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM campagne ORDER BY date_debut DESC"
    )

    res.json(result.rows)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}