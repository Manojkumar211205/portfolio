const { google } = require("googleapis");
const fs = require("fs");

const auth = new google.auth.GoogleAuth({
  keyFile: "sodium-surf-465310-b6-95aadf97fddf.json", // path to your JSON
  scopes: ["https://www.googleapis.com/auth/drive"]
});

const drive = google.drive({ version: "v3", auth });

exports.uploadResumeToDrive = async (file) => {
  try {
    if (!file) return null;

    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: "application/pdf",
        parents: ["15uhfvRSztJeoU6xQU-z1pdHt-HIv7dqo"] // Google Drive folder ID
      },
      media: {
        mimeType: "application/pdf",
        body: fs.createReadStream(file.path)
      }
    });

    const fileId = response.data.id;

    // Make file public
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone"
      }
    });

    fs.unlinkSync(file.path);

    return {
      fileId,
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      downloadUrl: `https://drive.google.com/uc?id=${fileId}&export=download`
    };

  } catch (error) {
    console.error("Drive upload error:", error);
    return null;
  }
};
