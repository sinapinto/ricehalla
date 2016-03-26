module.exports = function (sequelize, Sequelize) {
  const Rice = sequelize.define('Rice', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      },
    },
  }, {
    classMethods: {
      associate(models) {
        Rice.belongsTo(models.User);
      }
    },
  });

  return Rice;
};
