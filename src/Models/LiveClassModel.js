const mongoose = require("mongoose");

const LiveClassSchema = mongoose.Schema({
title: {
    type: String,
    required: true,
    trim: true
},
description: {
    type: String,
    required: true,
},
teacher: {
  type: String,
  trim: true
},
tags: [String],
categoryId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  trim:true,
  required: true,
  default: null
},
subCategoryId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'SubCategory',
  trim:true,
  required: true,
  default: null
},
subjectId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Subject',
  trim:true,
  required: false,
  default: null
},
images:  [
  {
    url: { type: String, required: true, trim: true },  // URL or path to the image
    filename: { type: String, required: true, trim: true },  // Image filename
    contentType: { type: String,trim: true },  // Optional: Content type (e.g., 'image/jpeg')
    size: { type: Number },  // Optional: File size in bytes
    uploadDate: { type: Date, default: Date.now }  // Optional: Upload timestamp
  }
],
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
startDate: {
    type: Date,
    required: false,
},
endDate: {
    type: Date,
    required: false,
},
students: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}],
// Array of live classes associated with this course
liveClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'scheduleliveclass',
}],
is_active: {
    type: Boolean,
    default: true,
}
},
{ timestamps: true }
);

const LiveClassModel = mongoose.model(
  "liveclass",
  LiveClassSchema,
  "Live Classes"
);

module.exports = LiveClassModel;
