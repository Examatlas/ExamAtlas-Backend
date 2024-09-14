const express = require("express")
const { createBlog } = require("../Controllers/Blog")
// const { authorizeRoles } = require("../Middleware/Auth")
const route = express.Router()

route.post("/createBlog",createBlog)

module.exports = route