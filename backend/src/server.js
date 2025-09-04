require('dorenv').config(); //loads env variables 

const app = require('./app');

const PORT = process.env.PORT || 5000;

// start the server listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})