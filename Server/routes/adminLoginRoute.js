import express from 'express'
import { checkAuthentication } from '../controllers/adminLoginController.js';

const router = express.Router();

// Check Authentication
router.route("/").post(checkAuthentication)

export default router