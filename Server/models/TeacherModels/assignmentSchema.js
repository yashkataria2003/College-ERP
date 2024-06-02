import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        requierd: "true"
    },
    subject: {
        type: String,
        requierd:"true"
    },
    course: {
        type: String,
        requierd: "true"
    },
    section: {
        type: String,
        required: "true"
    },
    dueDate: {
        type: Date,
        requierd: "true"
    },
    attachment: {
        type: String,
        requierd: "true"
    },
})

const assignmentModel = mongoose.model("Assignment", assignmentSchema);
export default assignmentModel;