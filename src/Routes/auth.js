const express = require("express")
const { createUser, login, adminLogin ,getAllUser, getUserById, forgotPassword, resetPassword} = require("../Controllers/auth")
const { isAuthenticated } = require("../Middleware/Auth")
const route = express.Router()

route.post("/createUser",createUser)
route.post("/loginUser",login)
route.post("/adminLogin",adminLogin)
route.post("/forgotpassword",forgotPassword)
route.post("/resetpassword",resetPassword)

module.exports = route

