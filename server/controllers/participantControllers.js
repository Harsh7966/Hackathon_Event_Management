const hackathon= require("../models/hackathonEventModel");
const register= require("../models/registerHackathonModel");

const HackathonListByTheme= async(req, res) =>{
    try{
        const theme= req.params.theme;

        const data= await hackathon.find({theme:theme});
        if(data){
            res.status(200).json(data);
        }
    }catch(err){
        console.log(err);
    }
}

const RegisterHackathon = async(req, res) =>{
    try{
        const user= req.userData;
        const hToken= req.params.hToken;
        const {rName, rEmail, rPhone, rTotalexperience, skill_expertise}= req.body;

        const done= await register.create({rName, rEmail, rPhone, rTotalexperience, skill_expertise, hToken, uToken: user.uToken});

        if(done){
            res.status(200).json({msg: "Registration Done"});
        }
    }catch(err){
        console.log(err);
    }
}

const isRegisterOrNot= async(req, res) =>{
    try{
        const hToken= req.params.hToken;
        const user= req.userData;
        const found= await register.findOne({uToken: user.uToken , hToken: hToken});

        if(found){
            res.status(200).json({status: true});
        }else{
            res.status(404).json({status: false});
        }
    }catch(err){
        console.log(err);
    }
}


const GetUserRegisterHackathon = async (req, res) => {
    try {
        const uToken = req.params.uToken;
        const data = await register.find({ uToken: uToken }, { hToken: 1, _id: 0 });

        if (data && data.length > 0) {
            const hTokens = data.map(entry => entry.hToken);
            res.status(200).json(hTokens);
        } else {
            res.status(404).json({ message: "No data found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



const getHackathonDetailById = async (req, res) => {
    const { hTokens } = req.body;

    if (Array.isArray(hTokens)) {
        try {
            const detailsArray = await Promise.all(
                hTokens.map(hToken => hackathon.findOne({ hToken }))
            );
            res.status(200).json({ hackathonDetails: detailsArray });
        } catch (error) {
            console.error("Error fetching hackathon details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ error: "Invalid hTokens format" });
    }
};


module.exports={
    HackathonListByTheme,
    RegisterHackathon,
    isRegisterOrNot,
    GetUserRegisterHackathon,
    getHackathonDetailById
}