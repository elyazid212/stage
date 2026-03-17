const pool = require("../config/db")

exports.add = async (req, res) => {
  try {

    const { telephone } = req.body

    if (!telephone) {
      return res.status(400).json({ message: "Téléphone requis" })
    }

    const result = await pool.query(
      "INSERT INTO blacklist(telephone) VALUES($1) RETURNING *",
      [telephone]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

exports.getAll = async (req, res) => {
  const result = await pool.query("SELECT * FROM blacklist")
  res.json(result.rows)
}