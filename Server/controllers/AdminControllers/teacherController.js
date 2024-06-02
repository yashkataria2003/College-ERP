import teacherModel from '../../models/AdminModels/teacherSchema.js'
import jwt from 'jsonwebtoken'
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'

// Add Teacher
export const addTeacher = async(req, res) => {
    try {
        const { name, department, designation, experience, email, password } = await req.body;
        const image = await req.file.filename; // Get the filename from req.file
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkTeacher = await teacherModel.findOne({email})
        if (checkTeacher) {
            await res.status(500).json({ success: false, message: 'Teacher Already Exsist'})
        }

        else {
            const teacher = await teacherModel.create({
                image,
                name,
                department, 
                designation, 
                experience,
                email, 
                password: hashedPassword,
            })
    
            await res.status(200).json({success:true, data: teacher, message:"Teacher's data Saved"})

        }
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({ success: false, message: 'Unable to create a teacher, please try again', error: error.message });
    }
}

// Remove Teacher
export const removeTeacher = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)

        const teacher = await teacherModel.findById(_id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        // Delete the image file associated with the student
        if (teacher.image) {
            // Get the path to the image file
            const imagePath = path.join(process.cwd(), 'public', 'teachers', teacher.image);

            // Check if the file exists
            if (fs.existsSync(imagePath)) {
                // Delete the file from the server
                fs.unlinkSync(imagePath);
            }
        }

        await teacherModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Teacher's data deleted Successfully"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({success: false, message:"Teacher's data Deletion Failed"});
    }
}

// Update Teacher
export const updateTeacher = async(req, res) => {
    const { name, department, designation, experience, email, password } = await req.body;
    const _id = await req.params._id;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const updatedTeacher = await teacherModel.findByIdAndUpdate(_id, {
            name,
            department, 
            designation, 
            experience,
            email, 
            password: hashedPassword
        }, { new: true })

        res.status(200).json({ success: true, data: updatedTeacher, message: "Teacher's data Updated Successfully" });
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Teacher's data Updation Failed"});
    }
}

// Show All Teachers
export const showTeachers = async(req, res) => {
    try {
        const teachers = await teacherModel.find({});
        res.status(200).json({success: true, data: teachers, message: "All Teacher's data fetched successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:'Fetching teachers failed, please try'});
    }
}
