const achievementSchema = require("../models/achivements");
const cloudinary = require("../utils/cloudinaryUtils");
exports.postAchievementData = async (req, res) => {
    try {
        const uploadResult = await cloudinary.uploadImage(req);
        req.body.certificateImage = uploadResult.url;
        const achivementsData = new achievementSchema(req.body);
        await achivementsData.save();
        res.status(201).send({ message: "Achievement data saved successfully", data: achivementsData });
    } catch (error) {
        res.status(500).send({ message: "Error saving achievement data", error: error.message });
    }};

exports.getAchievementData = async (req, res) => {
    try {
        const achivementsData = await achievementSchema.find({}); 
        res.status(200).send({ message: "Achievement data retrieved successfully", data: achivementsData });
    } catch (error) {
        res.status(500).send({ message: "Error retrieving achievement data", error: error.message });
    }};
exports.deleteAchievementData = async (req, res) => {
    try {
        const achievementId = req.params.id;
        const deletedAchievement = await achievementSchema.findByIdAndDelete(achievementId);
        if (!deletedAchievement) {
            return res.status(404).send({ message: "Achievement not found" });
        }
        res.status(200).send({ message: "Achievement deleted successfully", data: deletedAchievement });
    } catch (error) {
        res.status(500).send({ message: "Error deleting achievement", error: error.message });
    }
};

exports.updateAchievementData = async (req, res) => {
    try {
        console.log(req.body);
        const uploadResult = await cloudinary.uploadImage(req);
        console.log(uploadResult);
        req.body.certificateImage = uploadResult.url;
        const achievementId = req.params.id;
        const updatedData = req.body;
        for (let key in updatedData) {
            if (updatedData[key] === undefined || updatedData[key] === null) {
                delete updatedData[key];
            }   
        }
        
        const achivementsData = await achievementSchema.findByIdAndUpdate(achievementId, updatedData, { new: true });
        res.status(200).send({ message: "Achievement data updated successfully", data: achivementsData });
    } catch (error) {
        res.status(500).send({ message: "Error updating achievement data", error: error.message });
    }
};