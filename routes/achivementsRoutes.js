const achievementRoutes = require("../controllers/achivementsController");
const express = require("express");
achivementsRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

achivementsRouter.post("/api/achievements",upload.single("image"), achievementRoutes.postAchievementData)
                 .get("/api/achievements", achievementRoutes.getAchievementData)
                    .delete("/api/achievements/:id", achievementRoutes.deleteAchievementData)
                    .put("/api/achievements/:id", upload.single("image"),achievementRoutes.updateAchievementData); 

module.exports = achivementsRouter;