const signin_middle= (login_Validator) => async(req, res, next) =>{
    try{
        const validateData= await login_Validator.parseAsync(req.body);

        // my custom property
        req.body= validateData;

        next();
    }catch(err){
        const msg= err.errors[0].message;
        console.log(msg);
        res.status(400).json(msg);
    }
}

module.exports= signin_middle;