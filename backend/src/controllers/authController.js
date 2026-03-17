const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {

    const { nom, email, mot_de_passe, role } = req.body

    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({ message: "Champs obligatoires manquants" })
    }

    const existingUser = await pool.query(
      "SELECT id FROM utilisateur WHERE email=$1",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email déjà utilisé" })
    }

    const hash = await bcrypt.hash(mot_de_passe, 10)

    const result = await pool.query(
      `INSERT INTO utilisateur(nom,email,mot_de_passe,role)
       VALUES($1,$2,$3,$4)
       RETURNING id,nom,email,role`,
      [nom, email, hash, role]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}