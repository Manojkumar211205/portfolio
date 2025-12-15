const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
// need to add it in main route for saving the images
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

exports.uploadImage = async (req) => {
  try {
    if(!req.file) {
      return {url: null, publicId: null};
    }
    const filePath = req.file.path;
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "portfolio-images", 
      resource_type: "image"
    });

    // Remove local temp file
    fs.unlinkSync(filePath);

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

  } catch (error) {
    console.error(error);
    return { error: "Image upload failed" };
  }
};

exports.uploadMedia  = async (file, type) => {
  try {
    if (!file) return null;

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: type === "video" ? "portfolio-videos" : "portfolio-images",
      resource_type: type
    });

    fs.unlinkSync(file.path);

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    };

  } catch (error) {
    console.error(error);
    return null;
  }
};


exports.uploadResume = async (file) => {
  try {
    if (!file) return null;

    // ✅ Allow only PDF
    if (!file.mimetype.includes("pdf")) {
      return {resumeUrl: null, publicId: null};
    }

  const uploadResult = await cloudinary.uploader.upload(file.path, {
  folder: "portfolio-resume",
  resource_type: "raw",
  format: "pdf"
});


    // Remove local temp file
    fs.unlinkSync(file.path);
    
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    };
  } catch (error) {
    console.error(error);

    // Clean temp file if error occurs
    if (file?.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return {resumeUrl};
  }
};

exports.uploadMultipleImages =  async (files) => {
  const urls = [];

  for (let file of files) {
    console.log("Uploading file:", file.originalname);
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "timeline",
      resource_type: "image",
    });

    urls.push(result.secure_url);
    fs.unlinkSync(file.path); // remove temp file
  }

  return urls;
};