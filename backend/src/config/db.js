const mongoose = require('mongoose');

let isConnected = false;

async function connectDB(uri) {
  if(!uri) throw new Error("MONGODB_URI is missing");

  const opts = {
    autoIndex: true, //set to false if indexes are big
    maxPoolSize: 10, //concurrent connections in pool
    // serverSelectionTimoutMS: 10000, //fall fast if cluster is unreachable
  };

  // connect once
  await mongoose.connect(uri, opts);
  isConnected = true;

  const {host} = mongoose.connection;
  console.log(`[DB] Connected to MongoDB @ ${host}`);

  // connecttion events 
  mongoose.connection.on('error', err => {
    console.error('[DB] Connection Error:', err.message);
  });

  mongoose.connection.on('disconnected', ()=> {
    isConnected = false;
    console.warn('[DB] Disconnected');
  });

}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.connection.close(false); //false => doesn't force close, let in-light ops finish
    console.log('[DB] Connection closed')
  }
}

module.exports = {connectDB, disconnectDB}