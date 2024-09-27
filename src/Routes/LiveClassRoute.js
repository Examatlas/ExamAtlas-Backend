const express = require("express");
const {
  getAllLiveClasses,
  createMeeting,
  deleteClass,
  getClassById,
  createLiveClass,
  getAllScheduledCourseByCourseId,
  ScheduleLiveCourse,
  getLiveCourseById,
  updateLiveCourse,
} = require("../Controllers/LiveClassControllers");
const upload = require("../Middleware/multer");
const route = express.Router();

route.post("/createliveClass", createLiveClass);
route.get("/getAllLiveClass", getAllLiveClasses);
route.get("/getLiveCourseById/:courseId",getLiveCourseById);
route.post("/scheduleLiveCourse",ScheduleLiveCourse);
route.patch("/createMeeting/:id", createMeeting);
route.get(
  "/getAllScheduledCourseByCourseId/:courseId",
  getAllScheduledCourseByCourseId
);
route.delete("/deleteClass/:id", deleteClass);
route.get("/getClassById/:id", getClassById);
route.put("/updateLiveCourse/:id",updateLiveCourse);

module.exports = route;
