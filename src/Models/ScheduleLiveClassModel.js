const mongoose = require("mongoose");

const ScheduleLiveClassSchema = mongoose.Schema({
  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"LiveClassModel"
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  meetingId: {
    type: String,
  },
  time:{
   type:String,
  },
  date:{
    type:Date,
  },
addedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // 
    required: true,
},
deletedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: false,
  default: null
},
deletedAt: {
  type: Date,
  required: false,
  default: null
},
scheduleTime: {
    type: Date,
    required: false,
},
duration: {
    type: Number, // in minutes
    required: false,
},
students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Users who will attend this live class
}],
status: {
    type: String,
    enum: ['scheduled', 'live', 'completed', 'cancelled'],
    default: 'scheduled',
},
is_active: {
  type: Boolean,
  default: true,
}
},
{ timestamps: true }
);

const ScheduleLiveClassModel = mongoose.model(
  "scheduleliveclass",
  ScheduleLiveClassSchema,
  "Scheduled Live Classes"
);

module.exports = ScheduleLiveClassModel;
