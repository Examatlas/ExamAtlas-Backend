const express = require("express")
const { createCurrentAffair, updateCurrentAffair, getAllCurrentAffairs, getCurrentAffairById, deleteCurrentAffair } = require("../Controllers/CurrentAffair")
const route = express.Router()

route.post("/createCA",createCurrentAffair)
route.put("/updateCA/:id",updateCurrentAffair)
route.get("/getAllCA",getAllCurrentAffairs)
route.get("/getById/:id",getCurrentAffairById)
route.delete("/deleteById/:id",deleteCurrentAffair)


module.exports = route


