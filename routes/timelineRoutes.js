const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();
const timelineController = require("../controllers/timelineController");
router.post(
  "/timeline",
  upload.array("images", 10),
  timelineController.postTimelineData
)
.get("/timeline", timelineController.getTimelineData)
.put(
  "/timeline/:id",
  upload.array("images", 10),
  timelineController.updateTimelineData
)
.delete("/timeline/:id", timelineController.deleteTimelineData);

module.exports = router;
