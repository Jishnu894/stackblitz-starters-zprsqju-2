
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema.js');
const connectDB = require('./db.js');

dotenv.config();

const app = express();
app.use(express.json()); 

const port = process.env.PORT;


const url = process.env.MONGO_URI;


// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to database'))
//   .catch((err) => console.error('Error connecting to database:', err));


app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

  
    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res
        .status(400)
        .json({ message: 'Validation error', details: error.message });
    } else {
      res.status(500).json({ message: 'Server error', details: error.message });
    }
  }
});


const PORT = 3000;
app.listen(port, async() => {
 
  await connectDB(url);
  console.log(`Server is running on port ${PORT}`);
});
console.log(url);