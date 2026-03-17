const express = require("express")
const router = express.Router()

const resultController = require("../controllers/resultController")
const { verifyToken } = require("../middlewares/authMiddleware")

router.post("/", verifyToken, resultController.createResult)

module.exports = router