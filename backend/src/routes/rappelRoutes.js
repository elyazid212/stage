const express = require("express")
const router = express.Router()

const rappelController = require("../controllers/rappelController")

router.post("/create", rappelController.createRappel)

module.exports = router