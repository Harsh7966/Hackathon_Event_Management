const mongoose= require("mongoose");
const JWT= require("jsonwebtoken");

const signupSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    uToken:{
        type: String,
    },
},
{timestamps: true}
);

// JWT generation code
signupSchema.methods.generateToken= function(){
    try{
        return JWT.sign(
            {
                //payload
                uToken: this.uToken.toString(),
                email: this.email,
                type: this.type
            },
            //signature
            process.env.PRIVATE_KEY,
            {                           
                //expires
                expiresIn: "1d"
            }
        )
    }catch(err){
        console.log(err);
    }
}

const user= new mongoose.model("user", signupSchema);

module.exports= user;