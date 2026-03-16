const pool = require("../config/db")

exports.createCampaign = async (req,res)=>{

  const {
    nom,
    date_debut,
    date_fin,
    heure_debut_appel,
    heure_fin_appel,
    script_id
  } = req.body

  const result = await pool.query(
    `INSERT INTO campagne(
      nom,
      date_debut,
      date_fin,
      heure_debut_appel,
      heure_fin_appel,
      script_id
    ) VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *`,
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

}

exports.getCampaigns = async (req,res)=>{

  const result = await pool.query(
    "SELECT * FROM campagne ORDER BY date_creation DESC"
  )

  res.json(result.rows)

}