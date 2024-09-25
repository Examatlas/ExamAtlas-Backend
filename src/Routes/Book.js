const express = require("express");
const { createBook, getBooks, getBookById, updateBook, deleteBook } = require("../Controllers/Book");

// const { authorizeRoles } = require("../Middleware/Auth")
const route = express.Router()

route.post("/createBook",createBook);

route.get("/getAllBooks",getBooks);

route.get("/getBookyId/:id",getBookById);

route.delete("/deleteBook/:id",deleteBook);

route.put("/updateBook/:id",updateBook);

module.exports = route