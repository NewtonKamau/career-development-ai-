const express = require('express');
const { OpenAI } = require('openai');
const auth = require('../middleware/auth');
const { Resume } = require('../models');

const router = express.Router();

// Generate portfolio website content
router.post('/generate', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found. Please upload a resume first.' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Generate website content based on resume
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional web content writer and personal branding expert. Generate portfolio website content based on the resume."
        },
        {
          role: "user",
          content: `Please generate portfolio website content in JSON format with the following sections:
          - hero (title, subtitle, brief intro)
          - about (full bio)
          - experience (formatted work history)
          - skills (categorized skills)
          - projects (key projects/achievements)
          - education
          - contact
          
          Resume data: ${JSON.stringify(resume.parsedData)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const websiteContent = JSON.parse(completion.choices[0].message.content);

    res.json({
      message: 'Website content generated successfully',
      content: websiteContent
    });
  } catch (error) {
    console.error('Website generation error:', error);
    res.status(500).json({ error: 'Error generating website content' });
  }
});

// Generate custom website sections
router.post('/sections', auth, async (req, res) => {
  try {
    const { sections, style } = req.body;
    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: 'Sections array is required' });
    }

    const resume = await Resume.findOne({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found. Please upload a resume first.' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Generate custom sections content
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional web content writer and personal branding expert. Generate custom website sections based on the resume and requested sections."
        },
        {
          role: "user",
          content: `Please generate content for the following website sections in JSON format:
          Sections requested: ${JSON.stringify(sections)}
          Style preferences: ${JSON.stringify(style || {})}
          Resume data: ${JSON.stringify(resume.parsedData)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const sectionsContent = JSON.parse(completion.choices[0].message.content);

    res.json({
      message: 'Section content generated successfully',
      content: sectionsContent
    });
  } catch (error) {
    console.error('Section generation error:', error);
    res.status(500).json({ error: 'Error generating section content' });
  }
});

// Generate SEO metadata
router.post('/seo', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    if (!resume) {
      return res.status(404).json({ error: 'No resume found. Please upload a resume first.' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Generate SEO metadata
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Generate optimized metadata for a portfolio website based on the resume."
        },
        {
          role: "user",
          content: `Please generate SEO metadata in JSON format including:
          - title
          - description
          - keywords
          - social media descriptions
          - structured data
          
          Resume data: ${JSON.stringify(resume.parsedData)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const seoMetadata = JSON.parse(completion.choices[0].message.content);

    res.json({
      message: 'SEO metadata generated successfully',
      metadata: seoMetadata
    });
  } catch (error) {
    console.error('SEO metadata generation error:', error);
    res.status(500).json({ error: 'Error generating SEO metadata' });
  }
});

module.exports = router;
