const LiveClassModel = require("../Models/LiveClassModel");

const createLiveClass = async (req, res) => {
  try {
    const { meetingId, time, date,title,description } = req?.body;
    // if (!meetingId || !time || !date) {
    //   return res
    //     .status(422)
    //     .json({ status: false, message: "All fields are required" });
    // }
    const newClass = await LiveClassModel({
      meetingId,
      time,
      date,
      title,
      description,
    });
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

const getAllLiveClasses=async(req,res)=>{
    try {
        const classes=await LiveClassModel?.find();
        if(!classes){
            return res.status(404).json({status:false,message:"No Live Class Found"});
        }
        return res
      .status(200)
      .json({ status: true,classes, message: "Class Created Successfully" });
    } catch (error) {
        return res
      .status(500)
      .json({ status: false,error, message: "Internal server error" });
    }
}

module.exports = {
  createLiveClass,
  getAllLiveClasses,
};
