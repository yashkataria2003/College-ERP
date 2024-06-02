import express from 'express'
import { addAttendance, showAttendance, removeAttendance, updateAttendance } from '../../controllers/TeacherControllers/attendanceController.js'  

const router = express.Router();

// Add Student 
router.route("/").post(addAttendance)

// Delete Student 
router.route("/:_id").delete(removeAttendance)

// Update Student 
router.route("/:_id").put(updateAttendance)

// Show All Student
router.route("/").get(showAttendance)

export default router