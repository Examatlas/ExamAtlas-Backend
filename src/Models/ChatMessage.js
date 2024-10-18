const mongoose = require('mongoose');

// Define the schema for storing chat messages
const chatMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique:true},
  scheduledClassId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"scheduleliveclass",
    required: true
  },
  meetingId: { type: String, required: true },
  senderId: { type: String, required: true },   // The userId of the participant who sent the message
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  senderName: { type: String, required: true },
  topic: { type: String, required: false },
  message: { type: String, required: true },       // The chat message text
  timestamp: { type: Date, default: Date.now }, // The time the message was sent
  is_active: { type: Boolean, default: true }, 
});

// Create the model from the schema
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;
