import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
    startingYear: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    enrollment: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    attendance: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const attendanceModel = mongoose.model('Attendance', attendanceSchema);

export default attendanceModel;