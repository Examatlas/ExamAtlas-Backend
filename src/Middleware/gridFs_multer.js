const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// const {initGfs} = require("../Utilis/gfs");
// initGfs();
// Create a storage engine for multer and GridFS

const storage = new GridFsStorage({
  url: process.env.DB,
  file: (req, file) => {
    console.log("running uploadGFS...")
    return new Promise((resolve, reject) => {

        // const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: `${Date.now()}-${file.originalname}`,
          bucketName: 'uploads',
        };
        console.log("fileInfo: ",fileInfo)
        resolve(fileInfo);
    });
  },
});

const uploadGFS = (images)=>{
    try{
     return   multer({ storage }).single(images);
    }catch(err){
        console.log("err: ",err)
    }
}

module.exports = uploadGFS;
// // Book model
// const BookSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   images: [String], // Store array of filenames from GridFS
// });

// const Book = mongoose.model('Book', BookSchema);

// // API to upload a book with multiple images
// app.post('/api/books', upload.array('images', 5), async (req, res) => {
//   const { title, author } = req.body;
//   const imageFilenames = req.files.map((file) => file.filename);

//   const book = new Book({
//     title,
//     author,
//     images: imageFilenames,
//   });

//   try {
//     await book.save();
//     res.status(201).json({ message: 'Book added successfully', book });
//   } catch (error) {
//     res.status(500).json({ error: 'Error adding book' });
//   }
// });

// // Route to get an image by filename
// app.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: 'No file exists' });
//     }

//     // Check if it's an image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({ err: 'Not an image' });
//     }
//   });
// });
