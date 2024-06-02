import express from 'express'
import { checkAuthentication } from '../controllers/loginController.js';

const router = express.Router();

// Check Authentication
router.route("/").post(checkAuthentication)

export default router