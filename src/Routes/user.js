const express = require("express")
const { createUser, login } = require("../Controllers/user")
const route = express.Router()

route.post("/createUser",createUser)
route.post("/loginUser",login)

module.exports = route