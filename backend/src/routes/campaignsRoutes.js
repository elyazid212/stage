const express = require("express")
const router = express.Router()

const campaignsController = require("../controllers/campaignsController")
const {verifyToken} = require("../middlewares/authMiddleware")

router.post("/",verifyToken,campaignsController.createCampaign)
router.get("/",verifyToken,campaignsController.getCampaigns)

module.exports = router