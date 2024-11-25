const { sequelize, Resume, Course, InterviewQuestion } = require('../models');

const sampleResumes = [
  {
    fileName: 'john_doe_resume.pdf',
    fileType: 'application/pdf',
    parsedText: `JOHN DOE
Software Engineer

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud technologies.

SKILLS
- Programming: JavaScript, TypeScript, Python, Java
- Frontend: React, Vue.js, HTML5, CSS3
- Backend: Node.js, Express, Django
- Database: PostgreSQL, MongoDB
- Cloud: AWS, Docker, Kubernetes

EXPERIENCE
Senior Software Engineer | Tech Corp | 2020-Present
- Led development of microservices architecture
- Implemented CI/CD pipelines using GitHub Actions
- Mentored junior developers and conducted code reviews

Software Engineer | StartUp Inc | 2018-2020
- Developed responsive web applications using React
- Optimized database queries improving performance by 40%
- Implemented RESTful APIs using Node.js and Express

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2014-2018`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    fileName: 'jane_smith_resume.docx',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    parsedText: `JANE SMITH
Product Manager

SUMMARY
Results-driven product manager with expertise in agile methodologies and a track record of successful product launches.

SKILLS
- Product Management: Agile, Scrum, Kanban
- Tools: Jira, Confluence, Trello
- Analytics: Google Analytics, Mixpanel
- Technical: SQL, Python (basic), API Design

EXPERIENCE
Senior Product Manager | Product Co | 2019-Present
- Led cross-functional teams in delivering 3 major product releases
- Increased user engagement by 60% through data-driven improvements
- Managed product roadmap and stakeholder communications

Product Manager | Tech Startup | 2017-2019
- Launched MVP within 3 months with 90% customer satisfaction
- Conducted user research and competitive analysis
- Collaborated with engineering teams to define technical requirements

EDUCATION
Master of Business Administration (MBA)
Business School University | 2015-2017`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const sampleCourses = [
  {
    title: "The Complete 2024 Web Development Bootcamp",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_12.jpg",
    price: "$11.99",
    rating: 4.7,
    instructor: "Dr. Angela Yu",
    platform: 'udemy',
    skills: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Python for Data Science and Machine Learning Bootcamp",
    url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/903744_8eb2.jpg",
    price: "$13.99",
    rating: 4.6,
    instructor: "Jose Portilla",
    platform: 'udemy',
    skills: ['Python', 'Data Science', 'Machine Learning'],
    description: "Learn how to use Python for Data Science and Machine Learning with real-world projects!",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Google Project Management Professional Certificate",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/83/e258e0532611e5a5072321239ff4d4/gcpm_placeholder_coursecard_v2.jpg",
    price: "Free",
    rating: 4.8,
    instructor: "Google",
    platform: 'coursera',
    skills: ['Project Management', 'Agile', 'Scrum'],
    description: "Start your career in project management with a Professional Certificate from Google.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const sampleInterviewQuestions = [
  {
    question: "Can you tell me about a challenging project you led and how you handled obstacles?",
    answer: "This behavioral question assesses leadership and problem-solving abilities. A good answer should follow the STAR method: Situation, Task, Action, Result. Example: Describe a specific project, your role, challenges faced, actions taken to overcome them, and positive outcomes achieved. Focus on demonstrating your leadership style, decision-making process, and ability to motivate team members. Include metrics or specific results where possible.",
    category: "Leadership",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Leadership", "Project Management", "Problem Solving"],
    popularity: 95,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    question: "What is your approach to prioritizing tasks when dealing with multiple deadlines?",
    answer: "This question evaluates time management and organizational skills. A strong response should outline your prioritization framework (e.g., urgency vs. importance matrix), mention specific tools or methods used, and provide examples of successfully managing competing priorities. Discuss how you communicate with stakeholders about deadlines, delegate when appropriate, and maintain work quality under pressure.",
    category: "Time Management",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Time Management", "Organization", "Productivity"],
    popularity: 90,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    question: "How do you handle disagreements with team members?",
    answer: "This question assesses conflict resolution and communication skills. A good answer should emphasize active listening, seeking to understand different perspectives, finding common ground, and working towards constructive solutions while maintaining professional relationships. Provide specific examples of successfully resolved conflicts and lessons learned.",
    category: "Communication",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Conflict Resolution", "Communication", "Teamwork"],
    popularity: 88,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Seed resumes
    await Resume.bulkCreate(sampleResumes);
    console.log('Resumes seeded');

    // Seed courses
    await Course.bulkCreate(sampleCourses);
    console.log('Courses seeded');

    // Seed interview questions
    await InterviewQuestion.bulkCreate(sampleInterviewQuestions);
    console.log('Interview questions seeded');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}
