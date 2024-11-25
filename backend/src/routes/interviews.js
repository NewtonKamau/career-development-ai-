const express = require('express');
const { Op } = require('sequelize');
const { InterviewQuestion } = require('../models');
const router = express.Router();

// Get interview questions with optional filtering
router.get('/questions', async (req, res) => {
  try {
    const { category, difficulty, industry } = req.query;
    const where = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (industry) {
      where.industry = industry;
    }

    const questions = await InterviewQuestion.findAll({
      where,
      order: [
        ['popularity', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching interview questions'
    });
  }
});

// Get interview questions by tag
router.get('/questions/tags/:tag', async (req, res) => {
  try {
    const { tag } = req.params;
    const questions = await InterviewQuestion.findAll({
      where: {
        tags: {
          [Op.contains]: [tag]
        }
      },
      order: [
        ['popularity', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error fetching interview questions by tag:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching interview questions'
    });
  }
});

// Get interview questions by difficulty level
router.get('/questions/difficulty/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const questions = await InterviewQuestion.findAll({
      where: {
        difficulty: level
      },
      order: [
        ['popularity', 'DESC'],
        ['createdAt', 'DESC']
      ]
    });

    res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error fetching interview questions by difficulty:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching interview questions'
    });
  }
});

// Get specific interview question
router.get('/questions/:id', async (req, res) => {
  try {
    const question = await InterviewQuestion.findByPk(parseInt(req.params.id));
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching question' });
  }
});

// Get recommended questions
router.get('/recommended', async (req, res) => {
  try {
    // Return top 3 questions by popularity
    const recommended = await InterviewQuestion.findAll({
      order: [
        ['popularity', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: 3
    });
    res.json(recommended);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recommended questions' });
  }
});

module.exports = router;
