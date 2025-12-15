const timeline = require("../models/timeline");
const cloudinary = require("../utils/cloudinaryUtils");

exports.postTimelineData = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await cloudinary.uploadMultipleImages(req.files);
    }

    req.body.eventImages = imageUrls;

    const timelineData = new timeline(req.body);
    await timelineData.save();

    res.status(201).send({
      message: "Timeline data saved successfully",
      data: timelineData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error saving timeline data",
      error: error.message,
    });
  }
};

exports.getTimelineData = async (req, res) => {
  try {
    const timelineData = await timeline
      .find({})
      .sort({ eventDate: 1 }); // 🔥 old → new

    console.log("Retrieved timeline data:", timelineData);

    res.status(200).send({
      message: "Timeline data retrieved successfully",
      data: timelineData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving timeline data",
      error: error.message,
    });
  }
};


exports.updateTimelineData = async (req, res) => {
  try {
    const timelineId = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.length > 0) {
      const imageUrls = await cloudinary.uploadMultipleImages(req.files);
      updatedData.eventImages = imageUrls;
    }

    // Remove undefined / null values
    for (let key in updatedData) {
      if (updatedData[key] === undefined || updatedData[key] === null) {
        delete updatedData[key];
      }
    }

    const timelineData = await timeline.findByIdAndUpdate(
      timelineId,
      updatedData,
      { new: true }
    );

    res.status(200).send({
      message: "Timeline data updated successfully",
      data: timelineData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating timeline data",
      error: error.message,
    });
  }
};

exports.deleteTimelineData = async (req, res) => {
    try {
        const timelineId = req.params.id; 
        const deletedTimeline = await timeline.findByIdAndDelete(timelineId);
        if (!deletedTimeline) {
            return res.status(404).send({ message: "Timeline event not found" });
        }
        res.status(200).send({ message: "Timeline event deleted successfully", data: deletedTimeline });
    } catch (error) {
        res.status(500).send({ message: "Error deleting timeline event", error: error.message });
    }};
    