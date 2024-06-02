import noticeModel from '../../models/AdminModels/noticeSchema.js'
import fs from 'fs';
import path from 'path';

// Add Notice
export const addNotice = async(req, res)=> {
    try {
        const { title, description } = await req.body;

        const attachment = await req.file.filename; // Get the filename from req.file
        
        const notice = await noticeModel.create({
            title,
            description,
            attachment,
        })

        await res.status(200).json({success:true, data: notice, message:"Notice Saved"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({ success: false, message: 'Unable to create a notice, please try again', error: error.message });
    }
}

// Remove Notice
export const removeNotice = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)

        const notice = await noticeModel.findById(_id);
        if (!notice) {
            return res.status(404).json({ message: 'Notice not found' });
        }

        // Delete the pdf file associated with the student
        if (notice.attachment) {
            // Get the path to the notice file
            const noticePath = path.join(process.cwd(), 'public', 'notices', notice.attachment);

            // Check if the file exists
            if (fs.existsSync(noticePath)) {
                // Delete the file from the server
                fs.unlinkSync(noticePath);
            }
        }

        await noticeModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Notice deleted Successfully"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({success: false, message:"Notice Deletion Failed"});
    }
}

// Update Notice
export const updateNotice = async(req, res) => {
    const { title, description } = await req.body;
    const _id = await req.params._id;

    try {
        const updatedNotice = await noticeModel.findByIdAndUpdate(_id, {
            title,
            description
        }, { new: true })

        res.status(200).json({ success: true, data: updatedNotice, message: "Notice Updated Successfully" });
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({success: false, message:"Notice Updation Failed"});
    }
}

// Show All Notice
export const showNotice = async(req, res) => {
    try {
        const notices = await noticeModel.find({});
        res.status(200).json({success: true, data: notices, message: "All notices fetched successfully"})
    } 
    
    catch (error) {
        console.log(error);
        await res.status(500).json({success: false, message:'Fetching notices failed, please try'});
    }
}