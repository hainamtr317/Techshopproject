const mongoose = require("mongoose");
// const mongoUrl = 'mongodb://root:example@mongo/example'
//   'mongodb://root:password@localhost:27017/example';
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MONGODB CONNECTED");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
