const timelineController = require("../controllers/timelineController");
const express = require("express");
const router = express.Router();


const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/timeline",upload.single("image"), timelineController.postTimelineData)
      .get("/timeline", timelineController.getTimelineData)
      .put("/timeline/:id",upload.single("image"), timelineController.updateTimelineData)
      .delete("/timeline/:id", timelineController.deleteTimelineData);
module.exports = router;