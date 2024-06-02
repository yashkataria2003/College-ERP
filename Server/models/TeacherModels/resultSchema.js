import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
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
    totalMarks: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
});

const resultModel = mongoose.model('Result', resultSchema);

export default resultModel;