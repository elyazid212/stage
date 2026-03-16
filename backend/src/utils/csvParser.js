const fs = require("fs")
const csv = require("csv-parse")

exports.parseCSV = (filePath) => {

  return new Promise((resolve,reject)=>{

    const leads = []

    fs.createReadStream(filePath)
      .pipe(csv.parse({columns:true}))
      .on("data",(row)=>{

        leads.push({
          prenom:row.prenom,
          nom:row.nom,
          telephone:row.telephone,
          email:row.email
        })

      })
      .on("end",()=>resolve(leads))
      .on("error",reject)

  })

}