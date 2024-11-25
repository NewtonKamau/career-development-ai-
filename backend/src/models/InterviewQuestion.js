const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InterviewQuestion extends Model {
    static associate(models) {
      // Add associations if needed
    }
  }

  InterviewQuestion.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'intermediate'
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    popularity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'InterviewQuestion',
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['industry']
      },
      {
        fields: ['difficulty']
      }
    ]
  });

  return InterviewQuestion;
};
