const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://skibidi:skibidi@jsgame.bxathyb.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
