const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      email,
      password,
      name
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, careerGoals, preferredIndustries } = req.body;
    
    await req.user.update({
      name,
      careerGoals,
      preferredIndustries,
      profileCompleted: true
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        careerGoals: req.user.careerGoals,
        preferredIndustries: req.user.preferredIndustries,
        profileCompleted: req.user.profileCompleted
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

module.exports = router;
