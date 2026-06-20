import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & { mongooseConn?: MongooseCache };

if (!globalWithMongoose.mongooseConn) {
  globalWithMongoose.mongooseConn = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseConn;

export async function dbConnect() {
  if (!MONGODB_URI) throw new Error('[MONGODB CONNECTION] => MONGODB_URI is not defined in .env.local');

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
