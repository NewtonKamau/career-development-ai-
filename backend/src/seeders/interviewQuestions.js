const { InterviewQuestion } = require('../models');

const interviewQuestions = [
  {
    question: "Can you tell me about a challenging project you led and how you handled obstacles?",
    answer: "This behavioral question assesses leadership and problem-solving abilities. A good answer should follow the STAR method: Situation, Task, Action, Result. Example: Describe a specific project, your role, challenges faced, actions taken to overcome them, and positive outcomes achieved. Focus on demonstrating your leadership style, decision-making process, and ability to motivate team members. Include metrics or specific results where possible.",
    category: "Leadership",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Leadership", "Project Management", "Problem Solving"],
    popularity: 95
  },
  {
    question: "What is your approach to prioritizing tasks when dealing with multiple deadlines?",
    answer: "This question evaluates time management and organizational skills. A strong response should outline your prioritization framework (e.g., urgency vs. importance matrix), mention specific tools or methods used, and provide examples of successfully managing competing priorities. Discuss how you communicate with stakeholders about deadlines, delegate when appropriate, and maintain work quality under pressure.",
    category: "Time Management",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Time Management", "Organization", "Productivity"],
    popularity: 90
  },
  {
    question: "How do you handle disagreements with team members?",
    answer: "This question assesses conflict resolution and communication skills. A good answer should emphasize active listening, seeking to understand different perspectives, finding common ground, and working towards constructive solutions while maintaining professional relationships. Provide specific examples of successfully resolved conflicts and lessons learned.",
    category: "Communication",
    difficulty: "intermediate",
    industry: "General",
    tags: ["Conflict Resolution", "Communication", "Teamwork"],
    popularity: 88
  },
  {
    question: "What are your strategies for staying updated with industry trends?",
    answer: "This question evaluates professional development and industry awareness. Strong responses should mention specific resources (industry publications, conferences, online courses), networking activities, and how you apply new knowledge in your role. Discuss how you share insights with your team and implement new best practices.",
    category: "Professional Development",
    difficulty: "beginner",
    industry: "General",
    tags: ["Continuous Learning", "Industry Knowledge", "Professional Growth"],
    popularity: 85
  },
  {
    question: "Describe a situation where you had to influence stakeholders to support your initiative.",
    answer: "This question assesses stakeholder management and persuasion skills. A strong answer should demonstrate your ability to identify key stakeholders, understand their interests and concerns, build compelling business cases, and effectively communicate value propositions. Include examples of successful stakeholder alignment and project outcomes.",
    category: "Stakeholder Management",
    difficulty: "advanced",
    industry: "General",
    tags: ["Stakeholder Management", "Communication", "Leadership"],
    popularity: 82
  },
  {
    question: "Tell me about a difficult decision you had to make and how you approached it.",
    answer: "This question evaluates decision-making and analytical skills. A good response should outline your decision-making framework, including how you gather and analyze information, consider alternatives, assess risks, and make informed choices. Discuss both the process and the outcome, including any lessons learned.",
    category: "Decision Making",
    difficulty: "advanced",
    industry: "General",
    tags: ["Decision Making", "Problem Solving", "Critical Thinking"],
    popularity: 80
  },
  {
    question: "How do you ensure your technical skills remain current and relevant?",
    answer: "This question assesses your commitment to technical excellence and continuous learning. Strong answers should include specific examples of learning strategies, such as online courses, certifications, side projects, or mentoring relationships. Discuss how you balance learning new technologies while maintaining expertise in current tools.",
    category: "Technical Skills",
    difficulty: "intermediate",
    industry: "Technology",
    tags: ["Technical Skills", "Continuous Learning", "Professional Development"],
    popularity: 78
  },
  {
    question: "How do you prioritize and balance competing product features?",
    answer: "This question evaluates product management and strategic thinking skills. A strong response should demonstrate your understanding of user needs, business objectives, and technical constraints. Discuss your framework for feature prioritization, including metrics used, stakeholder input, and how you communicate decisions.",
    category: "Product Management",
    difficulty: "advanced",
    industry: "Technology",
    tags: ["Product Management", "Strategy", "Decision Making"],
    popularity: 75
  }
];

const seedInterviewQuestions = async () => {
  try {
    // Clear existing data
    await InterviewQuestion.destroy({ where: {} });
    
    // Create new records
    await InterviewQuestion.bulkCreate(interviewQuestions);
    
    console.log('Interview questions seeded successfully');
  } catch (error) {
    console.error('Error seeding interview questions:', error);
    throw error;
  }
};

module.exports = seedInterviewQuestions;
