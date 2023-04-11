const dotenv = require("dotenv").config({ path: "../config.env" });
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const connectDB = require("./configs/db");
const ErrorHandler = require("./middlewares/errorHandler");
//Connect to Database

const app = express();
app.use(express.json());
connectDB();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Running server
const server = app.listen(PORT, () => {
  console.log("Running on port", PORT);
});

// Routes
app.use("/api/auth", require("./routes/authUserRoutes"));
app.use("/api/product/", require("./routes/adminProductRoutes"));
app.use("/api/category/", require("./routes/adminCategoryRoutes"));
app.use("/api/brand/", require("./routes/adminBrandRoutes"));
app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/store/", require("./routes/storeRoutes"));

//ErrorHandler
app.use(ErrorHandler);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
