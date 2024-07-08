const mongoose= require("mongoose");
const JWT= require("jsonwebtoken");

const hackathonSchema= new mongoose.Schema({
    eName: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    theme:{
        type: String,
        required: true
    },
    hToken:{
        type: String,
    },
    uToken:{
        type: String,
    }
},
{timestamps: true}
);


const hackathon= new mongoose.model("hackathon", hackathonSchema);

module.exports= hackathon;