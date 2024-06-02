import teacherModel from '../models/AdminModels/teacherSchema.js';
import bcrypt from 'bcrypt';

export const checkAuthentication = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log("Recieved from frontend (email) : ", email);
        // console.log("Recieved from frontend (password) : ", password);

        const teacher = await teacherModel.findOne({ email });

        // console.log("teacher details from backend : ", teacher);

        if (!teacher) {
            return res.status(400).json({ success: false, message: "User with this email doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (isMatch) {
            // console.log("Password Matched");
            return res.status(200).json({ success: true, data: teacher, message: `${teacher.name} logged in successfully` });
        } else {
            // console.log("Password Not Matched");
            return res.status(400).json({ success: false, message: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
