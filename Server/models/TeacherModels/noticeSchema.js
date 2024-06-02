import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        requierd: "true"
    },
    description: {
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
    attachment: {
        type: String,
        requierd: "true"
    },
})

const noticeModel = mongoose.model("Student Notices", noticeSchema);
export default noticeModel;