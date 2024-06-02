import express from 'express'
import { addStudent, showStudent, removeStudent, updateStudent } from '../../controllers/AdminControllers/studentController.js'  
import multer from "multer";

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/students/`);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// Add Student 
router.route("/").post(upload.single('image'), addStudent)

// Delete Student 
router.route("/:_id").delete(removeStudent)

// Update Student 
router.route("/:_id").put(updateStudent)

// Show All Student
router.route("/").get(showStudent)

export default router