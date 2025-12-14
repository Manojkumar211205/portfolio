const profile = require("../models/profile");
const cloudinary = require("../utils/cloudinaryUtils");
exports.postProfileData = async (req, res) => {
  try {
    // Upload profile image if exists
    let uploadResult = null;
    if (req.file || req.files) {
      uploadResult = await cloudinary.uploadImage(req);
      if (uploadResult?.url) {
        req.body.profilePicture = uploadResult.url;
      }
    }

    // Parse socialMediaLinks if sent as string
    if (req.body.socialMediaLinks) {
      if (typeof req.body.socialMediaLinks === "string") {
        req.body.socialMediaLinks = JSON.parse(req.body.socialMediaLinks);
      }
    }

    // ✅ CLEAN undefined / null fields
    const updatedData = { ...req.body };
    for (let key in updatedData) {
      if (updatedData[key] === undefined || updatedData[key] === null) {
        delete updatedData[key];
      }
    }

    // 🔍 Check if profile already exists (single profile system)
    let existingProfile = await profile.findOne();

    // ✅ UPDATE
    if (existingProfile) {
      const updatedProfile = await profile.findByIdAndUpdate(
        existingProfile._id,
        { $set: updatedData },
        { new: true, runValidators: true }
      );

      return res.status(200).send({
        message: "Profile updated successfully ✅",
        data: updatedProfile,
      });
    }

    // ✅ CREATE
    const profileData = new profile(updatedData);
    await profileData.save();

    res.status(201).send({
      message: "Profile created successfully ✅",
      data: profileData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error saving profile data ❌",
      error: error.message,
    });
  }
};

exports.getProfileData = async (req,res)=>{
    try{
        const profileData = await profile.find({});
        res.status(200).send({message: "Profile data retrieved successfully", data: profileData});
    }catch(error){
        res.status(500).send({message: "Error retrieving profile data", error: error.message});
    }
};

exports.updateProfileData = async (req,res)=>{
    try{
        const uploadResult = await cloudinary.uploadImage(req);  
        req.body.profilePicture = uploadResult.url;
        if (req.body.socialMediaLinks) {
          req.body.socialMediaLinks = JSON.parse(req.body.socialMediaLinks);
          }
        const profileId = req.params.id;
        const updatedData = req.body;
        for(let key in updatedData){
            if(updatedData[key] === undefined || updatedData[key] === null){
                delete updatedData[key];
            }
        }
        console.log(updatedData);
        const profileData = await profile.findByIdAndUpdate(profileId, updatedData, {new: true});
        if(!profileData){
            return res.status(404).send({message: "Profile not found"});
        }
        res.status(200).send({message: "Profile updated successfully", data: profileData});
    }catch(error){
        res.status(500).send({message: "Error updating profile", error: error.message});
    }
};
