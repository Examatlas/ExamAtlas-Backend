const express = require("express");
const { createLiveClass, getAllLiveClasses } = require("../Controllers/LiveClassControllers");
const route = express.Router()

route.post("/createliveClass",createLiveClass);
route.get("/getAllLiveClass",getAllLiveClasses);

module.exports = route;