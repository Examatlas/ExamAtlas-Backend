const express = require("express");
const { createBook, getBooksPaginatedWithCartFlag, getBookById, updateBook, deleteBook } = require("../Controllers/Book");
const uploadGFS = require("../Middleware/gridFs_multer");
const upload = require("../Middleware/multer");
// const { authorizeRoles } = require("../Middleware/Auth")
const route = express.Router()

route.post("/createBook",upload.array('images',5),createBook);

route.get("/getAllBooks",getBooksPaginatedWithCartFlag);

route.get("/getBookyId/:id",getBookById);

route.delete("/deleteBook/:id",deleteBook);

route.put("/updateBook/:id",updateBook);

module.exports = route