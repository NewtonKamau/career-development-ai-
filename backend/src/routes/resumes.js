const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const natural = require('natural');
// Temporarily comment out auth middleware
// const auth = require('../middleware/auth');
const { Resume } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  }
});

// Helper function to extract text from PDF
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

// Helper function to extract text from Word document
async function extractTextFromWord(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from Word document:', error);
    throw new Error('Failed to extract text from Word document');
  }
}

// Helper function to parse resume text
function parseResumeText(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());

  // Basic sections we want to identify
  const sections = {
    contact: [],
    education: [],
    experience: [],
    skills: []
  };

  // Simple keyword-based parsing (this can be enhanced with more sophisticated NLP)
  const keywords = {
    education: ['education', 'university', 'college', 'degree', 'bachelor', 'master', 'phd'],
    experience: ['experience', 'work', 'employment', 'job', 'position', 'career'],
    skills: ['skills', 'technologies', 'programming', 'languages', 'tools']
  };

  // Extract sections based on keywords
  const lines = text.split('\n');
  let currentSection = null;

  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    
    // Determine section
    for (const [section, sectionKeywords] of Object.entries(keywords)) {
      if (sectionKeywords.some(keyword => lowerLine.includes(keyword))) {
        currentSection = section;
        break;
      }
    }

    // Add line to appropriate section
    if (currentSection && line.trim()) {
      sections[currentSection].push(line.trim());
    }
  });

  return sections;
}

// Upload resume - remove auth middleware temporarily
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let parsedText;
    if (req.file.mimetype === 'application/pdf') {
      parsedText = await extractTextFromPDF(req.file.buffer);
    } else {
      parsedText = await extractTextFromWord(req.file.buffer);
    }

    const parsedData = parseResumeText(parsedText);

    const resume = await Resume.create({
      id: uuidv4(),
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      parsedText: parsedText,
      parsedData: parsedData,
      skills: parsedData.skills,
      // Store the actual file content if needed
      fileContent: req.file.buffer.toString('base64')
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

// Get all resumes - remove auth middleware temporarily
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.findAll();
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Get resume by ID - remove auth middleware temporarily
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Delete resume
router.delete('/:id', async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    await resume.destroy();

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Error deleting resume' });
  }
});

// Enhance resume with AI suggestions
router.post('/:id/enhance', async (req, res) => {
  try {
    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Get AI suggestions for resume enhancement
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer and career coach. Analyze the resume and provide specific improvements."
        },
        {
          role: "user",
          content: `Please analyze this resume and provide specific suggestions for improvement in JSON format:
          ${JSON.stringify(resume.parsedData)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const suggestions = JSON.parse(completion.choices[0].message.content);

    // Update resume with suggestions
    await resume.update({
      aiSuggestions: suggestions,
      lastEnhanced: new Date()
    });

    res.json({
      message: 'Resume enhancement completed',
      suggestions
    });
  } catch (error) {
    console.error('Resume enhancement error:', error);
    res.status(500).json({ error: 'Error enhancing resume' });
  }
});

// Get keyword optimization suggestions
router.post('/:id/keywords', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Get keyword optimization suggestions
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an ATS optimization expert. Analyze the resume against the job description and suggest keyword optimizations."
        },
        {
          role: "user",
          content: `Please analyze this resume against the job description and suggest keyword optimizations in JSON format.
          Resume: ${JSON.stringify(resume.parsedData)}
          Job Description: ${jobDescription}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const suggestions = JSON.parse(completion.choices[0].message.content);

    res.json({
      message: 'Keyword optimization completed',
      suggestions
    });
  } catch (error) {
    console.error('Keyword optimization error:', error);
    res.status(500).json({ error: 'Error optimizing keywords' });
  }
});

// Generate cover letter
router.post('/:id/cover-letter', async (req, res) => {
  try {
    const { jobDescription, companyName, customizations } = req.body;
    if (!jobDescription || !companyName) {
      return res.status(400).json({ error: 'Job description and company name are required' });
    }

    const resume = await Resume.findByPk(req.params.id);

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Generate cover letter
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional cover letter writer. Generate a compelling cover letter based on the resume and job description."
        },
        {
          role: "user",
          content: `Please generate a cover letter based on this information:
          Resume: ${JSON.stringify(resume.parsedData)}
          Job Description: ${jobDescription}
          Company: ${companyName}
          Customizations: ${JSON.stringify(customizations || {})}`
        }
      ]
    });

    const coverLetter = completion.choices[0].message.content;

    res.json({
      message: 'Cover letter generated successfully',
      coverLetter
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    res.status(500).json({ error: 'Error generating cover letter' });
  }
});

module.exports = router;
