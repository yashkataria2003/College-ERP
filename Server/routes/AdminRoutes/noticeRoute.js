import express from 'express'
import { addNotice, showNotice, removeNotice, updateNotice } from '../../controllers/AdminControllers/noticeController.js'  
import multer from "multer";

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/notices/`);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

// Add Student 
router.route("/").post(upload.single('attachment'), addNotice)

// Delete Student 
router.route("/:_id").delete(removeNotice)

// Update Student 
router.route("/:_id").put(updateNotice)

// Show All Student
router.route("/").get(showNotice)

export default router