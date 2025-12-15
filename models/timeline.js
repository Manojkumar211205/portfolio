const mangoose = require("mongoose");
const timelineSchema = new mangoose.Schema({
    eventTitle: {
        type: String,
        required: true},
    eventDate: {
        type: Date,
        required: true},
    eventDescription: {
        type: String,
        required: true},
    eventImages: {
        type: [String],
        required: false},
    eventLinks: {
        type: String,
        required: false}
});
module.exports = mangoose.model("Timeline", timelineSchema);

