const express = require("express")
const { createUser, login, adminLogin ,getAllUser, getUserById, forgotPassword, resetPassword} = require("../Controllers/user")
const { isAuthenticated } = require("../Middleware/Auth")
const route = express.Router()

route.post("/createUser",createUser)
route.post("/loginUser",login)
route.post("/adminLogin",adminLogin)
route.get("/getUser",getAllUser)
route.get("/getUserById/:id",getUserById)
// route.get("/getUserById/:id",isAuthenticated,getUserById)

route.post("/forgotpassword",forgotPassword)
route.post("/resetpassword",resetPassword)

module.exports = route

