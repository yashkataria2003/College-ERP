import express from 'express'
import { addPresentation, showPresentation, removePresentation, updatePresentation } from '../../controllers/TeacherControllers/presentationController.js'
import multer from "multer";  

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/Presentations/`);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// Add Student 
router.route("/").post(upload.single('attachment'),addPresentation)

// Delete Student 
router.route("/:_id").delete(removePresentation)

// Update Student 
router.route("/:_id").put(updatePresentation)

// Show All Student
router.route("/").get(showPresentation)

export default router