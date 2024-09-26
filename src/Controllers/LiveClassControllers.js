const LiveClassModel = require("../Models/LiveClassModel");

const jwt = require("jsonwebtoken");
const ScheduleLiveClassModel = require("../Models/ScheduleLiveClassModel");


// const generateMeetingToken = async () => {
//   // console.log(API_KEY,SECRET_KEY);
//   const options = {
//     expiresIn: '120m',
//     algorithm: 'HS256'
//    };

//   const payload = {
//     apiKey: API_KEY,
//     // permissions: ["allow_join", "allow_mod"], // Permissions for the token
//     permissions: ["allow_join"], // Permissions for the token
//     versions:2,
//   };
//   const token =await jwt.sign(payload, SECRET_KEY, options);

//   return token;
// };

// Function to create a meeting
async function createMeeting(req, res) {
  const { title, courseId, date,time} = req?.body;
  const url = "https://api.videosdk.live/v2/rooms";

  const options = {
    expiresIn: "120m",
    algorithm: "HS256",
  };
  const payload = {
    apikey: process?.env?.VIDEOSDK_API_KEY,
    permissions: [`allow_join`], // `ask_join` || `allow_mod`
    version: 2, //OPTIONAL
    roomId: `2kyv-gzay-64pg`, 
    participantId: `lxvdplwt`, //OPTIONAL
    roles: ["crawler"], //OPTIONAL
  };

  const token = jwt.sign(payload, process?.env?.VIDEOSDK_SECRET_KEY, options);

  try {
    if (!title ||!date||!time|| !courseId) {
      return res.status(400).json({ message: "All fileds are required" });
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
    // const response = await fetch(url, options);

    // const data = await response?.json();

    // if (data) {
      const newMeeting = await ScheduleLiveClassModel({
        // meetingId: data?.roomId,
        // token: token,
        title,
        courseId,
        date,
        time,
      });
      await newMeeting.save();
    // }
    return res.status(201).json({ status: true, message: "Meeting Created" });
    // }
  } catch (error) {
    console.error(
      "Error creating meeting:",
      error.response ? error.response.data : error.message
    );
    return res?.status(500)?.json({ message: "Internal Server Error", error });
  }
}

const getAllScheduledCourseByCourseId=async(req,res)=>{
  try {
    const { courseId } = req.params;

    // Find all classes for the specified courseId
    const courses = await ScheduleLiveClassModel.find({ courseId }).sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No classes found for this course' });
    }
    return res.status(200).json({courses,status:true,message:"All Scheduled course data fetched"});
  } catch (error) {
    return res?.status(500)?.json({ message: "Internal Server Error", error });
  }
}

const createLiveClass = async (req, res) => {
  try {
    const { teacher, keyword,tags,date_time,category,sub_category, title, description } = req?.body;
    if (!teacher || !keyword || !date_time ||!title ||!description||!tags||!category||!sub_category) {
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

const getClassById=async(req,res)=>{
  try {
    const {id}=req?.params;
    const classs=await LiveClassModel?.findById(id);
    if(!classs){
      return res?.status(404).json({status:false,message:"Class Not found "});
    }
    return res?.status(200).json({status:true,message:"Class fetched ",classs});
  } catch (error) {
    return res?.status(500).json({status:false,message:"Internal Server Error ",error});
  }
};

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

module.exports = {
  createLiveClass,
  getAllLiveClasses,
  createMeeting,
  deleteClass,
  getClassById,
  getAllScheduledCourseByCourseId,
};
