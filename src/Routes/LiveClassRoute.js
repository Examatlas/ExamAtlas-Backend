const express = require("express");
const { getAllLiveClasses, createMeeting, deleteClass, getClassById, createLiveClass } = require("../Controllers/LiveClassControllers");
const upload = require("../Middleware/multer");
const route = express.Router()

route.post("/createliveClass",createLiveClass);
route.get("/getAllLiveClass",getAllLiveClasses);
route.post("/createMeeting",upload.single("class_thumbnail"),createMeeting);
route.delete("/deleteClass/:id",deleteClass);
route.get("/getClassById/:id",getClassById);

module.exports = route;