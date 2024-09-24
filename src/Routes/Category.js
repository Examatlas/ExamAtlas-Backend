const express = require("express")
const { createCategory, subCategory, getCategoryById, getSubCategoryById } = require("../Controllers/Category")
const route = express.Router()

route.post("/createcategory",createCategory)
route.get("/getcategorybyid/:id",getCategoryById)
route.post("/createsubcategory",subCategory)
route.get("/getsubcategorybyid/:id",getSubCategoryById)

module.exports = route