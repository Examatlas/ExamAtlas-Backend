const LiveClassModel = require("../Models/LiveClassModel");

// Import necessary modules
const axios = require("axios");
const jwt=require("jsonwebtoken");

// API key and Secret key from VideoSDK
// const API_KEY = "49fd6547-ed44-4adf-a112-b9cf29f4576a";
const API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET_KEY =process.env.VIDEOSDK_SECRET_KEY;

const generateMeetingToken = async () => {
  const payload = {
    apiKey: API_KEY,
    permissions: ["allow_join", "allow_mod"], // Permissions for the token
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  return token;
};

// Function to create a meeting
async function createMeeting(req,res) {
  const {title,tags,keyword,description,teacher}=req?.body;
  // const file=req?.files;
  const url = "https://api.videosdk.live/v2/rooms";
  // video sdk token
  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0OWZkNjU0Ny1lZDQ0LTRhZGYtYTExMi1iOWNmMjlmNDU3NmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyNjQ4NTA5OSwiZXhwIjoxNzI3MDg5ODk5fQ.lEM3m7YbbEV_ppZLwR7UyN6FuYJOp_vpmAW4GYS-bp4';
  
  try {
    if(!title||!keyword||!tags||!description||!teacher){
      return res.status(400).json({message:"All fileds are required" });
    }
    // Making POST request to create a meeting room
    const response = await axios.post(url,{},
      {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMeetingId: "unicorn" }),
    }, );
    if (response.status === 200) {
      const newMeeting=await LiveClassModel({
        meetingId:response?.data?.roomId,
        title,
        teacher,
        tags,
        description,
        keyword,
      });
      await newMeeting.save();
      return res.status(201).json({status:true,message:"Meeting Created",})
    } 
  } catch (error) {
    console.error(
      "Error creating meeting:",
      error.response ? error.response.data : error.message
    );
    return res?.status(500)?.json({message:"Error",error});
    
  }
}

// const createLiveClass = async (req, res) => {
//   try {
//     const { meetingId, time, date, title, description } = req?.body;
//     // if (!meetingId || !time || !date) {
//     //   return res
//     //     .status(422)
//     //     .json({ status: false, message: "All fields are required" });
//     // }
//     const newClass = await LiveClassModel({
//       meetingId,
//       time,
//       date,
//       title,
//       description,
//     });
//     await newClass.save();
//     return res
//       .status(200)
//       .json({ status: true, message: "Class Created Successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ status: false, message: "Internal server error" });
//   }
// };

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

const deleteClass=async(req,res)=>{
  try {
    const {id}=req?.params;

    if(!id){
      return res.status(404).json({status:false,message:"Class Id not found"});
    }
    const deleteClass=await LiveClassModel?.findByIdAndDelete(id);

    if(!deleteClass){
      return res?.status(404).json({status:false,message:"Class not found"});
    }

    return res?.status(200).json({status:true,message:"Deleted successfully"});
    // LiveClassModel?.
  } catch (error) {
    return res?.status(500).json({status:false,message:"Internal Server Error",error});
  }
}

module.exports = {
  // createLiveClass,
  getAllLiveClasses,
  createMeeting,
  deleteClass,
};
