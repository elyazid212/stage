const express = require("express")
const router = express.Router()

const scriptsController = require("../controllers/scriptsController")
const {verifyToken} = require("../middlewares/authMiddleware")

router.post("/",verifyToken,scriptsController.createScript)
router.get("/",verifyToken,scriptsController.getScripts)

module.exports = router