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
    attachment: {
        type: String,
        requierd: "true"
    },
})

const noticeModel = mongoose.model("Notice", noticeSchema);
export default noticeModel;