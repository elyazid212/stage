exports.importCSV = async (req,res)=>{

  try{

    if(!req.file){
      return res.status(400).json({message:"CSV file required"})
    }

    const leads = await parseCSV(req.file.path)

    let inserted = 0

    for(const lead of leads){

      const phone = normalizePhone(lead.telephone)

      if(!phone) continue

      const exists = await pool.query(
        "SELECT id FROM lead WHERE telephone=$1",
        [phone]
      )

      if(exists.rows.length > 0) continue

      const blacklisted = await pool.query(
        "SELECT id FROM blacklist WHERE telephone=$1",
        [phone]
      )

      if(blacklisted.rows.length > 0) continue

      await pool.query(
        `INSERT INTO lead(prenom,nom,telephone,email,date_creation)
         VALUES($1,$2,$3,$4,NOW())`,
        [lead.prenom,lead.nom,phone,lead.email]
      )

      inserted++

    }

    fs.unlinkSync(req.file.path)

    res.json({
      message:"Import completed",
      inserted
    })

  }catch(err){

    res.status(500).json(err.message)

  }

}