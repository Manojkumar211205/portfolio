const express = require("express");
const mongoose = require("mongoose");
const profileRouter = require("./routes/profileRoutes");
const achivementsRouter = require("./routes/achivementsRoutes");
const projectRouter = require("./routes/projectRoutes");
const timelineRouter = require("./routes/timelineRoutes");
const connectDB = require("./utils/mongodbConnection");
const morgan = require("morgan");
const cors = require("cors"); // <--- Add this

const app = express();

app.use(morgan("dev"));  // ✅ Logs all traffic beautifully

connectDB();
app.use(cors()); // <--- Add this BEFORE your routes. It allows all frontends.
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(profileRouter);
app.use(achivementsRouter);
app.use(projectRouter);
app.use(timelineRouter);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



