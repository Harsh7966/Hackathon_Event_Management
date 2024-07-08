const mongoose= require("mongoose");
const JWT= require("jsonwebtoken");

const RegisterHackathonSchema= new mongoose.Schema({
    rName: {
        type: String,
        required: true,
    },
    rEmail: {
        type: String,
        required: true,
    },
    rPhone: {
        type: String,
        required: true,
    },
    rTotalexperience: {
        type: String,
        required: true,
    },
    skill_expertise:{
        type: String,
        required: true,
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


const register= new mongoose.model("register", RegisterHackathonSchema);

module.exports= register;