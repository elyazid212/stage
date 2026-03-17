const express = require("express")
const router = express.Router()

const leadsController = require("../controllers/leadsController")
const {verifyToken} = require("../middlewares/authMiddleware")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

router.post("/import", verifyToken, upload.single("file"), leadsController.importCSV)

router.get("/",verifyToken,leadsController.getLeads)
router.get("/:id",verifyToken,leadsController.getLead)
router.delete("/:id",verifyToken,leadsController.deleteLead)
router.put("/:id", verifyToken, leadsController.updateLead)

module.exports = router