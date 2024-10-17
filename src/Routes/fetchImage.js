const express = require("express")
const route = express.Router()
const {gfs} = require("../Utilis/gfs");

route.get('/:filename', async (req, res) => {
    console.log("fetching image route")
  // Get the initialized gfs object
  if (!gfs) {
    return res.status(500).json({ message: 'GridFS not initialized yet' });
  }else{
    console.log("GridFS initialized")
  }
    // console.log(gfs);
    try{
    gfs.files.findOne({ filename: '1729126021706-mern_stack_course_image.jpg' }, (err, file) => {
        console.log("error in findOne: ", err)
      if (!file || file.length === 0) {
        return res.status(404).json({ err: 'No file exists' });
      }
  
      // Check if it’s an image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ err: 'Not an image' });
      }
    });
}catch(err){
    console.log("error in route: ", err)
}
  });

  module.exports = route;