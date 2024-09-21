const express = require("express");
const { createCourse, getAllCourses } = require("../Controllers/Courses");
const route = express.Router()

route.post("/createcourse",createCourse)
route.get("/getAllCourse",getAllCourses)

module.exports = route;

