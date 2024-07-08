const express = require("express");
const router= express.Router();
const userAuthentication= require("../middlewares/userAuth");
const controller= require("../controllers/organizerControllers");

router.route("/create_hackathon").post(userAuthentication, controller.createHackathon);
router.route("/getAllEventsOfLoginOrganizer/:uToken").get(userAuthentication, controller.getAllEventsOfLoginOrganizer);
router.route("/hackathonDelete/:hToken").delete(userAuthentication, controller.hackathonDelete);
router.route("/getHackathonById/:hToken").get(userAuthentication, controller.getHackathonById);
router.route("/hackathonEdit/:hToken").patch(userAuthentication, controller.hackathonEdit);
router.route("/viewParticepentInEachHackathon/:hToken").get(userAuthentication, controller.getParticepentInEachHackathon);


module.exports= router;