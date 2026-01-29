const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ms3071687_db_user:TTGbInNzwonFk0ya@hotel-management-system.09jkfcn.mongodb.net/06chmsdb",
    );
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
