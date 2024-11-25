const express = require('express');
const { Resume } = require('../models');
const router = express.Router();

// Generate website from latest resume
router.post('/generate', async (req, res) => {
  try {
    // Get the latest resume
    const latestResume = await Resume.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!latestResume) {
      return res.status(404).json({
        success: false,
        error: 'No resume found. Please upload a resume first.'
      });
    }

    // Parse resume sections
    const sections = parseResumeSections(latestResume.parsedText);

    // Generate website content based on resume
    const website = {
      title: `${sections.name}'s Professional Portfolio`,
      sections: [
        {
          id: '1',
          type: 'Introduction',
          content: generateIntroduction(sections)
        },
        {
          id: '2',
          type: 'Experience',
          content: sections.experience
        },
        {
          id: '3',
          type: 'Skills',
          content: sections.skills
        },
        {
          id: '4',
          type: 'Education',
          content: sections.education
        }
      ],
      theme: {
        primary: '#3182CE',
        secondary: '#63B3ED',
        font: 'Inter'
      }
    };

    res.json({
      success: true,
      website
    });
  } catch (error) {
    console.error('Error generating website:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate website'
    });
  }
});

function parseResumeSections(resumeText) {
  const sections = {
    name: '',
    title: '',
    summary: '',
    experience: '',
    skills: '',
    education: ''
  };

  // Split resume into lines for parsing
  const lines = resumeText.split('\n').filter(line => line.trim());

  // Extract name and title (usually first two lines)
  sections.name = lines[0]?.trim() || 'Professional';
  sections.title = lines[1]?.trim() || '';

  let currentSection = '';
  let sectionContent = [];

  // Parse sections
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section headers
    if (line.toUpperCase() === line && line.length > 3) {
      // Save previous section content
      if (currentSection && sectionContent.length > 0) {
        sections[currentSection.toLowerCase()] = sectionContent.join('\n');
        sectionContent = [];
      }

      // Update current section
      if (line.includes('EXPERIENCE') || line.includes('WORK')) {
        currentSection = 'experience';
      } else if (line.includes('EDUCATION')) {
        currentSection = 'education';
      } else if (line.includes('SKILLS')) {
        currentSection = 'skills';
      } else if (line.includes('SUMMARY') || line.includes('PROFILE')) {
        currentSection = 'summary';
      }
      continue;
    }

    // Add content to current section
    if (currentSection && line) {
      sectionContent.push(line);
    }
  }

  // Save the last section
  if (currentSection && sectionContent.length > 0) {
    sections[currentSection.toLowerCase()] = sectionContent.join('\n');
  }

  return sections;
}

function generateIntroduction(sections) {
  return `Hi, I'm ${sections.name}. ${sections.title ? `I work as a ${sections.title}.` : ''}\n\n${sections.summary || ''}`;
}

module.exports = router;
