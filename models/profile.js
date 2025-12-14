const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true},
        bio:{
        type: String,
        required: true
        },
        skills: {
        type: [String],
        required: true},
        profilePicture: {
        type: String,
        required: false},
        socialMediaLinks: {
        type: Map,
        of: String,
        required: false},
        resumeUrl:{
            type : String,
            required: false
        }
});
module.exports = mongoose.model("Profile", profileSchema);