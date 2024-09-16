const express = require("express");
const { createLiveClass } = require("../Controllers/LiveClassControllers");
const route = express.Router()

route.post("/createliveClass",createLiveClass)

module.exports = route;