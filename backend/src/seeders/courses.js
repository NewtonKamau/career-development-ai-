const { Course } = require('../models');

const courses = [
  {
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
    title: "AWS Certified Solutions Architect",
    platform: "udemy",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/362328_91f3_10.jpg",
    rating: 4.8,
    price: "$94.99",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    skills: ["AWS", "Cloud Computing", "DevOps", "Serverless", "Microservices"],
    instructor: "Stephane Maarek",
    description: "Master AWS cloud architecture and ace the Solutions Architect Associate certification"
  },
  {
    title: "Google Data Analytics Professional Certificate",
    platform: "coursera",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/ed/d5e11b1df941d3b0a59b58a332dce2/1200x600_PgM.png",
    rating: 4.8,
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    skills: ["SQL", "R Programming", "Data Analysis", "Tableau", "Statistics"],
    instructor: "Google Career Certificates",
    description: "Get professional training designed by Google and launch your career in data analytics"
  },
  {
    title: "React - The Complete Guide 2024",
    platform: "udemy",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
    rating: 4.7,
    price: "$89.99",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    skills: ["React", "Redux", "JavaScript", "TypeScript", "Web Development"],
    instructor: "Maximilian Schwarzmüller",
    description: "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js and way more!"
  },
  {
    title: "Python for Everybody Specialization",
    platform: "coursera",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/2a/34a150d9ad11e5bd22cb7d7d7686df/pythonlearn_thumbnail_1x1.png",
    rating: 4.8,
    url: "https://www.coursera.org/specializations/python",
    skills: ["Python", "Database", "Web Scraping", "Data Structures", "Programming"],
    instructor: "Charles Russell Severance",
    description: "Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data."
  },
  {
    title: "Product Management Fundamentals",
    platform: "udemy",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/2048154_f8a0_4.jpg",
    rating: 4.6,
    price: "$79.99",
    url: "https://www.udemy.com/course/product-management-fundamentals/",
    skills: ["Product Management", "Strategy", "User Research", "Agile", "Roadmapping"],
    instructor: "Cole Mercer",
    description: "Learn the fundamentals of Product Management: strategy, roadmapping, user research, and product development"
  },
  {
    title: "UI/UX Design Specialization",
    platform: "coursera",
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/10/94e64625a311e8b2f339d6364e54af/GDD-Coursera-Course-Artwork.png",
    rating: 4.7,
    url: "https://www.coursera.org/specializations/ui-ux-design",
    skills: ["UI Design", "UX Research", "Prototyping", "Figma", "User Testing"],
    instructor: "California Institute of the Arts",
    description: "Master the tools and principles of UI/UX design. Create beautiful, engaging user experiences."
  }
];

const seedCourses = async () => {
  try {
    await Course.bulkCreate(courses);
    console.log('Courses seeded successfully');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

module.exports = seedCourses;
