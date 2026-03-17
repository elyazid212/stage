const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  try {

    const { nom, email, mot_de_passe, role } = req.body

    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({ message: "Champs manquants" })
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10)

    const result = await pool.query(
      `INSERT INTO utilisateur(nom,email,mot_de_passe,role)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [nom, email, hashedPassword, role || "USER"]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

exports.login = async (req, res) => {
  try {

    const { email, mot_de_passe } = req.body

    const user = await pool.query(
      "SELECT * FROM utilisateur WHERE email=$1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Utilisateur introuvable" })
    }

    const valid = await bcrypt.compare(
      mot_de_passe,
      user.rows[0].mot_de_passe
    )

    if (!valid) {
      return res.status(400).json({ message: "Mot de passe incorrect" })
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}