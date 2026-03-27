import { error } from "console";
import mongoose from "mongoose";
import { cache } from "react";

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl) {
  throw new Error("DB url not Found");
}

let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // console.log("Cached conn return")
    return cached.conn;
  }

  // if(cached.promise){
  //   console.log("Promise conn")
  // }

  if(!cached.promise){
    // console.log("New Connection");
    cached.promise = mongoose.connect(mongodbUrl).then(c=>c.connection)
  }

  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
