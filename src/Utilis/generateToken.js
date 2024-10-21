const jwt = require("jsonwebtoken");
const generateToken = (role, expiresIn, meetingId, userId) => {
    
const apiKey = process.env.VIDEOSDK_API_KEY;
    const secretKey = process.env.VIDEOSDK_SECRET_KEY;
    const permissions = role === 'admin' 
      ? ['allow_create_room','allow_create_meeting', 'allow_join'] 
      : ['allow_join']; // Students can only join, admin can start and join.
  
    const token = jwt.sign(
      {
        apikey: apiKey,
        permissions,
        version: 2,
        meetingId,
        participantId: userId
      },
      secretKey,
      { expiresIn: expiresIn || '1h' } // Token expiration time
    );
    return token;
  };

  module.exports = { generateToken};