import express from "express";
import mongoose from "mongoose";
import { Book } from "../models/book.model.js";

//HTTP Router
const router = express.Router();

//Route for save a new book
router.post("/", async(req,res) => {

    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: "Required field missing"});
        }

        const book = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const newBook = new Book(book);

        await newBook.save();
        return res.status(200).json({success: true, message: "New Book Added"});

    }catch(error){
        console.log(error)
        return res.status(500).json({success: false, message: "Server Error"});
    }
});

//Route for get all books from database
router.get("/", async(req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({success: true, count:books.length, data:books });
    } catch (error) {
        console.log("Error in fetching products",error.message);
        return res.status(500).json({success: false, message: "server error"});
    }
})

//Route for get one book from database by using id
router.get("/:id", async(req,res) => {

    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({success: true, data:book });
    } catch (error) {
        console.log("Error in fetching products",error.message);
        return res.status(500).json({success: false, message: "server error"});
    }
});

//Route for update one book from database by using id
router.put("/:id",async(req,res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).json({message: "Required field missing"});
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(200).json({message: "Book not found"});
        }

        return res.status(200).json({success: true, message: "Book Updated"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, message: "server error"});
    }
})

//Route for delete a book in database using id
router.delete("/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(200).json({message: "Book not found"});
        }
        
        return res.status(200).json({success: true, message: "Book deleted"});
    } catch (error) {
        return res.status(500).json({success: false, message: "server error"});
    }
})

export default router;

