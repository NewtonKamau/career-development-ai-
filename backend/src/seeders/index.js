const seedInterviewQuestions = require('./interviewQuestions');
const seedCourses = require('./courses');
const { sequelize } = require('../models');

const seedAll = async () => {
  try {
    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
    
    // Seed interview questions
    await seedInterviewQuestions();
    console.log('Interview questions seeded successfully');
    
    // Seed courses
    await seedCourses();
    console.log('Courses seeded successfully');
    
    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder if this file is run directly
if (require.main === module) {
  seedAll();
}

module.exports = seedAll;
