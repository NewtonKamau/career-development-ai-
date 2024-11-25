const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate(models) {
      // We'll add associations later when we implement user authentication
    }
  }

  Resume.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileContent: {
      type: DataTypes.TEXT,
      allowNull: true // Allow null for demo data
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parsedText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Resume',
    tableName: 'resumes'
  });

  return Resume;
};
