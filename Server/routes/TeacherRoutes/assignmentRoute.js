import express from 'express'
import { addAssignment, showAssignment, removeAssignment, updateAssignment } from '../../controllers/TeacherControllers/assignmentController.js'  
import multer from "multer";

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/Assignments/`);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// Add Student 
router.route("/").post(upload.single('attachment'), addAssignment)

// Delete Student 
router.route("/:_id").delete(removeAssignment)

// Update Student 
router.route("/:_id").put(updateAssignment)

// Show All Student
router.route("/").get(showAssignment)

export default router