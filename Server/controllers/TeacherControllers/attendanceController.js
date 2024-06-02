import attendanceModel from '../../models/TeacherModels/attendanceSchema.js'

// Add Attendance
export const addAttendance = async (req, res) => {
    try {
        const { startingYear, course, section, name, enrollment, subject, semester, attendance, date} = await req.body;

        const checkAttendance = await attendanceModel.findOne({ startingYear, course, section, name, enrollment, subject, semester, date })
        if (checkAttendance) {
            await res.status(500).json({ success: false, message: 'Attendance Already Exsist'})
        }

        const attendanceEntry = await attendanceModel.create({
            startingYear,
            course, 
            section, 
            name, 
            enrollment, 
            subject, 
            semester, 
            date, 
            attendance,
        });

        res.status(200).json({ success: true, data: attendanceEntry, message: "Attendance added successfully" });
    } 
    
    catch (error) {
        // console.error("Error adding attendance:", error);
        res.status(500).json({ success: false, message: "Failed to add attendance", error: error.message });
    }
};

// Remove Attendance
export const removeAttendance = async(req, res) => {
    try {
        const _id = await req.params._id;
        // console.log(_id)
        await attendanceModel.findByIdAndDelete(_id)

        await res.status(200).json({success:"true", messege:"Attendance deleted Successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Attendance Deletion Failed"});
    }
}

// Update Attendance
export const updateAttendance = async(req, res) => {
    const { startingYear, course, section, name, enrollment, subject, semester, attendance, date} = await req.body;
    const _id = await req.params._id;

    try {
        const updatedAttendance = await attendanceModel.findByIdAndUpdate(_id, {
            startingYear,
            course, 
            section, 
            name, 
            enrollment, 
            subject, 
            semester, 
            date, 
            attendance,
        }, { new: true })

        res.status(200).json({ success: true, data: updatedAttendance, message: "Attendance Updated Successfully" });
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:"Attencance Updation Failed"});
    }
}

// Show All Attendance
export const showAttendance = async(req, res) => {
    try {
        const attendance = await attendanceModel.find({});
            res.status(200).json({success: true, data: attendance, message: "All Attendance fetched successfully"})
    } 
    
    catch (error) {
        // console.log(error);
        await res.status(500).json({success: false, message:'Fetching Attendance failed, please try'});
    }
}