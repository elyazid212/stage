exports.normalizePhone = (phone)=>{

  if(!phone) return null

  return phone
    .replace(/\s/g,"")
    .replace(/-/g,"")

}