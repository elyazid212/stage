const pool = require("../config/db")
const fs = require("fs")
const { parseCSV } = require("../utils/csvParser")
const { normalizePhone } = require("../utils/phoneNormalizer")

// 📌 GET ALL LEADS
exports.getLeads = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM lead ORDER BY date_creation DESC"
    )

    res.json(result.rows)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

// 📌 GET ONE LEAD
exports.getLead = async (req, res) => {
  try {

    const { id } = req.params

    const result = await pool.query(
      "SELECT * FROM lead WHERE id=$1",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Lead introuvable" })
    }

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

// 📌 DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {

    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM lead WHERE id=$1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Lead introuvable" })
    }

    res.json({ message: "Lead supprimé" })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

// 📌 UPDATE LEAD (AJOUT IMPORTANT)
exports.updateLead = async (req, res) => {
  try {

    const { id } = req.params
    const { prenom, nom, telephone, email } = req.body

    const result = await pool.query(
      `UPDATE lead 
       SET prenom=$1, nom=$2, telephone=$3, email=$4
       WHERE id=$5
       RETURNING *`,
      [prenom, nom, telephone, email, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Lead introuvable" })
    }

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })
  }
}

// 📌 IMPORT CSV LEADS (VERSION ROBUSTE)
exports.importCSV = async (req, res) => {

  try {

    // Vérifier fichier
    if (!req.file) {
      return res.status(400).json({ message: "Fichier CSV requis" })
    }

    const leads = await parseCSV(req.file.path)

    let inserted = 0
    let skipped = 0

    for (const lead of leads) {

      // Vérifier données minimales
      if (!lead.prenom || !lead.telephone) {
        skipped++
        continue
      }

      const phone = normalizePhone(lead.telephone)

      if (!phone) {
        skipped++
        continue
      }

      // Vérifier doublon
      const exists = await pool.query(
        "SELECT id FROM lead WHERE telephone=$1",
        [phone]
      )

      if (exists.rows.length > 0) {
        skipped++
        continue
      }

      // Vérifier blacklist
      const blacklisted = await pool.query(
        "SELECT id FROM blacklist WHERE telephone=$1",
        [phone]
      )

      if (blacklisted.rows.length > 0) {
        skipped++
        continue
      }

      // Insert lead
      await pool.query(
        `INSERT INTO lead(prenom, nom, telephone, email, date_creation)
         VALUES($1,$2,$3,$4,NOW())`,
        [
          lead.prenom,
          lead.nom || null,
          phone,
          lead.email || null
        ]
      )

      inserted++
    }

    // Supprimer fichier temporaire
    fs.unlinkSync(req.file.path)

    res.json({
      message: "Import terminé",
      inserted,
      skipped
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur import CSV" })
  }

}