const express = require("express")
const { createUser, login, adminLogin } = require("../Controllers/user")
const route = express.Router()

route.post("/createUser",createUser)
route.post("/loginUser",login)
route.post("/adminLogin",adminLogin)

module.exports = route