const profileController = require('../controllers/profileController');
const express = require('express');
const profileRouter = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

profileRouter.post("/api/profile",upload.single("image"), profileController.postProfileData)
             .get("/api/profile", profileController.getProfileData)
             .put("/api/profile/:id",upload.single("image"), profileController.updateProfileData);
module.exports = profileRouter;