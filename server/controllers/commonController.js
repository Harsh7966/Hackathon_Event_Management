const { v4: uuidv4 } = require("uuid"); // uuid dependency use for generate local token
const user = require("../models/signupModel");
const bcrypt = require("bcryptjs");


const userAuth = async(req, res) =>{
    try{
        const userData = req.userData;
        if (userData) {
            // console.log("LoginUserData", userData);
            res.status(200).json(userData);
        } else {
            res.status(404).json({ msg: "User data not found" });
        }
    }catch(err){
        console.log(err);
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password, type} = req.body;
        // console.log("Received Data:", req.body); 

        const userExist = await user.findOne({ email: email });
        if (!userExist) {
            const uToken = uuidv4();
            const saltRound = 10;
            const hashPassword = await bcrypt.hash(password, saltRound);

            const register = await user.create({ name, email, password: hashPassword, type, uToken});
            if (register) {
                res.status(200).json({
                    msg: "Account successfully created",
                    token: await register.generateToken(),
                    uToken: register.uToken.toString()
                });
            } else {
                res.status(404).json({ msg: "Account not created" });
            }
        } else {
            res.status(401).json({ msg: "User already exist" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
}


const signin = async(req, res) =>{
    try{
        const { email, password } = req.body;

        const userExist = await user.findOne({ email: email });

        if(userExist){
            const comparePassword = await bcrypt.compare(password, userExist.password);
                if (comparePassword) {
                    res.status(200).json({
                        msg: "Login successfully",
                        uToken: userExist.uToken.toString(),
                        type: userExist.type,
                        token: await userExist.generateToken(),
                    });
                }
                else {
                    res.status(404).json({ msg: "Invalid Password" });
                }
        }else{
            res.status(404).json({ msg: "Invalid email and password" });
        }
    }catch(err){
        console.log(err);
    }
}

module.exports={
    userAuth,
    signup,
    signin
}