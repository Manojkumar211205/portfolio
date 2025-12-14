const express = require("express");
const router = express.Router();
const multer = require("multer");

const projectController = require("../controllers/projectsController");

const upload = multer({ dest: "uploads/" });

router.post(
  "/projects",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  projectController.postProject
);

router.get("/projects", projectController.getProjects);

router.put(
  "/projects/:id",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  projectController.updateProject
);

router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;
