import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    image: {
        type: String,
        requierd: "true"
    },
    name: {
        type: String,
        requierd:"true"
    },
    fatherName : {
        type: String,
        requierd: "true"
    },
    dob : {
        type: Date,
        requierd: "true"
    },
    course: {
        type: String,
        requierd: "true"
    },
    startingYear: {
        type: Number,
        requierd:"true"
    },
    endingYear: {
        type: Number,
        requierd:"true"
    },
    section: {
        type: String,
        requierd:"true"
    },
    enrollment : {
        type: Number,
        requierd: "true",
    },
    address : {
        type: String,
        requierd:"true"
    }, 
    phone: {
        type: Number,
        requierd:"true"
    },
})

const studentModel = mongoose.model("Student", studentSchema)
export default studentModel