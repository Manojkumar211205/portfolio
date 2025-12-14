const mongoose = require("mongoose");
const { getTimelineData } = require("../controllers/timelineController");

const projectSchema = new mongoose.Schema({
    projectName :{
        type: String,
        required: true},
        description:{   
        type: String,
        required: true},
        technologiesUsed: {
        type: [String],
        required: true},
        projectLink: {
        type: String,
        required: false},
        projectImage: {
        type: String,
        required: false},
        projectVideo: {
        type: String,
        required: false},
        githubLink: {
            type: String,
            required: false}
});
module.exports = mongoose.model("Project", projectSchema);