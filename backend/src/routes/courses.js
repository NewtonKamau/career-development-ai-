const express = require('express');
const axios = require('axios');
const { Resume, Course } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// Mock course data
const mockCourses = {
  udemy: [
    {
      id: 1,
      title: "The Complete 2024 Web Development Bootcamp",
      url: "https://www.udemy.com/course/the-complete-web-development-bootcamp",
      imageUrl: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_12.jpg",
      price: "$11.99",
      rating: 4.7,
      instructor: "Dr. Angela Yu",
      platform: 'udemy',
      skills: ['Web Development', 'JavaScript', 'React', 'Node.js'],
      description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning Bootcamp",
      url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp",
      imageUrl: "https://img-c.udemycdn.com/course/480x270/903744_8eb2.jpg",
      price: "$13.99",
      rating: 4.6,
      instructor: "Jose Portilla",
      platform: 'udemy',
      skills: ['Python', 'Data Science', 'Machine Learning'],
      description: "Learn how to use Python for Data Science and Machine Learning with real-world projects!"
    },
    {
      id: 3,
      title: "AWS Certified Solutions Architect Associate",
      url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03",
      imageUrl: "https://img-c.udemycdn.com/course/480x270/362328_91f3_10.jpg",
      price: "$14.99",
      rating: 4.8,
      instructor: "Stephane Maarek",
      platform: 'udemy',
      skills: ['AWS', 'Cloud Computing', 'DevOps'],
      description: "Master AWS cloud architecture and ace the AWS Certified Solutions Architect Associate exam!"
    }
  ],
  coursera: [
    {
      id: 4,
      title: "Google Project Management Professional Certificate",
      url: "https://www.coursera.org/professional-certificates/google-project-management",
      imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/33f720502a11e59e72391aa537f5c9/MOOC-3.png",
      platform: 'coursera',
      instructor: "Google",
      rating: 4.8,
      skills: ['Project Management', 'Agile', 'Scrum'],
      description: "Start your career in project management with a professional certificate from Google."
    },
    {
      id: 5,
      title: "Meta Front-End Developer Professional Certificate",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/4a/83d620e50711e59e72391aa537f5c9/MOOC-4.png",
      platform: 'coursera',
      instructor: "Meta",
      rating: 4.7,
      skills: ['React', 'JavaScript', 'Front-end Development'],
      description: "Launch your career as a front-end developer with a Professional Certificate from Meta."
    },
    {
      id: 6,
      title: "IBM Data Science Professional Certificate",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science",
      imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/b0/31c8b0f4ef11e59e72391aa537f5c9/MOOC-2.png",
      platform: 'coursera',
      instructor: "IBM",
      rating: 4.6,
      skills: ['Data Science', 'Python', 'Machine Learning'],
      description: "Kickstart your career in data science & ML with a Professional Certificate from IBM."
    }
  ]
};

// Helper function to get Udemy courses
async function getUdemyCourses(query, limit = 10) {
  try {
    // For testing, return mock data
    return mockCourses.udemy;
  } catch (error) {
    console.error('Udemy API error:', error);
    return [];
  }
}

// Helper function to get Coursera courses
async function getCourseraCourses(query, limit = 10) {
  try {
    // For testing, return mock data
    return mockCourses.coursera;
  } catch (error) {
    console.error('Coursera API error:', error);
    return [];
  }
}

// Get course recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const { skills = '', platform = 'all' } = req.query;

    const where = {};
    if (platform && platform !== 'all') {
      where.platform = platform;
    }

    if (skills) {
      where.skills = {
        [Op.overlap]: skills.split(',').map(s => s.trim())
      };
    }

    const courses = await Course.findAll({
      where,
      order: [
        ['rating', 'DESC'],
        ['createdAt', 'DESC']
      ],
      limit: 10
    });

    res.json({
      success: true,
      courses
    });
  } catch (error) {
    console.error('Error fetching course recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching course recommendations'
    });
  }
});

// Search courses
router.get('/search', async (req, res) => {
  try {
    const { query = 'programming', platform } = req.query;
    let courses = [];
    if (!platform || platform === 'udemy') {
      const udemyCourses = await getUdemyCourses(query);
      courses.push(...udemyCourses);
    }
    if (!platform || platform === 'coursera') {
      const courseraCourses = await getCourseraCourses(query);
      courses.push(...courseraCourses);
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error searching courses' });
  }
});

// Get course details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const allCourses = [...mockCourses.udemy, ...mockCourses.coursera];
    const course = allCourses.find(c => c.id === parseInt(id));

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        error: 'Course not found' 
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Error getting course details:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get course details' 
    });
  }
});

// Get course details
router.get('/:platform/:courseId', async (req, res) => {
  try {
    const { platform, courseId } = req.params;

    let courseDetails;
    if (platform === 'udemy') {
      const response = await axios.get(
        `https://www.udemy.com/api-2.0/courses/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.UDEMY_API_KEY}`
          }
        }
      );
      courseDetails = {
        ...response.data,
        platform: 'udemy'
      };
    } else if (platform === 'coursera') {
      const response = await axios.get(
        `https://api.coursera.org/api/courses.v1/${courseId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.COURSERA_API_KEY}`
          }
        }
      );
      courseDetails = {
        ...response.data,
        platform: 'coursera'
      };
    } else {
      return res.status(400).json({ error: 'Invalid platform' });
    }

    res.json(courseDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching course details' });
  }
});

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    platform: "udemy",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg",
    rating: 4.7,
    price: "$84.99",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    instructor: "Dr. Angela Yu",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps"
  },
  {
    id: 2,
    title: "Machine Learning Specialization",
    platform: "coursera",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/8e5f6d2dec4ba69f6e36c017abd8c4/ML-Specialization-Logo-Generic-no-badge.png",
    rating: 4.9,
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    skills: ["Python", "Machine Learning", "Deep Learning", "Neural Networks", "TensorFlow"],
    instructor: "Andrew Ng",
    description: "Build ML models with Python and TensorFlow, learn to handle real-world use cases"
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    platform: "udemy",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/362328_91f3_10.jpg",
    rating: 4.8,
    price: "$94.99",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    skills: ["AWS", "Cloud Computing", "DevOps", "Serverless", "Microservices"],
    instructor: "Stephane Maarek",
    description: "Master AWS cloud architecture and ace the Solutions Architect Associate certification"
  }
];

// Get all courses
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      courses: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

module.exports = router;
