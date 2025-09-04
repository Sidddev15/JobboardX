const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json()); //parse JSON request 
app.use(cors()); //Allows requests from different origins
app.use(morgan('dev')); //log request method + URL for debugging

// test route 
app.get('/api/health', (req,res) => {
  res.json({status: 'Okay', message: 'Server is runnning'});
});

module.exports = app;
