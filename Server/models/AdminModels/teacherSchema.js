import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    image: {
        type: String,
        requierd: "true"
    },
    name: {
        type: String,
        requierd:"true"
    },
    department: {
        type: String,
        requierd:"true"
    },
    designation: {
        type: String,
        requierd:"true"
    },
    experience: {
        type: Number,
        requierd:"true"
    }, 
    email: {
        type: String,
        requierd:"true"
    },
    password: {
        type: String,
        requierd:"true"
    },
})

const teacherModel = mongoose.model("Teachers", teacherSchema)
export default teacherModel;