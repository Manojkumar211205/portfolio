const Project = require("../models/projects");
const cloudinary = require("../utils/cloudinaryUtils");

exports.postProject = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    const imageUpload = imageFile
      ? await cloudinary.uploadMedia(imageFile, "image")
      : null;

    const videoUpload = videoFile
      ? await cloudinary.uploadMedia(videoFile, "video")
      : null;

    req.body.projectImage = imageUpload ? imageUpload.url : null;
    req.body.projectVideo = videoUpload ? videoUpload.url : null;
      if (req.body.technologiesUsed && !Array.isArray(req.body.technologiesUsed) ) {
    req.body.technologiesUsed = [req.body.technologiesUsed];
    }
    const projectData = new Project(req.body);
    await projectData.save();

    res.status(201).json({
      message: "Project data saved successfully ✅",
      data: projectData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving project data ❌",
      error: error.message,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projectData = await Project.find({});
    res.status(200).json({
      message: "Project data retrieved successfully ✅",
      data: projectData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving project data ❌",
      error: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    const imageUpload = imageFile
      ? await cloudinary.uploadMedia(imageFile, "image")
      : null;

    const videoUpload = videoFile
      ? await cloudinary.uploadSingleFile(videoFile, "video")
      : null;

    if (imageUpload) req.body.projectImage = imageUpload.url;
    if (videoUpload) req.body.projectVideo = videoUpload.url;

    const projectId = req.params.id;
    if (req.body.technologiesUsed && !Array.isArray(req.body.technologiesUsed) ) {
    req.body.technologiesUsed = [req.body.technologiesUsed];
    }


    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === null || req.body[key] === undefined) {
        delete req.body[key];
      }
    });
    
    const projectData = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );

    if (!projectData) {
      return res.status(404).json({ message: "Project not found ❌" });
    }

    res.status(200).json({
      message: "Project updated successfully ✅",
      data: projectData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating project ❌",
      error: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found ❌" });
    }

    res.status(200).json({
      message: "Project deleted successfully ✅",
      data: deletedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting project ❌",
      error: error.message,
    });
  }
};
