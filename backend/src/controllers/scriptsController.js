const pool = require("../config/db")

exports.createScript = async (req,res)=>{

  const {nom,contenu,langue} = req.body

  const result = await pool.query(
    "INSERT INTO script_ia(nom,contenu,langue) VALUES($1,$2,$3) RETURNING *",
    [nom,contenu,langue]
  )

  res.json(result.rows[0])

}

exports.getScripts = async (req,res)=>{

  const result = await pool.query("SELECT * FROM script_ia")

  res.json(result.rows)

}