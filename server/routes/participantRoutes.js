const express = require("express");
const router= express.Router();
const userAuthentication= require("../middlewares/userAuth");
const controller= require("../controllers/participantControllers");

router.route("/HackathonListByTheme/:theme").get(userAuthentication, controller.HackathonListByTheme);
router.route("/register-hackathon/:hToken").post(userAuthentication, controller.RegisterHackathon);
router.route("/isRegisterOrNot/:hToken").get(userAuthentication, controller.isRegisterOrNot);
router.route("/getHackathonDetailById").post(userAuthentication, controller.getHackathonDetailById);
router.route("/GetUserRegisterHackathon/:uToken").get( controller.GetUserRegisterHackathon);

module.exports= router;