require('dotenv').config();
const seedAll = require('../seeders');

// Run the seeder
seedAll()
  .then(() => {
    console.log('Seeding completed successfully');
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
