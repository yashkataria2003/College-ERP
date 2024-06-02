import resultModel from '../../models/TeacherModels/resultSchema.js'

// Add Result
export const addResult = async (req, res) => {
    try {
        const { startingYear, course, section, name, enrollment, subject, semester, totalMarks, marks} = await req.body;

        const checkResult = await resultModel.findOne({startingYear, course, section, name, enrollment, subject, semester })
        if (checkResult) {
            await res.status(500).json({ success: false, message: 'Result Already Exsist'})
        }

        const result = await resultModel.create({
            startingYear,
            course, 
            section, 
            name, 
            enrollment, 
            subject, 
            semester, 
            totalMarks, 
            marks,
        });

        await res.status(200).json({ success: true, data: result, message: "Result added successfully" });
    } 
    
    catch (error) {
        // console.error("Error adding marks:", error);
        await res.status(500).json({ success: false, message: "Failed to add Result", error: error.message });
    }
};

// Remove Result
export const removeResult = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)
        await resultModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Result deleted Successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Result Deletion Failed"});
    }
}

// Update Result
export const updateResult = async(req, res) => {
    const { course, section, name, enrollment, subject, semester, totalMarks, marks} = await req.body;
    const _id = await req.params._id;

    try {
        const updatedResult = await resultModel.findByIdAndUpdate(_id, {
            course, 
            section, 
            name, 
            enrollment, 
            subject, 
            semester, 
            totalMarks, 
            marks
        }, { new: true })

        res.status(200).json({ success: true, data: updatedResult, message: "Result Updated Successfully" });
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Result Updation Failed"});
    }
}

// Show All Result
export const showResult = async(req, res) => {
    try {
        const results = await resultModel.find({});
        res.status(200).json({success: true, data: results, message: "All Results fetched successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:'Fetching Results failed, please try'});
    }
}