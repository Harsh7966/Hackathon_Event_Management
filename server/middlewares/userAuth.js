// userAuthentication middleware
const JWT = require("jsonwebtoken");
const user = require("../models/signupModel");

const userAuthentication = async (req, res, next) => {
    const token = req.header("Authorization");
    try {
        if (!token) {
            console.log("Token not found ");
            return res.status(401).json({ msg: "Token not found" });
        }

        const jwtToken = token.replace("Bearer", "").trim();

        try {
            const jwtVerify = JWT.verify(jwtToken, process.env.PRIVATE_KEY);
            if (jwtVerify) {
                // console.log("JWT_Token", jwtVerify);
                const userData = await user.findOne({ email: jwtVerify.email });

                req.userData = userData;
                req.userToken = token;
                req.uToken = userData.uToken;
                req.isOrganizer = userData.isOrganizer; // Set isAdmin property based on user's role

                // console.log("Login_User_Data_Found", userData);
                next();
            } else {
                console.log("Invalid Token!");
                return res.status(401).json({ msg: "Invalid Token" });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = userAuthentication;






// const JWT = require("jsonwebtoken");
// const user = require("../models/signupModel");

// const userAuthentication = async (req, res, next) => {
//     const authHeader = req.header("Authorization");
    
//     if (!authHeader) {
//         console.log("Authorization header not found");
//         return res.status(401).json({ msg: "Authorization header not found" });
//     }

//     const token = authHeader.replace("Bearer ", "").trim();

//     if (!token) {
//         console.log("Token not found");
//         return res.status(401).json({ msg: "Token not found" });
//     }

//     try {
//         const jwtVerify = JWT.verify(token, process.env.PRIVATE_KEY);
        
//         if (!jwtVerify) {
//             console.log("Invalid Token!");
//             return res.status(401).json({ msg: "Invalid Token" });
//         }

//         const userData = await user.findOne({ email: jwtVerify.email });

//         if (!userData) {
//             console.log("User not found");
//             return res.status(404).json({ msg: "User not found" });
//         }

//         req.userData = userData;
//         req.userToken = token;
//         req.uToken = userData.uToken;
//         req.isOrganizer = userData.isOrganizer;

//         next();
//     } catch (err) {
//         console.error("JWT verification error:", err);
//         if (err instanceof JWT.JsonWebTokenError) {
//             return res.status(400).json({ msg: "Malformed Token" });
//         } else if (err instanceof JWT.TokenExpiredError) {
//             return res.status(401).json({ msg: "Token Expired" });
//         } else {
//             return res.status(500).json({ msg: "Internal Server Error" });
//         }
//     }
// }

// module.exports = userAuthentication;
