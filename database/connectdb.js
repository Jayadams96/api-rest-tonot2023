import mongoose from "mongoose";

// Set the `strictQuery` option to `false`
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log('Connect DB ok!');
  } catch (error) {
    console.log('Error conection mongoDB!' + error);
  }
}

export default connectDB;