import presentationModel from '../../models/TeacherModels/presentationSchema.js'
import fs from 'fs';
import path from 'path';

// Add Presentation
export const addPresentation = async(req, res)=> {
    try {
        const { title, subject, course, section, dueDate } = await req.body;

        const attachment = await req.file.filename; // Get the filename from req.file
        
        const presentation = await presentationModel.create({
            title,
            subject,
            course,
            section,
            dueDate,
            attachment,
        })

        await res.status(200).json({success:true, data: presentation, message:"Presentation Saved"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({ success: false, message: 'Unable to create a Presentation, please try again', error: error.message });
    }
}

// Remove Presentation
export const removePresentation = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)

        const presentation = await presentationModel.findById(_id);
        if (!presentation) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Delete the pdf file associated with the student
        if (presentation.attachment) {
            // Get the path to the presentation file
            const presentationPath = path.join(process.cwd(), 'public', 'Presentations', presentation.attachment);

            // Check if the file exists
            if (fs.existsSync(presentationPath)) {
                // Delete the file from the server
                fs.unlinkSync(presentationPath);
            }
        }

        await presentationModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Presentation deleted Successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Presentation Deletion Failed"});
    }
}

// Update Presentation
export const updatePresentation = async(req, res) => {
    const { title, subject, course, section, dueDate } = await req.body;
    const _id = await req.params._id;

    try {
        const updatedPresentation = await presentationModel.findByIdAndUpdate(_id, {
            title,
            subject,
            course,
            section,
            dueDate
        }, { new: true })

        res.status(200).json({ success: true, data: updatedPresentation, message: "Presentation Updated Successfully" });
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Presentation Updation Failed"});
    }
}

// Show All Presentation
export const showPresentation = async(req, res) => {
    try {
        const presentations = await presentationModel.find({});
        res.status(200).json({success: true, data: presentations, message: "All presentations fetched successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:'Fetching presentations failed, please try'});
    }
}