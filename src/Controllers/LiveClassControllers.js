const LiveClassModel = require("../Models/LiveClassModel");

const createLiveClass = async (req, res) => {
  try {
    const { meetingId, time, date } = req?.body;
    if (!meetingId || !time || !date) {
      return res
        .status(422)
        .json({ status: false, message: "All fields are required" });
    }
    const newClass = await LiveClassModel({
      meetingId,
      time,
      date,
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

module.exports = {
  createLiveClass,
};
