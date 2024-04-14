import mongoose, { Connection } from "mongoose";

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) throw new Error("MONGO_URL is not defined.");

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

export const dbConnect = async (): Promise<Connection | null> => {
  if (cached.conn) return cached.conn;

  const connection = await mongoose.connect(MONGODB_URL);
  if (connection) cached.conn = connection.connection;

  return cached.conn;
};