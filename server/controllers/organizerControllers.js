const hackathon= require("../models/hackathonEventModel");
const register= require("../models/registerHackathonModel");
const { v4: uuidv4 } = require("uuid"); // uuid dependency use for generate local token


const createHackathon= async(req, res) =>{
    try{
        const hToken= uuidv4();
        const user= req.userData;
        const {eName, company, startDate, endDate, time, location, description, theme}= req.body;

        const done= await hackathon.create({eName, company, startDate, endDate, time, location, description, theme, hToken, uToken: user.uToken});

        if(done){
            res.status(200).json({msg: "Hackathon created successfully"});
        }else{
            res.status(404).json({msg: "Hackathon not created"});
        }
    }catch(err){
        console.log(err);
    }
}

const getAllEventsOfLoginOrganizer= async(req, res) =>{
    try{
        const uToken= req.params.uToken;
        const events= await hackathon.find({uToken: uToken});

        if(events){
            res.status(200).json(events);
        }
    }catch(err){
        console.log(err);
    }
}

const hackathonDelete= async(req, res) =>{
    try{
        const hToken= req.params.hToken;

        const remove= await hackathon.deleteOne({hToken: hToken});

        if(remove){
            res.status(200).json({msg:"Delete Successfully"});
        }
    }catch(err){
        console.log(err);
    }
}

const getHackathonById = async(req, res) =>{
    try{
        const hToken= req.params.hToken;

        const data= await hackathon.findOne({hToken: hToken});

        if(data){
            res.status(200).json(data);
        }
    }catch(err){
        console.log(err);
    }
}


const hackathonEdit= async(req, res) =>{
    try{
        const hToken= req.params.hToken;
        const newDetails= req.body;

        const edit= await hackathon.updateOne({hToken: hToken},{$set: newDetails});

        if(edit){
            res.status(200).json({msg:"Update successfully"})
        }
    }catch(err){
        console.log(err);
    }
}

const getParticepentInEachHackathon= async(req, res)=>{
    try{
        const hToken= req.params.hToken;
        const participants= await register.find({hToken: hToken});

        if(participants){
            res.status(200).json(participants);
        }
    }catch(err){
        console.log(err);
    }
}

module.exports= {
    createHackathon,
    getAllEventsOfLoginOrganizer,
    hackathonDelete,
    getHackathonById,
    hackathonEdit,
    getParticepentInEachHackathon
};