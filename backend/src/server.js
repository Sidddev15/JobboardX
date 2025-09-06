require('dotenv').config(); //loads env variables 
const {connectDB, disconnectDB} = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  try {
    await connectDB(MONGODB_URI);
    // start the server listen for requests
    const server = app.listen(PORT, () => {
      console.log(`API up on http://localhost:${PORT}`);
    });

    // graceful shutdown
    const shutdown = async (signal) => {
      console.log(`\n[SYS] ${signal} recieved. Shutting down...`);
      server.close(async () => {
        await disconnectDB();
        process.exit(0);
      });
      //safety timeout
      setTimeout(() => process.exit(1), 10_000).unref();
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch(err) {
    console.error(`[BOOT] failed to start: `, err.message);
    process.exit(1);
  }
}

start();