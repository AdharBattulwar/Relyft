import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected Succesfully");
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
