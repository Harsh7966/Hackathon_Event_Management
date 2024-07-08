require("dotenv").config();
const cors= require("cors");
const express= require("express");
const bodyParser= require("body-parser");
const connectDB= require("./utils/connectDB");
const commonRoutes= require("./routes/commonRoutes");
const organizerRoute= require("./routes/organizerRoutes");
const particepentRoute= require("./routes/participantRoutes");
const obj= express();


//Handling the cors policy
const corsOption= {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
obj.use(cors(corsOption));

// Increase maximum request size limit (e.g., 50MB)
obj.use(bodyParser.json());
obj.use(bodyParser.urlencoded({extended: true}));

// Static folder access
// obj.use("/uploads", express.static("uploads"));

// Routes
obj.use("/api/commonRoutes/", commonRoutes);
obj.use("/api/organizer", organizerRoute);
obj.use("/api/particepent", particepentRoute);

const PORT= process.env.PORT;
connectDB().then(()=>{
    obj.listen(PORT, ()=>{
        console.log(`Server run on port ${PORT}`);
    })
})

