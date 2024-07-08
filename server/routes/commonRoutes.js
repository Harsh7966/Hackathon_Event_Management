const express = require("express");
const router= express.Router();
const controller= require("../controllers/commonController");
const userAuthentication= require("../middlewares/userAuth");
const signUp_middle= require("../middlewares/signupMiddleware");
const signUp_validator= require("../validators/signupValidator");
const signin_middle= require("../middlewares/signinMiddleware");
const signin_Validator= require("../validators/signinValidator");

router.route("/userAuth").get(userAuthentication, controller.userAuth);
router.route("/signup").post(signUp_middle(signUp_validator), controller.signup);
router.route("/signin").post(signin_middle(signin_Validator),controller.signin);


module.exports= router;