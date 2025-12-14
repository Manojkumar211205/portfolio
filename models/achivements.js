const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
    achievementName: {
        type: String,
        required: true  },
        date: {
        type: Date,
        required: false},
        description: {
        type: String,
        required: true},
        certificateLink: {
        type: String,
        required: false},
        certificateImage: {
        type: String,
        required: false}
});
module.exports = mongoose.model("Achievement", achievementSchema);