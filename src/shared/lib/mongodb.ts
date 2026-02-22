import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) throw new Error('❌ - [MONGODB CONNECTION] => MONGODB_URI is not defined in .env.local');

declare global {
  var mongooseConn:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

global.mongooseConn = global.mongooseConn ?? {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  console.log('✅ - [MONGODB CONNECTION] => DB Connection success!');

  if (global.mongooseConn!.conn) {
    return global.mongooseConn!.conn;
  }

  if (!global.mongooseConn!.promise) {
    global.mongooseConn!.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
  }

  global.mongooseConn!.conn = await global.mongooseConn!.promise;
  return global.mongooseConn!.conn;
}
