import express from "express";
import { addTeacher, removeTeacher, updateTeacher, showTeachers } from '../../controllers/AdminControllers/teacherController.js'
import multer from "multer";

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/teachers/`);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

router.route('/').post(upload.single('image'), addTeacher);

// Remove Teacher
router.route("/:_id").delete(removeTeacher);

// Update Teacher
router.route("/:_id").put(updateTeacher);

// Show all Teachers   
router.route("/").get(showTeachers);
export default router;