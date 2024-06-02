import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(process.env.MONGO_URL);
    mongoose.set('strictQuery', false);
    console.log(`Mongodb connected ${(await connected).connection.host} `);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;

// uS2DmQEFnO5YZiKN

// mongodb+srv://abhishekbisht21:<password>@cluster0.xptyoou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0