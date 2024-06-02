import express from 'express'
import { addResult, showResult, removeResult, updateResult } from '../../controllers/TeacherControllers/resultController.js'  

const router = express.Router();

// Add Result
router.route("/").post(addResult)

// Delete Result 
router.route("/:_id").delete(removeResult)

// Update Result 
router.route("/:_id").put(updateResult)

// Show All Result
router.route("/").get(showResult)

export default router