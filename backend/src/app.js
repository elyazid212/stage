const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const leadsRoutes = require("./routes/leadsRoutes")
const campaignsRoutes = require("./routes/campaignsRoutes")
const scriptsRoutes = require("./routes/scriptsRoutes")
const callsRoutes = require("./routes/callsRoutes")
const resultsRoutes = require("./routes/resultRoutes")
const transfersRoutes = require("./routes/transferRoutes")
const callbacksRoutes = require("./routes/rappelRoutes")
const blacklistRoutes = require("./routes/blacklistRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/leads", leadsRoutes)
app.use("/campaigns", campaignsRoutes)
app.use("/scripts", scriptsRoutes)
app.use("/calls", callsRoutes)
app.use("/results", resultsRoutes)
app.use("/transfers", transfersRoutes)
app.use("/callbacks", callbacksRoutes)
app.use("/blacklist", blacklistRoutes)
app.use("/dashboard", dashboardRoutes)

module.exports = app