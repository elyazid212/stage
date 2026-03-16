const express = require("express")
const router = express.Router()

const callsController = require("../controllers/callsController")
const {verifyToken} = require("../middlewares/authMiddleware")

router.get("/",verifyToken,callsController.getCalls)
router.post("/",verifyToken,callsController.createCall)

module.exports = router