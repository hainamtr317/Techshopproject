const dotenv = require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./configs/db");
const ErrorHandler = require("./middlewares/errorHandler");
const { application } = require("express");
//Connect to Database
connectDB();
const app = express();
app.use(express.json());

app.use(cors());

//Running server
const server = app.listen(PORT, () => {
  console.log("Running on port", PORT);
});

//Routes
app.use("/api/auth", require("./routes/authUserRoutes"));
app.use("/api/product/", require("./routes/adminProductRoutes"));
app.use("/api/category/", require("./routes/adminCategoryRoutes"));
app.use("/api/brand/", require("./routes/adminBrandRoutes"));
app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/store/", require("./routes/storeRoutes"));
app.use("/api/adminAuth/", require("./routes/authAdminRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

//ErrorHandler
app.use(ErrorHandler);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
