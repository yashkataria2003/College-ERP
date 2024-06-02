import assignmentModel from '../../models/TeacherModels/assignmentSchema.js'
import fs from 'fs';
import path from 'path';

// Add Assignment
export const addAssignment = async(req, res)=> {
    try {
        const { title, subject, course, section, dueDate } = await req.body;

        const attachment = await req.file.filename; // Get the filename from req.file
        
        const assignment = await assignmentModel.create({
            title,
            subject,
            course,
            section,
            dueDate,
            attachment,
        })

        await res.status(200).json({success:true, data: assignment, message:"Assignment Saved"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({ success: false, message: 'Unable to create a Assignmenet, please try again', error: error.message });
    }
}

// Remove Assignment
export const removeAssignment = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)

        const assignment = await assignmentModel.findById(_id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignmenet not found' });
        }

        // Delete the pdf file associated with the student
        if (assignment.attachment) {
            // Get the path to the assignment file
            const assignmentPath = path.join(process.cwd(), 'public', 'Assignments', assignment.attachment);

            // Check if the file exists
            if (fs.existsSync(assignmentPath)) {
                // Delete the file from the server
                fs.unlinkSync(assignmentPath);
            }
        }

        await assignmentModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Assignment deleted Successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Assignment Deletion Failed"});
    }
}

// Update Assignment
export const updateAssignment = async(req, res) => {
    const { title, subject, course, section, dueDate } = await req.body;
    const _id = await req.params._id;

    try {
        const updatedAssignment = await assignmentModel.findByIdAndUpdate(_id, {
            title,
            subject,
            course,
            section,
            dueDate
        }, { new: true })

        res.status(200).json({ success: true, data: updatedAssignment, message: "Assignment Updated Successfully" });
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Assignment Updation Failed"});
    }
}

// Show All Assignment
export const showAssignment = async(req, res) => {
    try {
        const assignments = await assignmentModel.find({});
        res.status(200).json({success: true, data: assignments, message: "All assignments fetched successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:'Fetching assignments failed, please try'});
    }
}