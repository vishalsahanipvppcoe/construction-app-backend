const express = require("express");
require("dotenv").config();
const app = express();

const { syncDB } = require("./models/index");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const dprRoutes = require("./routes/dprRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/dpr", dprRoutes);

// 404
app.use((req, res, next) => res.status(404).json({ message: "Not Found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
syncDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Database synced successfully!\nServer running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB sync error", err);
    process.exit(1);
  });
