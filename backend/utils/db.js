import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);

    // Stop server if DB fails
    process.exit(1);
  }

  // Optional: MongoDB event listeners
  mongoose.connection.on("disconnected", () => {
    console.log("⚠️ MongoDB disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Error:", err);
  });
};

export default connectDB;
