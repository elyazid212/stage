const express = require("express")
const router = express.Router()

const blacklistController = require("../controllers/blacklistController")

router.post("/add", blacklistController.add)
router.get("/", blacklistController.getAll)

module.exports = router