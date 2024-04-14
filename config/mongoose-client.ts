import mongoose, { Connection } from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined.");

interface Global {
  mongoose: {
    conn: Connection | null;
  };
}
declare const global: Global;
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null };
}

// connect to database using mongoose
export const dbConnect = async (): Promise<Connection | null> => {
  if (cached.conn) return cached.conn;
  const connection = await mongoose.connect(MONGODB_URI);
  if (connection) cached.conn = connection.connection;
  return cached.conn;
};