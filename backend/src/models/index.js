const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('../config/database.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    dialectOptions: config.dialectOptions || {}
  }
);

const models = {};

// Read all model files and import them
const modelsDir = __dirname;
fs.readdirSync(modelsDir)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  });

// Set up model associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models with database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = {
  sequelize,
  Sequelize,
  User: require('./User')(sequelize, Sequelize.DataTypes),
  ChatMessage: require('./ChatMessage')(sequelize, Sequelize.DataTypes),
  InterviewQuestion: require('./InterviewQuestion')(sequelize, Sequelize.DataTypes),
  Resume: require('./Resume')(sequelize, Sequelize.DataTypes),
  Course: require('./Course')(sequelize, Sequelize.DataTypes)
};
