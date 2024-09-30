const LiveClassModel = require("../Models/LiveClassModel");

const jwt = require("jsonwebtoken");
const ScheduleLiveClassModel = require("../Models/ScheduleLiveClassModel");

// Function to create a meeting
async function createMeeting(req, res) {
  const { id } = req?.params;
  const url = "https://api.videosdk.live/v2/rooms";

  const options = {
    expiresIn: "3h",
    algorithm: "HS256",
  };
  const payload = {
    apikey: process?.env?.VIDEOSDK_API_KEY,
    permissions: [`allow_join`],
    // version: 2,
    // roomId: `2kyv-gzay-64pg`,
    // participantId: `lxvdplwt`,
    // roles: ["crawler","rtc"],
  };

  const token = jwt.sign(payload, process?.env?.VIDEOSDK_SECRET_KEY, options);

  try {
    if (!id) {
      return res?.status(404)?.json({ message: "Course not Found" });
    }
    const options = {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   "customRoomId" : "aaa-bbb-ccc",
      //   // "webhook" : "see example",
      //   // "autoCloseConfig" : "see example",
      //   // "autoStartConfig" : "see example"
      // }),
    };
    const response = await fetch(url, options);

    const data = await response?.json();
    if (data) {
      const CreateMeeting = await ScheduleLiveClassModel?.updateOne(
        {
          _id: id,
        },
        {
          $set: { meetingId: data?.roomId, token },
        }
      );

      if (CreateMeeting.modifiedCount === 0) {
        return res
          .status(404)
          .json({ status: false, message: "Meeting not created." });
      }
    }
    return res.status(201).json({ status: true, message: "Meeting Created" });
  } catch (error) {
    console.error(
      "Error creating meeting:",
      error.response ? error.response.data : error.message
    );
    return res?.status(500)?.json({ message: "Internal Server Error", error });
  }
}

// const joinMeeting = async (req, res) => {
//   try {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: "$YOUR_TOKEN",
//         "Content-Type": "application/json",
//       },
//     };
//     const roomId = "your_roomId";
//     const url = `https://api.videosdk.live/v2/rooms/${roomId}`;
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {}
// };

//get all scheduled class
const getAllScheduledCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courses = await ScheduleLiveClassModel.find({ courseId }).sort({
      createdAt: -1,
    });

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No classes found for this course" });
    }
    return res.status(200).json({
      courses,
      status: true,
      message: "All Scheduled course data fetched",
    });
  } catch (error) {
    return res?.status(500)?.json({ message: "Internal Server Error", error });
  }
};

const getScheduledCourseById = async (req, res) => {
  try {
    const { classId } = req?.params;
    const course = await ScheduleLiveClassModel?.findById(classId);
    if (!course) {
      return res
        ?.status(400)
        .json({ status: false, message: "Class not Found" });
    }
    return res
      ?.status(200)
      .json({ status: true, course, message: "data fetched successfully" });
  } catch (error) {
    return res
      ?.status(500)
      .json({ error, status: false, message: "Internal server error" });
  }
};
//schedule live class
const ScheduleLiveCourse = async (req, res) => {
  try {
    const { title, courseId, date, time } = req?.body;
    if (!title || !date || !time || !courseId) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    const newMeeting = await ScheduleLiveClassModel({
      title,
      courseId,
      date,
      time,
    });
    await newMeeting.save();
    return res.status(201).json({ status: true, message: "Class Scheduled" });
  } catch (error) {
    return res?.status(500)?.json({ message: "Internal Server Error", error });
  }
};
//create a live course
const createLiveClass = async (req, res) => {
  try {
    const {
      teacher,
      // keyword,
      tags,
      // date_time,
      category,
      sub_category,
      title,
      description,
    } = req?.body;
    if (
      !teacher ||
      !title ||
      !description ||
      !tags ||
      !category ||
      !sub_category
    ) {
      return res
        .status(422)
        .json({ status: false, message: "All fields are required" });
    }
    const newClass = await LiveClassModel(req?.body);
    await newClass.save();
    return res
      .status(200)
      .json({ status: true, message: "Class Created Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
// get live class by id
const getLiveCourseById = async (req, res) => {
  try {
    const { courseId } = req?.params;
    if (!courseId) {
      return res
        ?.status(400)
        .json({ status: false, message: "Course Id not found" });
    }
    const course = await LiveClassModel?.findById(courseId);
    return res
      ?.status(200)
      .json({ statsu: true, course, message: "Course Fetched successfully" });
  } catch (error) {
    res?.status(500).json({ status: false, message: "Internal server error" });
  }
};
// get course by id
const getClassById = async (req, res) => {
  try {
    const { id } = req?.params;
    const classs = await LiveClassModel?.findById(id);
    if (!classs) {
      return res
        ?.status(404)
        .json({ status: false, message: "Class Not found " });
    }
    return res
      ?.status(200)
      .json({ status: true, message: "Class fetched ", classs });
  } catch (error) {
    return res
      ?.status(500)
      .json({ status: false, message: "Internal Server Error ", error });
  }
};
//get all live courses
const getAllLiveClasses = async (req, res) => {
  try {
    const classes = await LiveClassModel?.find();
    if (!classes) {
      return res
        .status(404)
        .json({ status: false, message: "No Live Class Found" });
    }
    return res
      .status(200)
      .json({ status: true, classes, message: "Class Created Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, error, message: "Internal server error" });
  }
};
//delete class
const deleteClass = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res
        .status(404)
        .json({ status: false, message: "Class Id not found" });
    }
    const deleteClass = await LiveClassModel?.findByIdAndDelete(id);

    if (!deleteClass) {
      return res
        ?.status(404)
        .json({ status: false, message: "Class not found" });
    }

    return res
      ?.status(200)
      .json({ status: true, message: "Deleted successfully" });
    // LiveClassModel?.
  } catch (error) {
    return res
      ?.status(500)
      .json({ status: false, message: "Internal Server Error", error });
  }
};
//update live course
const updateLiveCourse = async (req, res) => {
  try {
    const { id } = req?.params;
    const { title, description, teacher, tags, category, sub_category } =
      req.body;
    const liveCourse = await LiveClassModel.findById(id);

    if (!liveCourse) {
      return res.status(404).json({ message: "Live course not found" });
    }

    // Update fields
    liveCourse.title = title || liveCourse.title;
    liveCourse.description = description || liveCourse.description;
    liveCourse.teacher = teacher || liveCourse.teacher;
    liveCourse.category = category || liveCourse.category;
    liveCourse.sub_category = sub_category || liveCourse.sub_category;
    liveCourse.tags = Array.isArray(tags) ? tags : liveCourse.tags;

    await liveCourse.save(); // Save the updated blog

    return res
      .status(200)
      .json({ status: true, message: "Live Course updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

module.exports = {
  createLiveClass,
  getAllLiveClasses,
  createMeeting,
  deleteClass,
  getClassById,
  getAllScheduledCourseByCourseId,
  getScheduledCourseById,
  ScheduleLiveCourse,
  getLiveCourseById,
  updateLiveCourse,
};
