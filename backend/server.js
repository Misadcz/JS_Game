const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const jwtSecret = 'skibidi'; // Secret key for JWT

//register
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) 
      return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: 'Invalid email or password' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// dashboard
app.get('/dashboard', auth, (req, res) => {
    res.json({ msg: 'Welcome to your dashboard!' });
  });

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});
