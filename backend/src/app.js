const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json()); //parse JSON request 
app.use(cors()); //Allows requests from different origins
app.use(morgan('dev')); //log request method + URL for debugging

// test route 
app.get('/api/health', (req,res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbState = states[mongoose.connection.readyState] || 'unknown';
  res.json({
    status: 'OK',
    server: 'running',
    db: dbState,
    time: new Date().toISOString(),
  });
});

module.exports = app;
